import React, { useState } from 'react';
import styles from './tabs.scss';

export const Tabs = ({ defaultActiveLabel, ...props }) => {
    const [activeLabel, setActiveLabel] = useState(defaultActiveLabel);

    const onLabelClick = (label) => {
        setActiveLabel(label);
    };

    return (
        <div>
            <div>
                {React.Children.map(props.children, (tab) => (
                    <button onClick={() => onLabelClick(tab.props.label)}>{tab.props.label}</button>
                ))}
            </div>
            <div>
                {React.Children.map(props.children, (tab) => (
                    tab.props.label === activeLabel ? tab : null
                ))}
            </div>
        </div>
    );
};

/**
 * 
 * @param {Object} props 
 * @param {String} props.label
 */
Tabs.Tab = (props) => {
    return props.children === undefined ? null: props.children;
};

export default Tabs;
