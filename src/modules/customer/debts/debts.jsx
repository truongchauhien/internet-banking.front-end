import React from 'react';
import styles from './debts.scss';
import Tabs from '../../../commons/components/tabs/tabs';
import DebtCreation from './creation/creation';
import ReceivedDebts from './received/received-debts';
import SentDebts from './sent/sent-debts';

export const Debts = (props) => {
    return (
        <Tabs defaultActiveLabel='Tạo nhắc nợ mới'>
            <Tabs.Tab label='Tạo nhắc nợ mới'>
                <DebtCreation />
            </Tabs.Tab>
            <Tabs.Tab label='Nhắc nợ đã gửi'>
                <SentDebts />
            </Tabs.Tab>
            <Tabs.Tab label='Nhắc nợ đã nhận'>
                <ReceivedDebts />
            </Tabs.Tab>
        </Tabs>
    );
};

export default Debts;
