import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '../../../commons/components/tabs/tabs';
import { thunkedFetchAccounts } from '../accounts/accounts-thunks';
import { thunkedFetchContacts } from '../contacts/contacts-thunks';
import IntraBank from './intrabank/intrabank';
import styles from './transfers.scss';

export const Transfers = (props) => {
    const reduxDispatch = useDispatch();

    useEffect(() => {
        reduxDispatch(thunkedFetchAccounts());
    }, []);

    return (
        <Tabs defaultActiveLabel='Chuyển khoản nội bộ'>
            <Tabs.Tab label='Chuyển khoản nội bộ' >
                <IntraBank />
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

export default Transfers;
