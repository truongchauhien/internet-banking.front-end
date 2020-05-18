import NOTIFICATION_TYPES from './notification-types';
import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../../authentication/login/actions';
import { LOGIN_RESTORE_REQUEST, LOGIN_RESTORE_SUCCESS } from '../../authentication/login-restoration/actions';
import { LOGOUT } from '../../authentication/logout/actions';
import { receiveUpdateViaWebSocket } from './actions';

const WEBSOCKET_URL = `${USE_HTTPS ? 'wss' : 'ws'}://${API_HOST}:${API_PORT}/websocket`;

export function createWebSocketMiddleware() {
    return ({ dispatch, getState }) => {
        /**
         * @type {WebSocket}
         */
        let websocket = null;

        return (next) => {
            return (action) => {
                switch (action.type) {
                    case LOGIN_REQUEST:
                    case LOGIN_RESTORE_REQUEST:
                    case LOGOUT: {
                        websocket && [WebSocket.CONNECTING, WebSocket.OPEN].includes(websocket.readyState)
                            && websocket.close();
                        break;
                    }
                    case LOGIN_SUCCESS:
                    case LOGIN_RESTORE_SUCCESS: {
                        websocket && [WebSocket.CONNECTING, WebSocket.OPEN].includes(websocket.readyState)
                            && websocket.close();
                        websocket = new WebSocket(WEBSOCKET_URL);
                        websocket.onopen = (event) => {
                            // Verify for the first time.
                            websocket.send(JSON.stringify({
                                accessToken: localStorage.getItem('accessToken')
                            }));

                            websocket.onmessage = (event) => {
                                const message = JSON.parse(event.data);
                                switch (message.type) {
                                    case 'notification':
                                        if (Notification.permission === 'granted') {
                                            const notification = new Notification(message.payload.title, {
                                                body: message.payload.content
                                            });
                                        }
                                        break;
                                    case 'update':
                                        dispatch(receiveUpdateViaWebSocket(message.payload));
                                        break;
                                    default:
                                        console.log('Unknown message type from websocket.');
                                        break;
                                }
                            };
                        };
                        break;
                    }
                }
                
                return next(action);
            };
        };
    };
}

export const webSocketMiddleware = createWebSocketMiddleware();
export default webSocketMiddleware;
