import React, { useState } from 'react';
import Select from '../../../../../commons/components/select/select';

export const AccountSelector = ({ id, accounts, selectedAccountId = '', onAccountSelect, showedTypes }) => {
    const handleOnChange = (selectedValue) => {
        onAccountSelect && onAccountSelect(selectedValue);
    };

    return (
        <Select id={id} onChange={handleOnChange} value={selectedAccountId} placeHolder="Chọn tài khoản ...">
            {
                showedTypes && showedTypes.includes('CURRENT') &&
                <Select.Group
                    label='Tài khoản thanh toán'
                    options={
                        accounts && accounts.filter(account => account.accountType === 'CURRENT').map(account => ({
                            value: account.id,
                            label: account.accountNumber
                        }))
                        || []
                    }
                />
            }
            {
                showedTypes && showedTypes.includes('DEPOSIT') &&
                <Select.Group
                    label='Tài khoản tiết kiệm'
                    options={
                        accounts && accounts.filter(account => account.accountType === 'DEPOSIT').map(account => ({
                            value: account.id,
                            label: account.accountNumber
                        }))
                        || []
                    }
                />
            }
        </Select>
    );
};

export default AccountSelector;
