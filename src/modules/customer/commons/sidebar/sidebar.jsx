import React from 'react';
import _ from 'lodash';
import styles from './sidebar.scss';

const SideBar = (props) => {
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
        <div className={styles.sideBar}>
            {props.children}
        </div>
    );
};

SideBar.Menu.Item = ({ active, children, ...restProps }) => {
    if (React.isValidElement(children)) {
        let modedchildren = children;
        let newClassName = children.props.className;
        if (active) {
            newClassName = children.props.className + ' ' + styles.active;
        }
        modedchildren = React.cloneElement(children,
            {
                className: newClassName,
                ...restProps
            }
        );
        return modedchildren;
    } else {
        return (<a {...restProps} className={active ? styles.active : undefined}>{children}</a>);
    }
};

export { SideBar };
export default SideBar;
