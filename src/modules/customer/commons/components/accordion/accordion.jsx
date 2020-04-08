import React from 'react';
import styles from './accordion.scss';

export const Accordion = (props) => {
    return props.children || null;
};

Accordion.Title = ({ active, index, onClick, ...props }) => {
    const handleClick = (e) => {
        e.preventDefault();
        onClick(e, { index });
    };

    return (
        <button
            className={`${styles.accordion} ${active ? styles.active : ''}`}
            onClick={handleClick}
        >
            {props.children}
        </button>
    );
};

Accordion.Content = ({ active, ...props }) => {
    return (
        <div className={`${styles.panel} + ${active ? '' : styles.hidden}`} >
            {props.children}
        </div>
    );
};

export default Accordion;
