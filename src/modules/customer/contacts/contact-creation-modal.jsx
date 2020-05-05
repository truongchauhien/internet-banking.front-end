import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Select from '../../../commons/components/select/select';
import Modal from '../../../commons/components/modal/modal';
import styles from './contact-creation-modal.scss';
import {
    contactCreationInit,
    contactCreationInputChange,
    contactCreationModalOpenStatusChange
} from './actions';

export const ContactCreationModal = ({ onSubmit }) => {
    const dispatch = useDispatch();

    const {
        name: contactName,
        accountNumber: contactAccountNumber,
        bankId: contactBankId
    } = useSelector(state => state.customer.contacts.contactCreation.fields);
    const isModalOpen = useSelector(state => state.customer.contacts.contactCreation.isModalOpen);

    const { byId: linkedBanks, allIds: linkedBankIds } = useSelector(state => state.customer.linkedBanks);
    const bankArray = useMemo(() => {
        const linkedBankArray = linkedBankIds
            .map(id => linkedBanks[id])
            .map(bank => ({ label: bank.name, value: bank.id }));

        return [{ value: '', label: 'Tài khoản nội bộ' }, ...linkedBankArray];
    }, [linkedBanks]);

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

    const handleLinkedBankSelectChange = (selectedValue) => {
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
        dispatch(contactCreationInit());
        dispatch(contactCreationModalOpenStatusChange(false));
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
                    <Select options={bankArray} value={contactBankId} onChange={handleLinkedBankSelectChange} />
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
