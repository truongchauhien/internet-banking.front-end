export const RECEIVE_UPDATE_VIA_WEBSOCKET = 'RECEIVE_UPDATE_VIA_WEBSOCKET';
export const receiveUpdateViaWebSocket = (payload) => ({
    type: RECEIVE_UPDATE_VIA_WEBSOCKET,
    payload
});
