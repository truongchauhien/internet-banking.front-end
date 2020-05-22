import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../../commons/components/accordion/accordion';
import { closureRequestModalOpenStatusChange, accountClosureRequestInitialize } from './closure-request/actions';
import { AccountClosureRequestModal } from './closure-request/closure-request-modal';
import { vndFormatter } from '../../../commons/utils/number-format-utils.js';
import styles from './accounts.scss';

export const Accounts = () => {
    const dispatch = useDispatch();

    const [accordionActiveIndex, setAccordionActiveIndex] = useState('');

    const { byId: accounts, allIds: accountIds, defaultCurrentAccountId } = useSelector(state => state.customer.accounts);

    const accountsByType = useMemo(() => {
        const byType = {
            current: [],
            deposit: []
        };
        for (const id of accountIds) {
            const account = accounts[id];
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
    }, [accounts]);

    useEffect(() => {

    }, []);

    const handleAccordionTitleClick = (index) => {
        setAccordionActiveIndex(index);
    };

    const handleCloseAccountButton = (closedAccountId) => {
        dispatch(accountClosureRequestInitialize({
            closedAccountId: closedAccountId
        }));
        dispatch(closureRequestModalOpenStatusChange(true));
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
                            <button onClick={() => handleCloseAccountButton(account.id)}>Đóng tài khoản ...</button>
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
                            <button onClick={() => handleCloseAccountButton(account.id)}>Đóng tài khoản ...</button>
                        </Accordion.Content>
                    </React.Fragment>
                ))}
            </Accordion>
            <AccountClosureRequestModal />
        </div>
    )
};

export default Accounts;
