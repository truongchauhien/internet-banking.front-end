import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AccountSelector from '../commons/account-selector/account-selector';
import { thunkedFetchTransactions } from '../../commons/entities/transactions/thunks';
import { transactionsInit } from '../../commons/entities/transactions/actions';
import { vnDateTimeFormatter } from '../../../commons/utils/datetime-format-utils';
import { vndFormatter } from '../../../commons/utils/number-format-utils';
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

    const [selectedAccountId, setSelectedAccountId] = useState('');

    const { byId: transactions, allIds: transactionIds } = useSelector(state => state.entities.transactions);
    const { hasMore, isFetching } = useSelector(state => state.customer.transactions);

    useEffect(() => {
        return () => {
            dispatch(transactionsInit());
        };
    }, []);

    const handleAccountSelectorChange = (selectedValue) => {
        setSelectedAccountId(selectedValue);
        dispatch(thunkedFetchTransactions({
            accountId: selectedValue,
            startingAfter: null
        }, {
            mode: 'truncate'
        }));
    };

    const handleSeeMoreButtonClick = () => {
        dispatch(thunkedFetchTransactions({
            accountId: selectedAccountId,
            startingAfter: _.last(transactionIds)
        }, {
            mode: 'append'
        }));
    };

    return (
        <div>
            <div>
                <label>Tài khoản: <AccountSelector
                    selectedAccountId={selectedAccountId}
                    onAccountSelect={handleAccountSelectorChange}
                    showedTypes={['CURRENT', 'DEPOSIT']}
                />
                </label>
            </div>
            <div className={styles.transactionHistoryTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Loại giao dịch</th>
                            <th>Số tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionIds.map(id => transactions[id]).map(transaction => (
                            <tr key={transaction.id}>
                                <td>{vnDateTimeFormatter.format(new Date(transaction.createdAt))}</td>
                                <td>{TRANSACTIONS_TYPES_DISPLAY[transaction.type]}</td>
                                <td>{vndFormatter.format(transaction.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {hasMore &&
                    <button disabled={isFetching} onClick={handleSeeMoreButtonClick}>Xem thêm ...</button>
                }
            </div>
        </div>
    );
};

export default TransactionHistory;
