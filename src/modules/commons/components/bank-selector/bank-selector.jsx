import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Select from '../../../../commons/components/select/select';
import styles from './bank-selector.scss';

export const BankSelector = ({bankId, onChange}) => {
    const { byId: banks, allIds: bankIds } = useSelector(state => state.entities.banks);
    const bankOptions = useMemo(() => {
        const options = bankIds
            .map(id => banks[id])
            .map(bank => ({ label: bank.name, value: bank.id }));

        return options;
    }, [banks]);

    const handleSelectChange = (bankId) => {
        onChange && onChange(bankId);
    };

    return (
        <Select options={bankOptions} value={bankId} onChange={handleSelectChange} placeHolder='Chọn ngân hàng ...' />
    );
};

export default BankSelector;
