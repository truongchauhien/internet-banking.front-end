import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../../../../commons/components/message/message';
import Loader from '../../../../commons/components/loader/loader';
import AccountSelector from '../../commons/account-selector/account-selector';
import BankSelector from '../../../commons/components/bank-selector/bank-selector';
import ContactSelectionModal from '../../commons/contact-selection-modal/contact-selection-modal';
import ContactCreationModal from '../../contacts/creation/contact-creation-modal';
import { contactCreationModalOpenStatusChange, contactCreationInputChange } from '../../contacts/creation/actions';
import { thunkedCreateContact } from '../../contacts/creation/thunks';
import { queryAccountInit } from '../../contacts/query/actions';
import { thunkedQueryAccount } from '../../contacts/query/thunks';
import { clearIntrabankInterbankTransfer } from './actions';
import { thunkedCreateIntrabankTransfer, thunkedConfirmIntrabankTransfer } from './intrabank/thunks';
import { thunkedCreateInterbankTransfer, thunkedConfirmInterbankTransfer } from './interbank/thunks';
import { vndFormatter } from '../../../../commons/utils/number-format-utils.js';
import styles from './intrabank-interbank.scss';
import BANKS from '../../../../commons/constants/banks';

const IntrabankInterbank = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(queryAccountInit());
    }, []);

    const { byId: accounts, allIds: accountIds } = useSelector(state => state.entities.accounts);
    const { byId: contacts, allIds: contactIds, query: accountQuery } = useSelector(state => state.customer.contacts);
    const { stage, error, createdTransfer } = useSelector(state => state.customer.transfers.intrabankInterbank);

    const [selectedAccountId, setSelectedAccountId] = useState('');

    const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState('');
    const [beneficiaryAccountHolderName, setBeneficiaryAccountHolderName] = useState('');
    const [beneficiaryBankId, setBeneficiaryBankId] = useState('1'); // 1: Internal Bank ID.

    const [isContactSelectionModalOpen, setIsContactSelectionModalOpen] = useState(false);
    const [queryAccountButtonEnable, setQueryAccountButtonEnable] = useState(true);
    const [addToContactsButtonEnable, setAddToContactsButtonEnable] = useState(false);

    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [whoPayFee, setWhoPayFee] = useState('sender');
    const [otp, setOtp] = useState('');

    const isAccountNumberAlreadyInContacts = useMemo(() => {
        if (!accountQuery.whoAndWhere.accountNumber) return false;
        for (const contactId of contactIds) {
            const contact = contacts[contactId];
            if (contact.accountNumber === accountQuery.whoAndWhere.accountNumber) {
                return true;
            }
        }
        return false;
    }, [accountQuery.whoAndWhere, accountQuery.result, contacts]);

    useEffect(() => {
        setBeneficiaryAccountHolderName(accountQuery.result.holderName || '');
    }, [accountQuery.result]);

    useEffect(() => {
        if (isAccountNumberAlreadyInContacts || !accountQuery.result.holderName) {
            setAddToContactsButtonEnable(false);
        } else {
            setAddToContactsButtonEnable(true);
        }
    }, [isAccountNumberAlreadyInContacts, accountQuery.result]);

    const handleOnAccountSelect = (accountId) => {
        setSelectedAccountId(accountId);
    };

    const handleFindContactButtonClick = () => {
        setIsContactSelectionModalOpen(true);
    };

    const handleQueryAccountButtonClick = () => {
        setQueryAccountButtonEnable(false);
        dispatch(thunkedQueryAccount({
            accountNumber: beneficiaryAccountNumber,
            bankId: beneficiaryBankId
        }));
    };

    const handleAddToContactsButtonClick = () => {
        dispatch(contactCreationModalOpenStatusChange(true));
        dispatch(contactCreationInputChange({
            field: 'accountNumber',
            value: beneficiaryAccountNumber
        }));
        dispatch(contactCreationInputChange({
            field: 'bankId',
            value: beneficiaryBankId
        }));
        dispatch(contactCreationInputChange({
            field: 'name',
            value: beneficiaryAccountHolderName
        }));
    };

    const handleContactSelectionModalClickOutside = () => {
        setIsContactSelectionModalOpen(false);
    };

    const handleContactSelectionModalSelectContact = (selectContactId) => {
        const selectedContact = contacts[selectContactId];
        setBeneficiaryAccountNumber(selectedContact.accountNumber);
        setBeneficiaryBankId(selectedContact.bankId);

        setIsContactSelectionModalOpen(false);
        if (accountQuery.whoAndWhere.accountNumber !== selectedContact.accountNumber) {
            dispatch(queryAccountInit());
            setQueryAccountButtonEnable(true);
        }
    };

    const handleContactCreationSubmit = (contact) => {
        dispatch(thunkedCreateContact(contact));
    };

    const clearQueryResult = () => {
        if (!queryAccountButtonEnable) {
            setQueryAccountButtonEnable(true);
        }
        if (beneficiaryAccountHolderName) {
            setBeneficiaryAccountHolderName('');
            dispatch(queryAccountInit());
        }
    }
    const handleBeneficiaryAccountNumberChange = (event) => {
        clearQueryResult();
        setBeneficiaryAccountNumber(event.target.value);
    };

    const handleBankSelectChange = (bankId) => {
        clearQueryResult();
        setBeneficiaryBankId(bankId);
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
        if (beneficiaryBankId == BANKS.INTERNAL) {
            dispatch(thunkedCreateIntrabankTransfer({
                fromAccountNumber: accounts[selectedAccountId].accountNumber,
                toAccountNumber: beneficiaryAccountNumber,
                amount: amount,
                message: message,
                whoPayFee: whoPayFee
            }));
        }
        else {
            dispatch(thunkedCreateInterbankTransfer({
                fromAccountNumber: accounts[selectedAccountId].accountNumber,
                toAccountNumber: beneficiaryAccountNumber,
                toBankId: beneficiaryBankId,
                amount: amount,
                message: message,
                whoPayFee: whoPayFee
            }));
        }
    };

    const handleTryAgainButtonClick = () => {
        dispatch(clearIntrabankInterbankTransfer({
            stage: true,
            isFetching: true,
            error: true,
            createdTransfer: true
        }));

        setOtp('');
    };

    const handleOtpInputChange = (event) => {
        setOtp(event.target.value);
    };

    const handleConfirmTransferClick = () => {
        if (beneficiaryBankId == BANKS.INTERNAL) {
            dispatch(thunkedConfirmIntrabankTransfer({
                otp: Number.parseInt(otp),
                transferId: createdTransfer.id
            }));
        } else {
            dispatch(thunkedConfirmInterbankTransfer({
                otp: Number.parseInt(otp),
                transferId: createdTransfer.id
            }));
        }
    };

    const handleFinishButtonClick = () => {
        dispatch(clearIntrabankInterbankTransfer({
            stage: true,
            isFetching: true,
            error: true,
            createdTransfer: true
        }));

        setBeneficiaryAccountNumber('');
        setBeneficiaryBankId(BANKS.INTERNAL);
        setBeneficiaryAccountHolderName('');
        
        setQueryAccountButtonEnable(true);
        setAddToContactsButtonEnable(false);

        setAmount(0);
        setMessage('');
        setWhoPayFee('sender');
        setOtp('');
    };

    const otpConfirmationRender = () => (
        <div>
            <fieldset>
                <legend>Xác thực OTP</legend>
                <input onChange={handleOtpInputChange} value={otp} />
                <button onClick={handleConfirmTransferClick}>Xác nhận</button>
            </fieldset>
        </div>
    );

    return (
        <div>
            {stage === 'init' &&
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
                        <button onClick={handleFindContactButtonClick}>Tìm trong danh bạ ...</button><br />
                        <label>Số tài khoản:</label><br />
                        <input type="text" onChange={handleBeneficiaryAccountNumberChange} value={beneficiaryAccountNumber} /><br />
                        <label>Ngân hàng: </label><br />
                        <BankSelector bankId={beneficiaryBankId} onChange={handleBankSelectChange} />
                        <fieldset>
                            <legend>Thông tin cá nhân</legend>
                            <label>Tên chủ tài khoản: {beneficiaryAccountHolderName}</label><br />
                            <button onClick={handleQueryAccountButtonClick} disabled={!queryAccountButtonEnable}>Kiểm tra thông tin</button>
                            <button onClick={handleAddToContactsButtonClick} disabled={!addToContactsButtonEnable}>Thêm vào danh bạ ...</button>
                        </fieldset>
                        <ContactSelectionModal
                            isOpen={isContactSelectionModalOpen}
                            onClickOutside={handleContactSelectionModalClickOutside}
                            onContactSelect={handleContactSelectionModalSelectContact}
                            types={['internal', 'external']}
                        />
                        <ContactCreationModal onSubmit={handleContactCreationSubmit} />
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
            {stage === 'create_transfer_request' &&
                <div>
                    <Loader />
                    <p>Lệnh chuyển tiền đang được tạo ...</p>
                </div>
            }
            {stage === 'create_transfer_failure' &&
                <div>
                    <Message>
                        <Message.Header>Lỗi</Message.Header>
                        <p>Có lỗi xảy ra trong quá trình tạo giao dịch.</p>
                    </Message>
                    <button onClick={handleTryAgainButtonClick}>Quay lại</button>
                </div>
            }
            {stage === 'create_transfer_success' && otpConfirmationRender()}
            {stage === 'confirm_transfer_request' &&
                <div>
                    <Loader />
                    <p>Đang xác thực ...</p>
                </div>
            }
            {stage === 'confirm_transfer_failure' &&
                <React.Fragment>
                    {error === 'INCORRECT_OTP' && otpConfirmationRender()}
                    {error === 'unknown' &&
                        <div>
                            <p>Chuyển khoản thất bại!</p>
                            <button onClick={handleTryAgainButtonClick}>Tiếp tục</button>
                        </div>
                    }
                </React.Fragment>
            }
            {
                stage === 'confirm_transfer_success' &&
                <div>
                    <p>Chuyển khoản thành công!</p>
                    <button onClick={handleFinishButtonClick}>Tiếp tục</button>
                </div>
            }
        </div>
    );
};

export default IntrabankInterbank;
