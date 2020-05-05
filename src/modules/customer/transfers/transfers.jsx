import React from 'react';
import Tabs from '../../../commons/components/tabs/tabs';
import IntraBank from './intrabank/intrabank';
import styles from './transfers.scss';

export const Transfers = (props) => {
    return (
        <Tabs defaultActiveLabel='Chuyển khoản nội bộ'>
            <Tabs.Tab label='Chuyển khoản nội bộ' >
                <IntraBank />
            </Tabs.Tab>
            <Tabs.Tab label='Chuyển khoản liên ngân hàng'>
                <h1>Liên ngân hàng</h1>
            </Tabs.Tab>
        </Tabs>
    );
};

export default Transfers;
