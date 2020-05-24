import React, { useState } from 'react';
import styles from './tabs.scss';

export const Tabs = ({ defaultActiveLabel, activeLabel, onLabelClick, ...props }) => {
    const [internalActiveLabel, setInternalActiveLabel] = useState(defaultActiveLabel);

    const handleOnLabelClick = (label) => {
        setInternalActiveLabel(label);
        onLabelClick && onLabelClick(label);
    };

    return (
        <div>
            <div>
                {React.Children.map(props.children, (tab) => (
                    <button onClick={() => handleOnLabelClick(tab.props.label)}>{tab.props.label}</button>
                ))}
            </div>
            <div>
                {React.Children.map(props.children, (tab) => (
                    tab.props.label === (activeLabel ?? internalActiveLabel) ? tab : null
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
    return props.children === undefined ? null : props.children;
};

export default Tabs;
