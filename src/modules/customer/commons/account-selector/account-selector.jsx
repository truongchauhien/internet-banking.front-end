import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../../../../commons/components/select/select';
import { thunkedFetchAccounts } from '../../accounts/thunks';

/**
 * 
 * @param {object} payload
 * @param {string} payload.id
 * @param {number} payload.customerId
 * @param {number|''} payload.selectedAccountId
 * @param {function} payload.onAccountSelect
 * @param {['CURRENT', 'DEPOSIT']} payload.showedTypes
 */
export const AccountSelector = ({ id, customerId, selectedAccountId = '', onAccountSelect, showedTypes = ['CURRENT', 'DEPOSIT'] }) => {
    const dispatch = useDispatch();
    const { byId: accounts, allIds: accountIds } = useSelector(state => state.customer.accounts);
    const accountArray = useMemo(() => accountIds.map(id => accounts[id]), [accountIds]);
    const { userType, userId } = useSelector(state => state.authentication.userData);

    useEffect(() => {
        dispatch(thunkedFetchAccounts({
            customerId: customerId ? customerId :
                (userType === 'customer' ? userId : null) // Automatically fetch accounts for current customer.
        }));
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
                        accountArray && accountArray.filter(account => account.accountType === 'CURRENT').map(account => ({
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
                        accountArray && accountArray.filter(account => account.accountType === 'DEPOSIT').map(account => ({
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
