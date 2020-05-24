import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../../../commons/components/select/select';
import DatePicker from 'react-datepicker';
import styles from './reconciliations.scss';
import { thunkedFetchReconciliations, thunkedDeleteReconciliation, thunkedCreateReconciliation } from './thunks';
import { vnDateTimeFormatter } from '../../../commons/utils/datetime-format-utils';

const API_SERVER_URL = `${USE_HTTPS ? 'https' : 'http'}://${API_HOST}:${API_PORT}/api`;

export const Reconciliations = (props) => {
    const dispatch = useDispatch();
    const [withBankId, setWithBankId] = useState('*');
    const [fromTime, setFromTime] = useState(new Date());
    const [toTime, setToTime] = useState(new Date());

    const { byId: banks, allIds: bankIds } = useSelector(state => state.entities.banks);
    const bankOptions = useMemo(() => {
        const originalOptions = bankIds
            .map(id => banks[id])
            .map(bank => ({ label: bank.name, value: bank.id }));

        return [{ value: '*', label: 'Tất cả' }, ...originalOptions];
    }, [banks]);
    const { byId: reconciliations, allIds: reconciliationIds, isFetching } = useSelector(state => state.administrator.reconciliations);

    useEffect(() => {
        dispatch(thunkedFetchReconciliations());
    }, []);

    const handleBankSelectChange = (bankId) => {
        setWithBankId(bankId);
    };

    const handleFromTimeDatePickerSelect = (time) => {
        setFromTime(time);
    };

    const handleToTimeDatePickerSelect = (time) => {
        setToTime(time);
    };

    const handleCreateReconciliationButtonClick = () => {
        dispatch(thunkedCreateReconciliation({
            withBankId: withBankId === '*' ? null : withBankId,
            fromTime: fromTime,
            toTime: toTime
        }));
    };

    const handleDeleteReconciliationButtonClick = (reconciliationId) => {
        dispatch(thunkedDeleteReconciliation({
            id: reconciliationId
        }));
    };

    return (
        <div>
            <div className={styles.searchCriteria}>
                <label>Chọn ngân hàng:</label>
                <Select options={bankOptions} value={withBankId} onChange={handleBankSelectChange} />
                <label>Thời gian bắt đầu:</label>
                <DatePicker
                    className={styles.datePicker}
                    selected={fromTime} onChange={handleFromTimeDatePickerSelect}
                    showTimeSelect
                    dateFormat='dd/MM/yyyy HH:mm:ss'
                />
                <label>Thời gian kết thúc:</label>
                <DatePicker
                    className={styles.datePicker}
                    selected={toTime} onChange={handleToTimeDatePickerSelect}
                    showTimeSelect
                    dateFormat='dd/MM/yyyy HH:mm:ss'
                />
                <button className={styles.submitButton}
                    onClick={handleCreateReconciliationButtonClick}
                    disabled={isFetching}
                >
                    Tạo danh sách giao dịch
                </button>
            </div>
            <div>
                <table className={styles.reconciliationTable}>
                    <thead>
                        <tr>
                            <th>Thời gian bắt đầu</th>
                            <th>Thời gian kết thúc</th>
                            <th>Ngân hàng</th>
                            <th>Tải về</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reconciliationIds && reconciliationIds.map(id => {
                            const reconciliation = reconciliations[id];
                            return (
                                <tr key={id}>
                                    <td>{vnDateTimeFormatter.format(new Date(reconciliation.fromTime))}</td>
                                    <td>{vnDateTimeFormatter.format(new Date(reconciliation.toTime))}</td>
                                    <td>{reconciliation.withBankId === null ? 'Tất cả' : banks[reconciliation.withBankId] && banks[reconciliation.withBankId].name}</td>
                                    <td>{reconciliation.isGenerating ? 'Đang xử lí...' :
                                        <a href={`${API_SERVER_URL}/reconciliations/${id}`} target='_blank'>Nhấn để tải về</a>}
                                    </td>
                                    <td>
                                        <button disabled={isFetching || reconciliation.isGenerating} onClick={() => handleDeleteReconciliationButtonClick(id)}>Xóa</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reconciliations;
