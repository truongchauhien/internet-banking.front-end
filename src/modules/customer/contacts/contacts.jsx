import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { thunkedFetchContacts, thunkedDeleteContact, thunkedPatchContact, thunkedCreateContact } from './contacts-thunks';
import styles from './contacts.scss';

const initState = {
    newContact: {
        name: '',
        accountNumber: ''
    },
    editingContact: {
        id: -1
    }
};

const EDIT_EXIST_CONTACT_$CLEAR = 'EDIT_EXIST_CONTACT_$CLEAR'
const EDIT_EXIST_CONTACT_$CHANGE = 'EDIT_EXIST_CONTACT_$CHANGE';
const EDIT_NEW_CONTACT_$CHANGE = 'EDIT_NEW_CONTACT_$CHANGE';
const EDIT_NEW_CONTACT_$CLEAR = 'EDIT_NEW_CONTACT_$CLEAR';

const reducer = (state, action) => {
    switch (action.type) {
        case EDIT_EXIST_CONTACT_$CLEAR:
            return Object.assign({}, state, {
                editingContact: {
                    id: -1
                }
            });
        case EDIT_EXIST_CONTACT_$CHANGE:
            return _.merge({}, state, {
                editingContact: {
                    ...action.payload
                }
            });
        case EDIT_NEW_CONTACT_$CHANGE:
            return _.merge({}, state, {
                newContact: { ...action.payload }
            });
        case EDIT_NEW_CONTACT_$CLEAR:
            return _.merge({}, state, {
                newContact: {
                    name: '',
                    accountNumber: ''
                }
            });
        default:
            return state;
    }
};

export const Contacts = (props) => {
    const reduxDispatch = useDispatch();
    const contacts = useSelector(state => state.customer.contacts);

    const [state, localDispatch] = useReducer(reducer, initState);

    useEffect(() => {
        reduxDispatch(thunkedFetchContacts());
    }, []);

    const handleDeleteClick = (id) => {
        reduxDispatch(thunkedDeleteContact({ id: id }));
    };

    const handleEditingInputChange = ({ value, type, contactId }) => {
        localDispatch({
            type: EDIT_EXIST_CONTACT_$CHANGE,
            payload: {
                id: contactId,
                [type]: value
            }
        });
    };

    const submitEditingChange = () => {
        const { id: contactId, ...payload } = state.editingContact;
        reduxDispatch(thunkedPatchContact({
            contactId: contactId,
            payload: payload
        }));

        localDispatch({ type: EDIT_EXIST_CONTACT_$CLEAR });
    };

    const handleEditingInputEnterKeyPress = () => {
        if (state.editingContact.id === -1) return;
        submitEditingChange();
    };

    const handleEditingInputBlur = () => {
        if (state.editingContact.id === -1) return;
        submitEditingChange();
    };

    const handleNewContactInputChange = ({ type, value }) => {
        localDispatch({
            type: EDIT_NEW_CONTACT_$CHANGE,
            payload: { [type]: value }
        });
    };

    const handleNewContactClick = () => {
        reduxDispatch(thunkedCreateContact(state.newContact));
        localDispatch({ type: EDIT_NEW_CONTACT_$CLEAR });
    };

    return (
        <div>
            <table className={styles.contactTable}>
                <thead>
                    <tr>
                        <th>Tên liên hệ</th>
                        <th>Số tài khoản</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts && contacts.map((contact, index) => {
                        return (
                            <tr key={contact.id}>
                                <td>
                                    <input defaultValue={contact.name}
                                        onChange={e => {
                                            const newValue = e.target.value;
                                            handleEditingInputChange({
                                                value: newValue,
                                                type: 'name',
                                                contactId: contact.id
                                            });
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleEditingInputEnterKeyPress();
                                            }
                                        }}
                                        onBlur={(e) => {
                                            handleEditingInputBlur();
                                        }}
                                    />
                                </td>
                                <td>
                                    <input defaultValue={contact.accountNumber}
                                        onChange={e => {
                                            const newValue = e.target.value;
                                            handleEditingInputChange({
                                                value: newValue,
                                                type: 'accountNumber',
                                                contactId: contact.id
                                            });
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleEditingInputEnterKeyPress();
                                            }
                                        }}
                                        onBlur={(e) => {
                                            handleEditingInputBlur();
                                        }}
                                    />
                                </td>
                                <td>
                                    <button onClick={(e) => { e.preventDefault(); handleDeleteClick(contact.id) }}>Xóa</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input value={state.newContact.name} onChange={e => handleNewContactInputChange({ type: 'name', value: e.target.value })} />
                        </td>
                        <td>
                            <input value={state.newContact.accountNumber} onChange={e => handleNewContactInputChange({ type: 'accountNumber', value: e.target.value })} />
                        </td>
                        <td>
                            <button onClick={handleNewContactClick}>Thêm</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Contacts;
