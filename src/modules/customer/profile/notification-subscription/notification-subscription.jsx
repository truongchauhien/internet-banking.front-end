import React, { useState, useRef, useEffect } from 'react';
import styles from './notification-subscription.scss';

export const NotificationSubscription = (props) => {
    const mounted = useRef(true);
    const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

    useEffect(() => {
        return () => {
            mounted.current = false;
        }
    }, []);

    const handleSubscribeButtonClick = () => {
        Notification.requestPermission().then((permission) => {
            if (mounted.current) {
                setNotificationPermission(permission);
            }

            if (permission === 'granted') {
                const notification = new Notification('Đăng ký thành công!', {
                    body: 'Quý khách sẽ nhận được những thông báo cần thiết.'
                });
            }
        });
    };

    return (
        <div>
            {notificationPermission === 'default' && <p>Quý khách có thể đăng ký nhận thông báo. Thông báo sẽ được hiển thị trên màn hình làm việc.</p>}
            {notificationPermission === 'granted' && <p>Quý khách đã đăng ký nhận thông báo.</p>}
            {notificationPermission === 'denied' && <p>Quý khách đã từ chối nhận thông báo.</p>}
            <button
                disabled={notificationPermission === 'granted' || notificationPermission == 'denied'}
                onClick={handleSubscribeButtonClick}
            >
                {notificationPermission === 'default' && 'Đăng ký ...'}
                {notificationPermission === 'granted' && 'Đã đăng ký ...'}
                {notificationPermission === 'denied' && 'Không thể đăng ký ...'}
            </button>
        </div>
    );
};

export default NotificationSubscription;
