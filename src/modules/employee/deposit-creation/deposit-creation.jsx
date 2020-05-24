import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../commons/components/select/select';
import styles from './deposit-creation.scss';
import { thunkedCreateDeposit, thunkedFetchAccountThenCustomer } from './thunks';
import { depositCreationClear } from './actions';
import { thunkedFetchCustomer } from '../../commons/entities/customers/thunks';
import { thunkedFetchAccount } from '../../commons/entities/accounts/thunks';

const IDENTITY_TYPES = [
    { value: 'userName', label: 'Tên tài khoản' },
    { value: 'accountNumber', label: 'Số tài khoản' }
];

export const DepositCreation = (props) => {
    const dispatch = useDispatch();

    const [identityType, setIdentityType] = useState('');
    const [identity, setIdentity] = useState('');
    const [amount, setAmount] = useState('');

    const { isFetching, error, createdDepositId, customerId, accountId } = useSelector(state => state.employee.depositCreation);
    const { byId: accounts } = useSelector(state => state.entities.accounts);
    const { byId: customers } = useSelector(state => state.entities.customers);

    useEffect(() => {
        const cleanUp = () => dispatch(depositCreationClear({
            customerId: true,
            accountId: true,
            createdDepositId: true
        }));

        cleanUp();
        return () => cleanUp();
    }, []);

    const handleIdentityTypeSelectorChange = (value) => {
        setIdentityType(value);
    };

    const handleIdentityValueInputChange = (event) => {
        setIdentity(event.target.value);
    };

    const handleAmountInputChange = (event) => {
        setAmount(event.target.value);
    };

    const handleDepositButtonClick = () => {
        dispatch(thunkedCreateDeposit({
            [identityType]: identity,
            amount: Number(amount)
        }));
    };

    const handleContinueButtonClick = () => {
        dispatch(depositCreationClear({
            accountId: true,
            customerId: true,
            createdDepositId: true
        }));
    };

    const handleCancelButtonClick = () => {
        dispatch(depositCreationClear({
            accountId: true,
            customerId: true
        }));
    };

    const handleCheckIdentityButtonClick = () => {
        if (identityType === 'userName') {
            dispatch(thunkedFetchCustomer({
                identity: identity,
                identityType: 'userName'
            }, { mode: 'truncate' }));
        } else if (identityType === 'accountNumber') {
            dispatch(thunkedFetchAccountThenCustomer({
                accountNumber: identity
            }));
        }
    };

    return (
        <React.Fragment>
            {!customerId && !accountId && (
                <fieldset>
                    <legend>Nơi nhận</legend>
                    <Select value={identityType} onChange={handleIdentityTypeSelectorChange} options={IDENTITY_TYPES} placeHolder={'Nhận qua ...'} />
                    {identityType &&
                        <React.Fragment>
                            <input value={identity} onChange={handleIdentityValueInputChange} />
                            <button onClick={handleCheckIdentityButtonClick}>Kiểm tra</button>
                        </React.Fragment>
                    }
                </fieldset>
            )}
            {customerId &&
                <React.Fragment>
                    <fieldset>
                        <legend>Nơi nhận</legend>
                        <label>Khách hàng: {customers[customerId] && customers[customerId].fullName}</label> <br />
                        {!accountId &&
                            <p>Khách hàng sẽ nhận tiền qua tài khoản thanh toán mặc định</p>
                        }
                        {accountId &&
                            <p>Khách hàng sẽ nhận tiền qua số tài khoản {accounts[accountId] && accounts[accountId].accountNumber}</p>
                        }
                        <button onClick={handleCancelButtonClick}>Hủy bỏ</button>
                    </fieldset>
                    {!createdDepositId &&
                        <fieldset>
                            <legend>Số tiền</legend>
                            <input value={amount} onChange={handleAmountInputChange} />
                            <button onClick={handleDepositButtonClick}>Nạp tiền</button>
                        </fieldset>
                    }
                    {createdDepositId &&
                        <fieldset>
                            <legend>Thông báo</legend>
                            <p>Tiền của khách hàng đã được hệ thống ghi nhận.</p>
                            <button onClick={handleContinueButtonClick}>Tiếp tục</button>
                        </fieldset>
                    }

                </React.Fragment>
            }
            {/* {hasError === false && response !== null &&
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
            } */}
        </React.Fragment>
    );
};

export default DepositCreation;
