import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { thunkedFetchContacts } from './thunks';
import { thunkedCreateContact } from './creation/thunks';
import { thunkedPatchContact } from './modification/thunks';
import { thunkedDeleteContact } from './deletion/thunks';
import {
    contactCreationModalOpenStatusChange
} from './creation/actions';
import {
    contactModificationInit,
    contactModificationModalOpenStatusChange
} from './modification/actions';
import ContactCreationModal from './creation/contact-creation-modal';
import ContactModificationModal from './modification/contact-modification-modal';
import styles from './contacts.scss';

export const Contacts = (props) => {
    const dispatch = useDispatch();
    const { byId: contacts, allIds: contactAllIds } = useSelector(state => state.customer.contacts);
    const { byId: banks } = useSelector(state => state.entities.banks);

    useEffect(() => {
        dispatch(thunkedFetchContacts());
    }, []);

    const handleShowContactCreationModalButtonClick = () => {
        dispatch(contactCreationModalOpenStatusChange(true));
    };

    const handleSubmitNewContact = (newContact) => {
        dispatch(thunkedCreateContact(newContact));
    };

    const handleEditContactButtonClick = (contactId) => {
        dispatch(contactModificationInit(contacts[contactId]));
        dispatch(contactModificationModalOpenStatusChange(true));
    };

    const handleDeleteContactButtonClick = (contactId) => {
        dispatch(thunkedDeleteContact({ id: contactId }));
    };

    const handleSubmitModificatedContact = (modificatedContact) => {
        dispatch(thunkedPatchContact(modificatedContact));
    }

    return (
        <React.Fragment>
            <div>
                <button onClick={handleShowContactCreationModalButtonClick}>Thêm liên hệ ...</button>
                <ContactCreationModal onSubmit={handleSubmitNewContact} />
            </div>
            <div className={styles.contactTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên liên hệ</th>
                            <th>Số tài khoản</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactAllIds && contactAllIds.map((id, index) => {
                            const contact = contacts[id];
                            return (
                                <React.Fragment key={contact.id}>
                                    <tr>
                                        <td rowSpan='2'>
                                            {contact.name}
                                        </td>
                                        <td>
                                            {contact.accountNumber}
                                        </td>
                                        <td rowSpan='2'>
                                            <button onClick={() => handleEditContactButtonClick(contact.id)}>Thay đổi</button>
                                            <button onClick={() => handleDeleteContactButtonClick(contact.id)}>Xóa</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{contact.bankId ?
                                            (banks[contact.bankId] ?
                                                banks[contact.bankId].name :
                                                'Ngân hàng không còn được hỗ trợ')
                                            :
                                            'Tài khoản nội bộ'}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <ContactModificationModal onSubmit={handleSubmitModificatedContact} />
        </React.Fragment>
    );
};

export default Contacts;
