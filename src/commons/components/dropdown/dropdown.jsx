import React, { useState } from 'react';
import styles from './dropdown.scss';

export const Dropdown = ({ label, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnMouseEnter = () => {
        setIsOpen(true);
    };

    const handleOnMouseLeave = () => {
        setIsOpen(false);
    };

    const handleItemClick = () => {
        setIsOpen(false);
    };

    return (
        <div
            className={`${styles.dropdown} ${className ? className : ''}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <button className={styles.dropdownButton}>{label}</button>
            <div
                className={`${styles.dropdownContent} ${!isOpen ? styles.dropdownContentHidden : ''}`}
                onClick={handleItemClick}
            >
                {children}
            </div>
        </div>
    );
};

Dropdown.Item = ({ children, onClick, ...restProps }) => {
    const handleClick = (event) => {
        event.preventDefault();
        onClick && onClick();
    };

    if (typeof children === 'string') {
        return (
            <a onClick={handleClick} href="#">{children}</a>
        );
    } else if (React.isValidElement(children)) {
        return React.cloneElement(children, { ...restProps });
    } else {
        return null;
    }
};

export default Dropdown;
