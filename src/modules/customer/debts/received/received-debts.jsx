import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkedFetchDebts, thunkedCancelDebt } from '../thunks';
import { vndFormatter } from '../../../../commons/utils/number-format-utils';
import { vnDateTimeFormatter } from '../../../../commons/utils/datetime-format-utils';
import styles from './received-debts.scss';
import { thunkedCreatePayDebtTransfer, thunkedConfirmPayDebtTransfer } from '../../transfers/paydebt/thunks';

export const ReceivedDebts = (props) => {
    const dispatch = useDispatch();

    const { byId: debts, allIds: debtAllIds, hasMore } = useSelector(state => state.customer.debts);
    const { newOnly } = useSelector(state => state.customer.debts.fetchOptions);
    const { createdTransfer } = useSelector(state => state.customer.transfers.payDebt);
    const { doingTransferForDebtId } = useSelector(state => state.customer.debts.received);

    useEffect(() => {
        dispatch(thunkedFetchDebts({
            type: 'received',
            startingAfter: null,
            newOnly: newOnly
        }));
    }, []);

    const [otp, setOtp] = useState('');

    const handleCancelDebtButtonClick = (debtId) => {
        const canceledReason = window.prompt('Lời nhắn: ');
        if (canceledReason === null) {
            return;
        }

        dispatch(thunkedCancelDebt({
            id: debtId,
            canceledReason: canceledReason
        }));
    };

    const handlePayDebtButtonClick = (debtId) => {
        dispatch(thunkedCreatePayDebtTransfer({
            debtId
        }));
    };

    const handleOtpInputChange = (event) => {
        setOtp(event.target.value);
    };

    const handleConfirmTransferButtonClick = () => {
        dispatch(thunkedConfirmPayDebtTransfer({
            transferId: createdTransfer.id,
            otp: Number(otp)
        }));
    };

    const handleSeeMoreButtonClick = () => {
        dispatch(thunkedFetchDebts({
            type: 'received',
            startingAfter: _.last(debtAllIds),
            newOnly: newOnly
        }));
    };

    return (
        <div>
            {debtAllIds && debtAllIds.map(id => (
                <details key={id}>
                    <summary>Nhận từ {debts[id].fromCustomerFullName}</summary>
                    <p>Số tiền nợ: {vndFormatter.format(debts[id].amount)}</p>
                    <p>Được tạo lúc: {vnDateTimeFormatter.format(new Date(debts[id].createdAt))}</p>
                    {debts[id].status === 'NEW' && doingTransferForDebtId === id &&
                        <div>
                            <label>Nhập OTP: <input value={otp} onChange={handleOtpInputChange} /></label>
                            <button onClick={handleConfirmTransferButtonClick}>Xác nhận</button>
                        </div>
                    }
                    {debts[id].status === 'NEW' && doingTransferForDebtId !== id &&
                        <div>
                            <button onClick={() => handleCancelDebtButtonClick(id)}>Từ chối</button>
                            <button onClick={() => handlePayDebtButtonClick(id)}>Thanh toán</button>
                        </div>
                    }
                    {debts[id].status === 'CANCELED_BY_SENDER' &&
                        <p>Trạng thái: Nhắc nợ đã bị hủy bởi "{debts[id].fromCustomerFullName}" với lí do: "{debts[id].canceledReason}"</p>
                    }
                    {debts[id].status === 'CANCELED_BY_RECEIVER' &&
                        <p>Trạng thái: Quý khách đã tự hủy nhắc nợ với lí do: "{debts[id].canceledReason}"</p>
                    }
                    {debts[id].status === 'PAID' &&
                        <p>Trạng thái: Quý khách đã thanh toán cho bên gửi.</p>
                    }
                </details>
            ))}
            {hasMore &&
                <button onClick={handleSeeMoreButtonClick}>Xem thêm ...</button>
            }
        </div>
    );
};

export default ReceivedDebts;
