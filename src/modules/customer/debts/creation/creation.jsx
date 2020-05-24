import React, { useState, useMemo, useEffect } from 'react';
import ContactSelectionModal from '../../commons/contact-selection-modal/contact-selection-modal';
import { useSelector, useDispatch } from 'react-redux';
import { thunkedCreateDebt } from './thunks';
import styles from './creation.scss';
import BANKS from '../../../../commons/constants/banks';
import { contactCreationModalOpenStatusChange, contactCreationInputChange } from '../../contacts/creation/actions';
import { thunkedQueryAccount } from '../../contacts/query/thunks';
import { queryAccountInit } from '../../contacts/query/actions';
import { thunkedCreateContact } from '../../contacts/creation/thunks';
import ContactCreationModal from '../../contacts/creation/contact-creation-modal';

export const DebtCreation = (props) => {
    const dispatch = useDispatch();

    const { byId: contacts, allIds: contactIds, query: accountQuery } = useSelector(state => state.customer.contacts);

    const [isContactSelectionModalOpen, setIsContactSelectionModalOpen] = useState(false);
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [toAccountHolderName, setToAccountHolderName] = useState('');
    const [queryAccountButtonEnable, setQueryAccountButtonEnable] = useState(true);
    const [addToContactsButtonEnable, setAddToContactsButtonEnable] = useState(false);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

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
        setToAccountHolderName(accountQuery.result.holderName || '');
    }, [accountQuery.result]);

    useEffect(() => {
        if (isAccountNumberAlreadyInContacts || !accountQuery.result.holderName) {
            setAddToContactsButtonEnable(false);
        } else {
            setAddToContactsButtonEnable(true);
        }
    }, [isAccountNumberAlreadyInContacts, accountQuery.result]);

    const handleFindInContactsButtonClick = () => {
        setIsContactSelectionModalOpen(true);
    };

    const handleContactSelectionModalClickOutside = () => {
        setIsContactSelectionModalOpen(false);
    };

    const handleContactSelectionModalContactSelect = (selectedContactId) => {
        setIsContactSelectionModalOpen(false);
        const selectedAccountNumber = contacts[selectedContactId].accountNumber;
        setToAccountNumber(selectedAccountNumber);
        if (accountQuery.whoAndWhere.accountNumber !== selectedAccountNumber) {
            dispatch(queryAccountInit());
            setQueryAccountButtonEnable(true);
        }
    };

    const handleToAccountNumberInputChange = (event) => {
        if (!queryAccountButtonEnable) {
            setQueryAccountButtonEnable(true);
        }
        if (toAccountHolderName) {
            setToAccountHolderName('');
            dispatch(queryAccountInit());
        }

        setToAccountNumber(event.target.value);
    };

    const handleQueryAccountButtonClick = () => {
        setQueryAccountButtonEnable(false);
        dispatch(thunkedQueryAccount({
            accountNumber: toAccountNumber,
            bankId: BANKS.INTERNAL
        }));
    };

    const handleAddToContactsButtonClick = () => {
        dispatch(contactCreationModalOpenStatusChange(true));
        dispatch(contactCreationInputChange({
            field: 'accountNumber',
            value: toAccountNumber
        }));
        dispatch(contactCreationInputChange({
            field: 'bankId',
            value: BANKS.INTERNAL
        }));
        dispatch(contactCreationInputChange({
            field: 'name',
            value: toAccountHolderName
        }));
    };

    const handleContactCreationSubmit = (contact) => {
        dispatch(thunkedCreateContact(contact));
    };

    const handleAmountInputChange = (event) => {
        setAmount(event.target.value);
    };

    const handleMessageInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmitButtonClick = () => {
        dispatch(thunkedCreateDebt({
            toAccountNumber: toAccountNumber,
            amount: amount,
            message: message
        }));

        setToAccountNumber('');
        setAmount(0);
        setMessage('');
    };

    return (
        <div>
            <fieldset>
                <legend>Người nhận nhắc nợ</legend>
                <button onClick={handleFindInContactsButtonClick}>Tìm trong danh bạ ...</button><br />
                <label>Số tài khoản:</label><br />
                <input value={toAccountNumber} onChange={handleToAccountNumberInputChange} />
                <fieldset>
                    <legend>Thông tin cá nhân</legend>
                    <label>Tên chủ tài khoản: {toAccountHolderName}</label><br />
                    <button onClick={handleQueryAccountButtonClick} disabled={!queryAccountButtonEnable}>Kiểm tra thông tin</button>
                    <button onClick={handleAddToContactsButtonClick} disabled={!addToContactsButtonEnable}>Thêm vào danh bạ ...</button>
                </fieldset>
                <ContactSelectionModal
                    isOpen={isContactSelectionModalOpen}
                    onClickOutside={handleContactSelectionModalClickOutside}
                    onContactSelect={handleContactSelectionModalContactSelect}
                    types={['internal']}
                />
                <ContactCreationModal onSubmit={handleContactCreationSubmit} />
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
