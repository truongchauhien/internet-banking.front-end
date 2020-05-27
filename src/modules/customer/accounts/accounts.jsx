import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../../commons/components/accordion/accordion';
import AccountClosureRequestModal from './closure-request/closure-request-modal';
import ACCOUNT_TYPES from '../../../commons/constants/account-types';
import { closureRequestModalOpenStatusChange, accountClosureRequestInitialize } from './closure-request/actions';
import { thunkedSetDefaultCurrentAccount } from './default-current-account/thunks';
import { thunkedFetchAccounts } from '../../commons/entities/accounts/thunks';
import { vndFormatter } from '../../../commons/utils/number-format-utils.js';
import styles from './accounts.scss';

export const Accounts = () => {
    const dispatch = useDispatch();

    const [accordionActiveIndex, setAccordionActiveIndex] = useState('');

    const { userId: customerId } = useSelector(state => state.authentication.userData);
    const { byId: accounts, allIds: accountIds } = useSelector(state => state.entities.accounts);
    const { defaultCurrentAccountId } = useSelector(state => state.customer.accounts);

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
    }, [accounts]);

    useEffect(() => {

    }, []);

    const handleAccordionTitleClick = (index) => {
        setAccordionActiveIndex(index);
    };

    const handleCloseAccountButtonClick = (closedAccountId) => {
        dispatch(accountClosureRequestInitialize({
            closedAccountId: closedAccountId
        }));
        dispatch(closureRequestModalOpenStatusChange(true));
    };

    const handleSetDefaultCurrentAccountButtonClick = (currentAccountId) => {
        dispatch(thunkedSetDefaultCurrentAccount({
            customerId: customerId,
            currentAccountId: currentAccountId
        }));
    };

    const handleRefreshButtonClick = () => {
        dispatch(thunkedFetchAccounts({
            customerId: customerId
        }, { mode: 'truncate' }));
    };

    return (
        <div>
            <Accordion>
                {accountsByType.current.map((account) => (
                    <React.Fragment key={account.accountNumber}>
                        <Accordion.Title onClick={handleAccordionTitleClick} index={account.id}>
                            Tài khoản thanh toán: {account.accountNumber}{defaultCurrentAccountId === account.id && ' (mặc định)'}
                        </Accordion.Title>
                        <Accordion.Content active={accordionActiveIndex === account.id}>
                            <p>Số dư: {vndFormatter.format(account.balance)}</p>
                            <button onClick={() => handleCloseAccountButtonClick(account.id)}>Đóng tài khoản ...</button>
                            {defaultCurrentAccountId !== account.id &&
                                <button onClick={() => handleSetDefaultCurrentAccountButtonClick(account.id)}>Đặt làm tài khoản thanh toán mặc định</button>
                            }
                        </Accordion.Content>
                    </React.Fragment>
                ))}
                {accountsByType.deposit.map((account) => (
                    <React.Fragment key={account.accountNumber}>
                        <Accordion.Title onClick={handleAccordionTitleClick} index={account.id}>
                            Tài khoản tiết kiệm: {account.accountNumber}
                        </Accordion.Title>
                        <Accordion.Content active={accordionActiveIndex === account.id}>
                            <p>Số dư: {vndFormatter.format(account.balance)}</p>
                            <button onClick={() => handleCloseAccountButtonClick(account.id)}>Đóng tài khoản ...</button>
                        </Accordion.Content>
                    </React.Fragment>
                ))}
            </Accordion>
            <button onClick={handleRefreshButtonClick}>Cập nhật ...</button>
            <AccountClosureRequestModal />
        </div>
    )
};

export default Accounts;
