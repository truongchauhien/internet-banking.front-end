import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Select from '../../../../commons/components/select/select';
import Modal from '../../../../commons/components/modal/modal';
import {
    contactCreationInit,
    contactCreationInputChange,
    contactCreationModalOpenStatusChange
} from './actions';
import styles from './contact-creation-modal.scss';
import BankSelector from '../../../commons/components/bank-selector/bank-selector';

export const ContactCreationModal = ({ onSubmit }) => {
    const dispatch = useDispatch();

    const {
        name: contactName,
        accountNumber: contactAccountNumber,
        bankId: contactBankId
    } = useSelector(state => state.customer.contacts.contactCreation.fields);
    const isModalOpen = useSelector(state => state.customer.contacts.contactCreation.isModalOpen);

    const handleContactAccountNumberInputChange = (event) => {
        dispatch(contactCreationInputChange({
            field: 'accountNumber',
            value: event.target.value
        }));
    };

    const handleContactNameInputChange = (event) => {
        dispatch(contactCreationInputChange({
            field: 'name',
            value: event.target.value
        }));
    };

    const handleBankSelectChange = (selectedValue) => {
        dispatch(contactCreationInputChange({
            field: 'bankId',
            value: event.target.value
        }));
    };

    const handleSubmitClick = () => {
        onSubmit && onSubmit({
            name: contactName,
            accountNumber: contactAccountNumber,
            bankId: contactBankId ? contactBankId : null
        });
        dispatch(contactCreationModalOpenStatusChange(false));
    };

    const handleCancelClick = () => {
        dispatch(contactCreationModalOpenStatusChange(false));
        dispatch(contactCreationInit());
    };

    const handleContactCreationModalClickOutside = () => {
        dispatch(contactCreationModalOpenStatusChange(false));
    };

    return (
        <Modal isOpen={isModalOpen} onClickOutside={handleContactCreationModalClickOutside}>
            <Modal.Content>
                <div className={styles.contactCreation}>
                    <label>Số tài khoản:</label>
                    <input value={contactAccountNumber} onChange={handleContactAccountNumberInputChange} />
                    <label>Ngân hàng:</label>
                    <BankSelector bankId={contactBankId} onChange={handleBankSelectChange} />
                    <label>Tên liên hệ:</label>
                    <input value={contactName} onChange={handleContactNameInputChange} />
                    <button onClick={handleCancelClick}>Hủy</button>
                    <button onClick={handleSubmitClick}>Tạo liên hệ</button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ContactCreationModal;
