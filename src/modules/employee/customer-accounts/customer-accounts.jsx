import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../../../commons/components/select/select';
import { thunkedFetchCustomerAndAccounts } from './thunks';
import { thunkedCreateCustomerAccount } from './creation/thunks';
import { vndFormatter } from '../../../commons/utils/number-format-utils';
import styles from './customer-accounts.scss';
import ACCOUNT_TYPES from '../../../commons/constants/account-types';
import { customerAccountCreationClear } from './creation/actions';

const ACCOUNT_TYPE_DISPLAY_TEXTS = {
    1: 'tài khoản thanh toán',
    2: 'tài khoản tiết kiệm',
};
ACCOUNT_TYPE_DISPLAY_TEXTS['current'] = ACCOUNT_TYPE_DISPLAY_TEXTS[1];
ACCOUNT_TYPE_DISPLAY_TEXTS['deposit'] = ACCOUNT_TYPE_DISPLAY_TEXTS[2];

export const CustomerAccounts = (props) => {
    const dispatch = useDispatch();

    const { byId: accounts, allIds: accountIds } = useSelector(state => state.entities.accounts);
    const { customerId } = useSelector(state => state.employee.customerAccounts);
    const { createdAccountId } = useSelector(state => state.employee.customerAccounts.creation);

    const [customerUserName, setCustomerUserName] = useState('');
    const [accountType, setAccountType] = useState('current');

    const accountsByType = useMemo(() => {
        const byType = {
            current: [],
            deposit: []
        };
        for (const id of accountIds) {
            const account = accounts[id];
            switch (account.typeId) {
                case ACCOUNT_TYPES.CURRENT:
                    byType.current.push(account);
                    break;
                case ACCOUNT_TYPES.DEPOSIT:
                    byType.deposit.push(account);
                    break;
            }
        }
        return byType;
    }, [accounts, accountIds]);

    const accountTypeOptions = useMemo(() => [
        { label: 'Tài khoản thanh toán', value: 'current' },
        { label: 'Tài khoản tiết kiệm', value: 'deposit' }
    ], []);

    const handleGetCustomerButtonClick = () => {
        dispatch(thunkedFetchCustomerAndAccounts({
            customerUserName: customerUserName
        }));
    };

    const handleCustomerUserNameInputChange = (event) => {
        setCustomerUserName(event.target.value);
    };

    const handleAccountTypeSelectChange = (accountType) => {
        setAccountType(accountType);
    };

    const handleCreateCustomerAccountButtonClick = () => {
        if (!confirm(
            `Bạn có muốn tạo một ${ACCOUNT_TYPE_DISPLAY_TEXTS[accountType]} cho khách hàng ?`
        )) return;
        dispatch(thunkedCreateCustomerAccount({
            customerId: customerId,
            type: accountType
        }));
    };

    const handleFinishButtonClick = () => {
        dispatch(customerAccountCreationClear({
            clearAccount: true
        }));
    };

    const handleSwitchCustomerButtonClick = () => {
        dispatch(customerAccountCreationClear({
            clearAccount: true,
            clearCustomer: true
        }));
    };

    return (
        <div>
            <fieldset>
                <legend>Tạo tài khoản</legend>
                {!customerId &&
                    <React.Fragment>
                        <label>Tên đăng nhập của khách hàng:</label><br />
                        <input value={customerUserName} onChange={handleCustomerUserNameInputChange} />
                        <button onClick={handleGetCustomerButtonClick}>Đồng ý ...</button>
                    </React.Fragment>}
                {customerId && !createdAccountId &&
                    <React.Fragment>
                        <Select options={accountTypeOptions} value={accountType} onChange={handleAccountTypeSelectChange} />
                        <button onClick={handleCreateCustomerAccountButtonClick}>Tạo tài khoản ...</button> <br />
                        <button onClick={handleSwitchCustomerButtonClick}>Chuyển tài khoản người dùng</button>
                    </React.Fragment>
                }
                {customerId && createdAccountId &&
                    <React.Fragment>
                        <label>Số tài khoản: {accounts[createdAccountId] && accounts[createdAccountId].accountNumber}</label><br />
                        <button onClick={handleFinishButtonClick}>Tiếp tục</button>
                    </React.Fragment>
                }
            </fieldset>
            {customerId &&
                <React.Fragment>
                    <fieldset>
                        <legend>Tài khoản thanh toán</legend>
                        {accountsByType.current.map((account) => (
                            <details key={account.id}>
                                <summary>Số tài khoản: {account.accountNumber}</summary>
                                Số dư: {vndFormatter.format(account.balance)}
                            </details>
                        ))}
                    </fieldset>
                    <fieldset>
                        <legend>Tài khoản tiết kiệm</legend>
                        {accountsByType.deposit.map((account) => (
                            <details key={account.id}>
                                <summary>Số tài khoản: {account.accountNumber}</summary>
                                Số dư: {vndFormatter.format(account.balance)}
                            </details>
                        ))}
                    </fieldset>
                </React.Fragment>
            }
        </div>
    );
};

export default CustomerAccounts;
