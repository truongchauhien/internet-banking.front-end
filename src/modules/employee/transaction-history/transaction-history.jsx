import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { vndFormatter } from '../../../commons/utils/number-format-utils';
import { vnDateTimeFormatter } from '../../../commons/utils/datetime-format-utils';
import { transactionsInit } from '../../commons/entities/transactions/actions';
import { thunkedFetchTransactions } from '../../commons/entities/transactions/thunks';
import styles from './transaction-history.scss';

const TRANSACTIONS_TYPES_DISPLAY = {
    INTRABANK_TRANSFER: 'Chuyển khoản nội bộ',
    INTRABANK_RECEIVE: 'Nhận tiền',
    INTRABANK_TRANSFER_FEE: 'Phí chuyển khoản nội bộ',
    INTERBANK_TRANSFER: 'Chuyển khoản liên ngân hàng',
    INTERBANK_RECEIVE: 'Nhận tiền',
    INTERBANK_TRANSFER_FEE: 'Phí chuyển khoản liên ngân hàng',
    DEPOSIT: 'Nạp tiền',
    PAY_DEBT_TRANSFER: 'Thanh toán nhắc nợ',
    PAY_DEBT_RECEIVE: 'Nhận tiền trả nợ',
    CLOSE_ACCOUNT_TRANSFER: 'Chuyển số dư khi đóng tài khoản.',
    CLOSE_ACCOUNT_RECEIVE: 'Nhận số dư từ tài khoản bị đóng.'
};

export const TransactionHistory = (props) => {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');

    const { byId: transactions, allIds: transactionIds } = useSelector(state => state.entities.transactions);
    const { hasMore, error, isFetching } = useSelector(state => state.employee.transactionHistory);

    useEffect(() => {
        const cleanUp = () => dispatch(transactionsInit());
        cleanUp();
        return () => cleanUp();
    }, []);

    const handleUserNameInputChange = (event) => {
        setUserName(event.target.value);
    };

    const handleFetchTransactionHistoryButtonClick = () => {
        dispatch(thunkedFetchTransactions({
            userName,
            startingAfter: null
        }, { mode: 'truncate' }));
    };

    const handleSeeMoreTransactionHistoryButtonClick = () => {
        dispatch(thunkedFetchTransactions({
            userName,
            startingAfter: _.last(transactionIds)
        }, { mode: 'append' }));
    };

    return (
        <div>
            <div>
                <label>Tên tài khoản: <input value={userName} onChange={handleUserNameInputChange} /></label>
                <button onClick={handleFetchTransactionHistoryButtonClick}>Xem lịch sử giao dịch</button>
            </div>
            {transactionIds.length > 0 && (
                <div className={styles.transactionHistoryTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Loại giao dịch</th>
                                <th>Số tài khoản</th>
                                <th>Số tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionIds.map(id => transactions[id]).map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{vnDateTimeFormatter.format(new Date(transaction.createdAt))}</td>
                                    <td>{TRANSACTIONS_TYPES_DISPLAY[transaction.type]}</td>
                                    <td>{transaction.accountNumber}</td>
                                    <td className={transaction.amount >= 0 ? styles.creditTransaction : styles.debitTransaction}>{
                                        vndFormatter.format(transaction.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {hasMore &&
                        <button disabled={isFetching} onClick={handleSeeMoreTransactionHistoryButtonClick}>Xem thêm ...</button>
                    }
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
