import React from 'react';
import styles from './select.scss';

export const Select = ({
    id,
    options = [],
    defaultValue,
    value,
    placeHolder,
    onChange,
    children,
    ...props
}) => {
    const handleOnChange = (args) => {
        onChange && onChange(args.target.value);
    };

    return (
        <select id={id} onChange={handleOnChange} defaultValue={defaultValue} value={value}>
            {placeHolder &&
                <option disabled value=''>{placeHolder}</option>
            }
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
