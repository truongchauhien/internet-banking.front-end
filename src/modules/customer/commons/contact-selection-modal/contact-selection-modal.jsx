import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../../commons/components/modal/modal';
import { thunkedFetchContacts } from '../../contacts/thunks';
import BANKS from '../../../../commons/constants/banks';
import styles from './contact-selection-modal.scss';

export const ContactSelectionModal = ({ isOpen = false, onClickOutside, onContactSelect, types = ['internal', 'external'] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkedFetchContacts());
    }, []);

    const { byId: contacts, allIds: contactIds } = useSelector(state => state.customer.contacts);
    const { byId: banks } = useSelector(state => state.entities.banks);
    const contactArray = useMemo(() => {
        return contactIds
            .map(id => contacts[id])
            .filter(contact => {
                const includeInternalContact = types.includes('internal');
                const includeExternalContact = types.includes('external');
                if (contact.bankId === BANKS.INTERNAL && includeInternalContact) return true;
                if (contact.bankId !== BANKS.INTERNAL && includeExternalContact) return true;
            });
    }, [contacts, types]);

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
                                <React.Fragment key={contact.id}>
                                    <tr>
                                        <td rowSpan='2'>{contact.name}</td>
                                        <td>{contact.accountNumber}</td>
                                        <td rowSpan='2'>
                                            <button onClick={() => handleContactSelectButtonClick(contact.id)}>Chọn</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{contact.bankId ?
                                            (banks[contact.bankId] ? banks[contact.bankId].name : 'Ngân hàng không còn được hỗ trợ')
                                            : 'Tài khoản nội bộ'}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ContactSelectionModal;
