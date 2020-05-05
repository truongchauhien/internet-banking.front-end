import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../commons/components/select/select';
import styles from './deposit-creation.scss';
import { thunkedCreateDeposit } from './thunks';
import { depositCreationReset } from './actions';

const IDENTITY_TYPES = [
    { value: 'userName', label: 'Tên tài khoản' },
    { value: 'accountNumber', label: 'Số tài khoản' }
];

export const DepositCreation = (props) => {
    const dispatch = useDispatch();

    const [identityType, setIdentityType] = useState('');
    const [identityValue, setIdentityValue] = useState('');
    const [amount, setAmount] = useState('');

    const isCreating = useSelector(state => state.employee.depositCreation.isCreating);
    const hasError = useSelector(state => state.employee.depositCreation.hasError);
    const response = useSelector(state => state.employee.depositCreation.response);

    const handleIdentityTypeSelectorChange = (value) => {
        setIdentityType(value);
    };

    const handleIdentityValueInputChange = (event) => {
        setIdentityValue(event.target.value);
    };

    const handleAmountInputChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmitButtonClick = () => {
        dispatch(thunkedCreateDeposit({
            [identityType]: identityValue,
            amount: Number(amount)
        }));
    };

    const handleContinueWithoutErrorClick = () => {
        dispatch(depositCreationReset());
        setIdentityValue('');
        setAmount('');
    };

    const handleContinueWithErrorClick = () => {
        dispatch(depositCreationReset());
    };

    return (
        <React.Fragment>
            {hasError === false && response === null && (
                <div>
                    <fieldset>
                        <legend>Nơi nhận</legend>
                        <Select value={identityType} onChange={handleIdentityTypeSelectorChange} options={IDENTITY_TYPES} placeHolder={'Nhận qua ...'} />
                        {identityType &&
                            <input
                                placeholder={
                                    identityType === 'userName' && 'Nhập tên tài khoản ...' ||
                                    identityType === 'accountNumber' && 'Nhập số tài khoản ...' ||
                                    ''
                                }
                                value={identityValue}
                                onChange={handleIdentityValueInputChange}
                            />
                        }
                    </fieldset>
                    <fieldset>
                        <legend>Số tiền</legend>
                        <input value={amount} onChange={handleAmountInputChange} />
                    </fieldset>
                    <button onClick={handleSubmitButtonClick}>Nạp tiền</button>
                </div>
            )}
            {hasError === false && response !== null  &&
                <div>
                    <label>Số dư cuối: <input readOnly value={response.account.balance} /></label>
                    <button onClick={handleContinueWithoutErrorClick}>Tiếp tục ...</button>
                </div>
            }
            {hasError === true &&
                <div>
                    <p>Có lỗi đã xảy ra.</p>
                    <button onClick={handleContinueWithErrorClick}>Làm lại ...</button>
                </div>
            }
        </React.Fragment>
    );
};

export default DepositCreation;
