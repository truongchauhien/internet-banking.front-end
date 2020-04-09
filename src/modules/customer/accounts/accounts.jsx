import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../../commons/components/accordion/accordion';
import { thunkedFetchAccounts } from './accounts-thunks';
import styles from './accounts.scss';

export const Accounts = () => {
    const [accordionActiveIndex, setAccordionActiveIndex] = useState(-1);

    const dispatch = useDispatch();

    const accountAllIds = useSelector(state => state.customer.accounts.allIds);
    const accountById = useSelector(state => state.customer.accounts.byId);

    useEffect(() => {
        dispatch(thunkedFetchAccounts());
    }, []);

    const handleAccordionTitleClick = (e, { index }) => {
        setAccordionActiveIndex(index);
    };

    return (
        <div>
            <Accordion>
                {accountAllIds && accountAllIds.map((accountId, index) => {
                    const account = accountById[accountId];
                    
                    if (account.accountType === 'CURRENT') {
                        return (
                            <React.Fragment key={account.accountNumber}>
                                <Accordion.Title onClick={handleAccordionTitleClick} index={index}>
                                    Tài khoản thanh toán: {account.accountNumber}
                                </Accordion.Title>
                                <Accordion.Content active={accordionActiveIndex === index}>
                                    <p>Số dư: {account.balance}</p>
                                </Accordion.Content>
                            </React.Fragment>
                        );
                    } else if (account.accountType === 'DEPOSIT') {
                        return (
                            <React.Fragment key={account.accountNumber}>
                                <Accordion.Title onClick={handleAccordionTitleClick} index={index}>
                                    Tài khoản tiết kiệm: {account.accountNumber}
                                </Accordion.Title>
                                <Accordion.Content active={accordionActiveIndex === index}>
                                    <p>Số dư: {account.balance}</p>
                                </Accordion.Content>
                            </React.Fragment>
                        );
                    }
                })}
            </Accordion>
        </div>
    )
};

export default Accounts;
