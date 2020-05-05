import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../../commons/components/modal/modal';
import { thunkedFetchContacts } from '../../contacts/thunks';
import styles from './contact-selection-modal.scss';

export const ContactSelectionModal = ({ isOpen = false, onClickOutside, onContactSelect, internalContactOnly = false }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkedFetchContacts());
    }, []);
    
    const { byId: contacts, allIds: contactIds } = useSelector(state => state.customer.contacts);
    const contactArray = useMemo(() => {
        if (!internalContactOnly) {
            return contactIds.map(id => contacts[id]);
        }

        return contactIds.map(id => contacts[id]).filter(contact => !contact.bankId);
    },
        [contacts, internalContactOnly]
    );

    const handleContactSelectButtonClick = (contactId) => {
        onContactSelect && onContactSelect(contactId);
    };

    const handleContactModalClickOutSide = () => {
        onClickOutside && onClickOutside();
    };

    return (
        <Modal isOpen={isOpen} onClickOutside={handleContactModalClickOutSide}>
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
                                        <button onClick={() => handleContactSelectButtonClick(contact.id)}>Chọn</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ContactSelectionModal;
