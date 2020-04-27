import React, { useState } from 'react';
import ContactSelectionModal from '../../commons/contact-selection-modal/contact-selection-modal';
import { useSelector, useDispatch } from 'react-redux';
import { thunkedCreateDebt } from './thunks';
import styles from './creation.scss';

export const DebtCreation = (props) => {
    const dispatch = useDispatch();

    const [isContactSelectionModalOpen, setIsContactSelectionModalOpen] = useState(false);
    const [toCustomerHasAccountNumber, setToCustomerHasAccountNumber] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

    const { byId: contacts } = useSelector(state => state.customer.contacts);

    const handleFindInContactsButtonClick = () => {
        setIsContactSelectionModalOpen(true);
    };

    const handleContactSelectionModalClickOutside = () => {
        setIsContactSelectionModalOpen(false);
    };

    const handleContactSelectionModalContactSelect = (selectedContactId) => {
        setToCustomerHasAccountNumber(contacts[selectedContactId].accountNumber);
        setIsContactSelectionModalOpen(false);
    };

    const handleBeneficiaryAccountNumberInputChange = (event) => {
        setToCustomerHasAccountNumber(event.target.value);
    };

    const handleAmountInputChange = (event) => {
        setAmount(event.target.value);
    };

    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmitButtonClick = () => {
        dispatch(thunkedCreateDebt({
            toCustomerHasAccountNumber: toCustomerHasAccountNumber,
            amount: amount,
            message: message
        }));

        setToCustomerHasAccountNumber('');
        setAmount(0);
        setMessage('');
    };

    return (
        <div>
            <fieldset>
                <legend>Tìm người nhận</legend>
                <label>Số tài khoản: <input value={toCustomerHasAccountNumber} onChange={handleBeneficiaryAccountNumberInputChange} /></label>
                <button onClick={handleFindInContactsButtonClick}>Tìm trong danh bạ ...</button>
                <ContactSelectionModal
                    isOpen={isContactSelectionModalOpen}
                    onClickOutside={handleContactSelectionModalClickOutside}
                    onContactSelect={handleContactSelectionModalContactSelect}
                    internalContactOnly={true}
                />
            </fieldset>
            <fieldset>
                <legend>Số tiền</legend>
                <input type='number' value={amount} onChange={handleAmountInputChange} />
            </fieldset>
            <fieldset>
                <legend>Nội dung</legend>
                <textarea value={message} onChange={handleMessageInputChange} />
            </fieldset>
            <button onClick={handleSubmitButtonClick}>Gửi nhắc nợ</button>
        </div>
    );
};

export default DebtCreation;
