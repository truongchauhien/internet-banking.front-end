import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../../../../commons/components/select/select';

/**
 * 
 * @param {object} payload
 * @param {string} payload.id
 * @param {number} payload.customerId
 * @param {number|''} payload.selectedAccountId
 * @param {function} payload.onAccountSelect
 * @param {['CURRENT', 'DEPOSIT']} payload.showedTypes
 */
export const AccountSelector = ({ id, selectedAccountId = '', onAccountSelect, showedTypes = ['CURRENT', 'DEPOSIT'], skippedAccountIds = [] }) => {
    const dispatch = useDispatch();
    const { byId: accounts, allIds: accountIds } = useSelector(state => state.customer.accounts);
    const accountArray = useMemo(() => accountIds.map(id => accounts[id]), [accountIds]);

    const accountsByType = useMemo(() => {
        const byType = {
            current: [],
            deposit: []
        };

        for (const id of accountIds) {
            const account = accounts[id];
            if (skippedAccountIds.includes(account.id)) {
                continue;
            }
            switch (account.type) {
                case 'CURRENT':
                    byType.current.push(account);
                    break;
                case 'DEPOSIT':
                    byType.deposit.push(account);
                    break;
            }
        }
        return byType;
    }, [accounts, skippedAccountIds]);

    useEffect(() => {

    }, []);

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
                        accountsByType.current.map(account => ({
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
                        accountsByType.deposit.map(account => ({
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
