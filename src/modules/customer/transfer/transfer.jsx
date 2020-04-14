import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '../../../commons/components/tabs/tabs';
import { thunkedFetchAccounts } from '../accounts/accounts-thunks';
import { thunkedFetchContacts } from '../contacts/contacts-thunks';
import IntraBankTransfer from './intrabank-transfer/intrabank-transfer';
import styles from './transfer.scss';

export const Transfer = (props) => {
    const reduxDispatch = useDispatch();

    useEffect(() => {
        reduxDispatch(thunkedFetchAccounts());
        reduxDispatch(thunkedFetchContacts());
    }, []);

    return (
        <Tabs defaultActiveLabel='Chuyển khoản nội bộ'>
            <Tabs.Tab label='Chuyển khoản nội bộ' >
                <IntraBankTransfer />
            </Tabs.Tab>
            <Tabs.Tab label='Chuyển khoản liên ngân hàng'>
                <h1>Liên ngân hàng</h1>
            </Tabs.Tab>
            <Tabs.Tab label='Chuyển khoản ngoại tệ'>
                <h1>Ngoại tệ</h1>
            </Tabs.Tab>
        </Tabs>
    );
};

export default Transfer;
