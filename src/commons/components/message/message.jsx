import React from 'react';
import styles from './message.scss';

export const Message = ({ children }) => {
    return (
        <div className={styles.message}>
            {children}
        </div>
    );
};

Message.Header = ({ children }) => {
    return (
        <div className={styles.header}>
            {children}
        </div>
    );
};

export default Message;
