import React, { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../../commons/components/modal/modal';
import Message from '../../../../commons/components/message/message';
import Loader from '../../../../commons/components/loader/loader';
import AccountSelector from '../commons/AccountSelector';
import { thunkedCreateIntrabankTransfer, thunkedConfirmIntrabankTransfer } from './intrabank-transfer-thunks';
import { clearIntrabankTransfer } from './intrabank-transfer-actions';
import styles from './intrabank-transfer.scss';

const IntraBankTransfer = (props) => {
    const { byId: accounts, allIds: accountIds } = useSelector(state => state.customer.accounts);
    const accountArray = useMemo(() => accountIds.map(id => accounts[id]), [accountIds]);

    const { byId: contacts, allIds: contactIds } = useSelector(state => state.customer.contacts);
    const contactArray = useMemo(() => contactIds.map(id => contacts[id]), [contactIds]);

    const [selectedAccountId, setSelectedAccountId] = useState();
    const [selectedContactId, setSelectedContactId] = useState();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [whoPayFee, setWhoPayFee] = useState('sender');
    const [otp, setOtp] = useState('');

    const stage = useSelector(state => state.customer.transfer.intrabankTransfer.stage);
    const transfer = useSelector(state => state.customer.transfer.intrabankTransfer.createdTransfer);

    const reduxDispatch = useDispatch();

    const handleOnAccountSelect = (accountId) => {
        setSelectedAccountId(accountId);
    };

    const handleFindContactButtonClick = () => {
        setIsContactModalOpen(true);
    };

    const handleContactModalClickOutSide = () => {
        setIsContactModalOpen(false);
    };

    const handleSelectContactClick = (contactId) => {
        setBeneficiaryAccountNumber(contacts[contactId].accountNumber);
        setIsContactModalOpen(false);
    };

    const handleBeneficiaryAccountNumberChange = (event) => {
        setBeneficiaryAccountNumber(event.target.value);
    };

    const handleAmountInputChange = (event) => {
        setAmount(event.target.value);
    };

    const handleAmountInputKeyPress = (event) => {

    };

    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleWhoPayTransferFeeChange = (event) => {
        setWhoPayFee(event.target.value);
    };

    const handleCreateTransferButtonClick = () => {
        reduxDispatch(thunkedCreateIntrabankTransfer({
            fromAccountNumber: accounts[selectedAccountId].accountNumber,
            toAccountNumber: beneficiaryAccountNumber,
            amount: amount,
            message: message,
            whoPayFee: whoPayFee
        }));
    };

    const handleCleanUpClick = () => {
        reduxDispatch(clearIntrabankTransfer());
    };

    const handleOtpInputChange = (event) => {
        setOtp(event.target.value);
    };

    const handleConfirmTransferClick = () => {
        reduxDispatch(thunkedConfirmIntrabankTransfer({
            otp: Number.parseInt(otp),
            transferId: transfer.id
        }));
    };

    return (
        <div>
            {stage === 'input-information' &&
                <div>
                    <fieldset>
                        <legend>Tài khoản chuyển</legend>
                        <div>
                            <AccountSelector
                                accounts={accountArray}
                                defaultAccountId={selectedAccountId}
                                onAccountSelect={handleOnAccountSelect}
                                showedTypes={['CURRENT']}
                            />
                        </div>
                        {
                            accounts[selectedAccountId] &&
                            <div>
                                {<label>Số dư: {accounts[selectedAccountId].balance}</label>}
                            </div>
                        }
                    </fieldset>
                    <fieldset>
                        <legend>Người nhận</legend>
                        <label>Số tài khoản nhận: </label>
                        <input type="text" onChange={handleBeneficiaryAccountNumberChange} value={beneficiaryAccountNumber} />
                        <button onClick={handleFindContactButtonClick}>Tìm trong danh bạ ...</button>
                        <Modal isOpen={isContactModalOpen} onClickOutSide={handleContactModalClickOutSide}>
                            <Modal.Content>
                                <div className={styles.contactTable}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tên gợi nhớ</th>
                                                <th>Số tài khoản</th>
                                                <th>Chọn</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactArray && contactArray.map(contact => (
                                                <tr key={contact.id}>
                                                    <td>{contact.name}</td>
                                                    <td>{contact.accountNumber}</td>
                                                    <td>
                                                        <button onClick={() => handleSelectContactClick(contact.id)}>Chọn</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Content>
                        </Modal>
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
                    <button>Tiếp tục</button>
                </div>
            }
        </div>
    );
};

export default IntraBankTransfer;
