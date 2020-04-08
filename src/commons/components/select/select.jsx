import React from 'react';
import styles from './select.scss';

export const Select = ({ options = [], defaultValue, value, onChange, children, ...props }) => {
    const handleOnChange = (args) => {
        onChange && onChange(args.target.value);
    };

    return (
        <select onChange={handleOnChange} defaultValue={defaultValue} value={value}>
            {
                children ||
                options && options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))
            }
        </select>
    );
};

Select.Group = ({ label, options }) => {
    return (
        <optgroup label={label}>
            {options && options.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </optgroup>
    );
};

export default Select;
