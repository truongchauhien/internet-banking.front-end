import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../../../../commons/components/message/message';
import Loader from '../../../../commons/components/loader/loader';
import AccountSelector from '../../commons/account-selector/account-selector';
import { thunkedCreateIntrabankTransfer, thunkedConfirmIntrabankTransfer } from './thunks';
import { clearIntrabankTransfer } from './actions';
import ContactSelectionModal from '../../commons/contact-selection-modal/contact-selection-modal';
import { vndFormatter } from '../../../../commons/utils/number-format-utils.js';
import styles from './intrabank.scss';

const Intrabank = (props) => {
    const dispatch = useDispatch();

    const { byId: accounts, allIds: accountIds } = useSelector(state => state.customer.accounts);
    const { byId: contacts, allIds: contactIds } = useSelector(state => state.customer.contacts);

    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState('');
    const [isContactSelectionModalOpen, setIsContactSelectionModalOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [whoPayFee, setWhoPayFee] = useState('sender');
    const [otp, setOtp] = useState('');

    const stage = useSelector(state => state.customer.transfers.intrabank.stage);
    const transfer = useSelector(state => state.customer.transfers.intrabank.createdTransfer);

    const handleOnAccountSelect = (accountId) => {
        setSelectedAccountId(accountId);
    };

    const handleFindContactButtonClick = () => {
        setIsContactSelectionModalOpen(true);
    };

    const handleContactSelectionModalClickOutside = () => {
        setIsContactSelectionModalOpen(false);
    };

    const handleContactSelectionModalSelectContact = (selectContactId) => {
        setBeneficiaryAccountNumber(contacts[selectContactId].accountNumber);
        setIsContactSelectionModalOpen(false);
    };

    const handleBeneficiaryAccountNumberChange = (event) => {
        setBeneficiaryAccountNumber(event.target.value);
    };

    const handleAmountInputChange = (event) => {
        setAmount(event.target.value);
    };

    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleWhoPayTransferFeeChange = (event) => {
        setWhoPayFee(event.target.value);
    };

    const handleCreateTransferButtonClick = () => {
        dispatch(thunkedCreateIntrabankTransfer({
            fromAccountNumber: accounts[selectedAccountId].accountNumber,
            toAccountNumber: beneficiaryAccountNumber,
            amount: amount,
            message: message,
            whoPayFee: whoPayFee
        }));
    };

    const handleCleanUpClick = () => {
        dispatch(clearIntrabankTransfer());
    };

    const handleOtpInputChange = (event) => {
        setOtp(event.target.value);
    };

    const handleConfirmTransferClick = () => {
        dispatch(thunkedConfirmIntrabankTransfer({
            otp: Number.parseInt(otp),
            transferId: transfer.id
        }));
    };

    const handleResetTransferUIButtonClick = () => {
        dispatch(clearIntrabankTransfer());
    };

    return (
        <div>
            {stage === 'input-information' &&
                <div>
                    <fieldset>
                        <legend>Tài khoản chuyển</legend>
                        <div>
                            <AccountSelector
                                selectedAccountId={selectedAccountId}
                                onAccountSelect={handleOnAccountSelect}
                                showedTypes={['CURRENT']}
                            />
                        </div>
                        {
                            accounts[selectedAccountId] &&
                            <div>
                                {<label>Số dư: {vndFormatter.format(accounts[selectedAccountId].balance)}</label>}
                            </div>
                        }
                    </fieldset>
                    <fieldset>
                        <legend>Người nhận</legend>
                        <label>Số tài khoản nhận: </label>
                        <input type="text" onChange={handleBeneficiaryAccountNumberChange} value={beneficiaryAccountNumber} />
                        <button onClick={handleFindContactButtonClick}>Tìm trong danh bạ ...</button>
                        <ContactSelectionModal
                            isOpen={isContactSelectionModalOpen}
                            onClickOutside={handleContactSelectionModalClickOutside}
                            onContactSelect={handleContactSelectionModalSelectContact}
                            types={['internal']}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Số tiền chuyển</legend>
                        <input type='number' value={amount} onChange={handleAmountInputChange} />
                        <label></label>
                    </fieldset>
                    <fieldset>
                        <legend>Nội dung</legend>
                        <textarea style={{ width: '100%' }} value={message} onChange={handleMessageInputChange}></textarea>
                    </fieldset>
                    <fieldset>
                        <legend>Hình thức thanh toán phí</legend>
                        <div>
                            <label>
                                <input type='radio' value='sender' checked={whoPayFee === 'sender'} onChange={handleWhoPayTransferFeeChange} />
                                Người gửi trả phí
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type='radio' value='beneficiary' checked={whoPayFee === 'beneficiary'} onChange={handleWhoPayTransferFeeChange} />
                                    Người nhận trả phí
                                </label>
                        </div>
                    </fieldset>
                    <button onClick={handleCreateTransferButtonClick}>Chấp nhận</button>
                </div>
            }
            {stage === 'creating-transfer' &&
                <div>
                    <Loader />
                    <p>Lệnh chuyển tiền đang được tạo ...</p>
                </div>
            }
            {stage === 'failed-to-create-transfer' &&
                <div>
                    <Message>
                        <Message.Header>Lỗi</Message.Header>
                        <p>Có lỗi xảy ra trong quá trình tạo giao dịch.</p>
                    </Message>
                    <button onClick={handleCleanUpClick}>Quay lại</button>
                </div>
            }
            {stage === 'transfer-created' &&
                <div>
                    <fieldset>
                        <legend>Xác thực OTP</legend>
                        <input onChange={handleOtpInputChange} value={otp} />
                        <button onClick={handleConfirmTransferClick}>Xác nhận</button>
                    </fieldset>
                </div>
            }
            {stage === 'confirming-transfer' &&
                <div>
                    <Loader />
                    <p>Đang xác thực ...</p>
                </div>
            }
            {
                stage === 'failed-to-confirm-transfer' &&
                <div>
                    <p>Chuyển khoản thất bại!</p>
                    <button>Tiếp tục</button>
                </div>
            }
            {
                stage === 'transfer-confirmed' &&
                <div>
                    <p>Chuyển khoản thành công!</p>
                    <button onClick={handleResetTransferUIButtonClick}>Tiếp tục</button>
                </div>
            }
        </div>
    );
};

export default Intrabank;
