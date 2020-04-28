import React from 'react';
import _ from 'lodash';
import styles from './sidebar.scss';

export const SideBar = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

SideBar.Content = (props) => {
    return (
        <div className={styles.content}>
            {props.children}
        </div>
    );
};

SideBar.Menu = (props) => {
    return (
        <div className={styles.menu}>
            {props.children}
        </div>
    );
};

SideBar.Menu.Item = ({ active, children, ...restProps }) => {
    if (typeof children === 'string') {
        return (<a {...restProps} className={active ? styles.active : undefined}>{children}</a>);
    } else if (React.isValidElement(children)) {
        const newClassName = `${children.props.className} ${active ? styles.active : ''}`;
        return React.cloneElement(children, {
            className: newClassName,
            ...restProps
        });
    } else {
        return null;
    }
};

export default SideBar;
