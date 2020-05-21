import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Select from '../../../../commons/components/select/select';
import Modal from '../../../../commons/components/modal/modal';
import {
    contactModificationInputChange,
    contactModificationModalOpenStatusChange,
} from './actions';
import styles from './contact-modification-modal.scss';

export const ContactModificationModal = ({ onSubmit }) => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector(state => state.customer.contacts.contactModification.isModalOpen);
    const { id: contactId, name: contactName, bankId: contactBankId, accountNumber: contactAccountNumber } = useSelector(state => state.customer.contacts.contactModification.fields);
    const { byId: banks, allIds: bankIds } = useSelector(state => state.commons.banks);
    const bankArray = useMemo(() => {
        const bankArray = bankIds
            .map(id => banks[id])
            .map(bank => ({ label: bank.name, value: bank.id }));

        return [{ value: '', label: 'Tài khoản nội bộ' }, ...bankArray];
    }, [banks]);

    const handleContactNameInputChange = (event) => {
        dispatch(contactModificationInputChange({
            field: 'name',
            value: event.target.value
        }));
    };

    const handleBankSelectChange = (selectedBankId) => {
        dispatch(contactModificationInputChange({
            field: 'bankId',
            value: selectedBankId
        }));
    };

    const handleContactAccountNumberInputChange = (event) => {
        dispatch(contactModificationInputChange({
            field: 'accountNumber',
            value: event.target.value
        }));
    };

    const handleCancelClick = () => {
        dispatch(contactModificationModalOpenStatusChange(false))
    };

    const handleSubmitClick = () => {
        onSubmit && onSubmit({
            id: contactId,
            name: contactName,
            bankId: contactBankId ? contactBankId : null,
            accountNumber: contactAccountNumber
        });
        dispatch(contactModificationModalOpenStatusChange(false));
    };

    const handleContactModificationModalClickOutside = () => {
        dispatch(contactModificationModalOpenStatusChange(false));
    };

    return (
        <Modal isOpen={isModalOpen} onClickOutside={handleContactModificationModalClickOutside}>
            <Modal.Content>
                <div className={styles.contactModification}>
                    <label>Số tài khoản:</label>
                    <input value={contactAccountNumber} onChange={handleContactAccountNumberInputChange} />
                    <label>Ngân hàng:</label>
                    <Select options={bankArray} value={contactBankId || ''} onChange={handleBankSelectChange} />
                    <label>Tên liên hệ:</label>
                    <input value={contactName} onChange={handleContactNameInputChange} />
                    <button onClick={handleCancelClick}>Hủy</button>
                    <button onClick={handleSubmitClick}>Cập nhật liên hệ</button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ContactModificationModal;
