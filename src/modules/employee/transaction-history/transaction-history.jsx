import React, { useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { thunkedFetchTransactionHistory } from './thunks';
import { vndFormatter } from '../../../commons/utils/number-format-utils';
import { vnDateTimeFormatter } from '../../../commons/utils/datetime-format-utils';
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
    PAY_DEBT_RECEIVE: 'Nhận tiền trả nợ'
};

export const TransactionHistory = (props) => {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');

    const { byId: transactions, allIds: transactionIds, hasMore, hasError, isFetching } = useSelector(state => state.employee.transactionHistory);

    const handleUserNameInputChange = (event) => {
        setUserName(event.target.value);
    };

    const handleFetchTransactionHistoryButtonClick = () => {
        dispatch(thunkedFetchTransactionHistory({
            userName,
            startingAfter: null
        }));
    };

    const handleSeeMoreTransactionHistoryButtonClick = () => {
        dispatch(thunkedFetchTransactionHistory({
            userName,
            startingAfter: _.last(transactionIds)
        }));
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
                                    <td>{vndFormatter.format(transaction.amount)}</td>
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
