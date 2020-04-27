import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkedFetchDebts, thunkedCancelDebt } from '../thunks';
import { vndFormatter } from '../../../../commons/utils/number-format-utils';
import { vnDateTimeFormatter } from '../../../../commons/utils/datetime-format-utils';
import styles from './sent-debts.scss';

export const SentDebts = (props) => {
    const dispatch = useDispatch();

    const { byId: debts, allIds: debtAllIds, hasMore } = useSelector(state => state.customer.debts);
    const { newOnly } = useSelector(state => state.customer.debts.fetchOptions);

    useEffect(() => {
        dispatch(thunkedFetchDebts({
            type: 'sent',
            startingAfter: null,
            newOnly: newOnly
        }));
    }, []);

    const handleCancelDebtButtonClick = (debtId) => {
        const canceledReason = window.prompt('Lời nhắn:');
        if (canceledReason === null) {
            return;
        }

        dispatch(thunkedCancelDebt({
            id: debtId,
            canceledReason: canceledReason
        }));
    };

    const handleSeeMoreButtonClick = () => {
        dispatch(thunkedFetchDebts({
            type: 'sent',
            startingAfter: _.last(debtAllIds),
            newOnly: newOnly
        }));
    };

    return (
        <div>
            {debtAllIds && debtAllIds.map(id => (
                <details key={id}>
                    <summary>Gửi cho {debts[id].toCustomerFullName}</summary>
                    <p>Số tiền nợ: {vndFormatter.format(debts[id].amount)}</p>
                    <p>Được tạo lúc: {vnDateTimeFormatter.format(new Date(debts[id].createdAt))}</p>
                    {debts[id].status === 'NEW' &&
                        <button onClick={() => handleCancelDebtButtonClick(id)}>Hủy nhắc nợ</button>
                    }
                    {debts[id].status === 'CANCELED_BY_SENDER' &&
                        <p>Trạng thái: Quý khách đã tự hủy nhắc nợ với lí do: "{debts[id].canceledReason}"</p>
                    }
                    {debts[id].status === 'CANCELED_BY_RECEIVER' &&
                        <p>Trạng thái: Nhắc nợ đã bị hủy bởi "{debts[id].toCustomerFullName}" với lí do: "{debts[id].canceledReason}"</p>
                    }
                    {debts[id].status === 'PAID' &&
                        <p>Trạng thái: Bên nhận đã thanh toán.</p>
                    }
                </details>
            ))}
            {hasMore &&
                <button onClick={handleSeeMoreButtonClick}>Xem thêm ...</button>
            }
        </div>
    );
};

export default SentDebts;
