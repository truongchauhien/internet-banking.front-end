import _ from 'lodash';
import {
    FECTH_CONTACTS_REQUEST,
    FECTH_CONTACTS_FAILURE,
    FECTH_CONTACTS_SUCCESS,
    PATCH_CONTACT_REQUEST,
    PATCH_CONTACT_FAILURE,
    PATCH_CONTACT_SUCCESS,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_FAILURE,
    DELETE_CONTACT_SUCCESS,
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_FAILURE,
    CREATE_CONTACT_SUCCESS,
    CONTACT_CREATION_INPUT_CHANGE,
    CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE,
    CONTACT_MODIFICATION_INPUT_CHANGE,
    CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE,
    CONTACT_MODIFICATION_INIT,
    CONTACT_CREATION_INIT
} from './actions';
import { convertArrayToObject } from '../../../commons/utils/array-utils';
import { combineReducers } from 'redux';

const initState = {
    byId: {},
    allIds: [],
    contactCreation: {
        fields: {
            name: '',
            accountNumber: '',
            bankId: ''
        },
        isModalOpen: false
    },
    contactModification: {
        fields: {
            id: null,
            name: '',
            accountNumber: '',
            bankId: ''
        },
        isModalOpen: false
    }
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FECTH_CONTACTS_SUCCESS:
            return convertArrayToObject(action.payload, 'id');
        case CREATE_CONTACT_REQUEST:
            const postedContact = {
                id: action.payload.tempId,
                ...action.payload.postedContact
            };

            return { ...state, [postedContact.id]: postedContact };
        case CREATE_CONTACT_FAILURE:
            return _.omit(state, action.payload.tempId);
        case CREATE_CONTACT_SUCCESS:
            return Object.fromEntries(
                Object.entries(state).map(([id, item]) => {
                    if (id !== action.payload.tempId) {
                        return [id, item];
                    }

                    return [
                        action.payload.createdContact.id,
                        action.payload.createdContact
                    ];
                })
            );
        case DELETE_CONTACT_SUCCESS:
            return _.omit(state, action.payload.id);
        case PATCH_CONTACT_SUCCESS:
            return _.merge({}, state, {
                [action.payload.id]: action.payload
            });
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FECTH_CONTACTS_SUCCESS:
            return action.payload.map(item => item.id);
        case CREATE_CONTACT_REQUEST:
            return [...state, action.payload.tempId];
        case CREATE_CONTACT_FAILURE:
            return state.filter(id => id !== action.payload.tempId);
        case CREATE_CONTACT_SUCCESS:
            return state.map(id =>
                id !== action.payload.tempId ?
                    id : action.payload.createdContact.id
            );
        case DELETE_CONTACT_SUCCESS:
            return state.filter(item => item !== action.payload.id);
        default:
            return state;
    }
};

const contactCreationFields = ['name', 'accountNumber', 'bankId'];
const contactCreationFieldsReducer = (state = initState.contactCreation.fields, action) => {
    switch (action.type) {
        case CONTACT_CREATION_INPUT_CHANGE:
            if (!contactCreationFields.includes(action.payload.field)) {
                return state;
            }
            return Object.assign({}, state, {
                [action.payload.field]: action.payload.value
            });
        case CONTACT_CREATION_INIT:
            return _.merge({}, state, {
                name: '',
                accountNumber: '',
                bankId: ''
            });
        default:
            return state;
    }
}

const contactCreationModalOpenStatusReducer = (state = initState.contactCreation.isModalOpen, action) => {
    switch (action.type) {
        case CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE:
            return action.payload;
        default:
            return state;
    }
};

const contactModificationFields = ['name', 'accountNumber', 'bankId'];
const contactModificationFieldsReducer = (state = initState.contactModification.fields, action) => {
    switch (action.type) {
        case CONTACT_MODIFICATION_INIT:
            return action.payload;
        case CONTACT_MODIFICATION_INPUT_CHANGE:
            if (!contactModificationFields.includes(action.payload.field)) {
                return state;
            }
            return Object.assign({}, state, {
                [action.payload.field]: action.payload.value
            });
        default:
            return state;
    }
};

const contactModificationModalOpenStatusReducer = (state = initState.contactModification.isModalOpen, action) => {
    switch (action.type) {
        case CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE:
            return action.payload;
        default:
            return state;
    }
};

const contactCreationReducer = combineReducers({
    fields: contactCreationFieldsReducer,
    isModalOpen: contactCreationModalOpenStatusReducer
});

const contactModificationReducer = combineReducers({
    fields: contactModificationFieldsReducer,
    isModalOpen: contactModificationModalOpenStatusReducer
});

export const contactsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    contactCreation: contactCreationReducer,
    contactModification: contactModificationReducer
});

export default contactsReducer;
