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
    CREATE_CONTACT_SUCCESS
} from './contacts-actions';
import { convertArrayToObject } from '../../../commons/utils/array-utils';
import { combineReducers } from 'redux';

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FECTH_CONTACTS_SUCCESS:
            return $byId$handleFetchContactsSuccess(state, action);
        case CREATE_CONTACT_REQUEST:
            return $byId$handleCreateContactRequest(state, action);
        case CREATE_CONTACT_FAILURE:
            return $byId$handleCreateContactFailure(state, action);
        case CREATE_CONTACT_SUCCESS:
            return $byId$handleCreateContactSuccess(state, action);
        case DELETE_CONTACT_SUCCESS:
            return $byId$handleDeleteContactSuccess(state, action);
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FECTH_CONTACTS_SUCCESS:
            return $allIds$handleFetchContactsSuccess(state, action);
        case CREATE_CONTACT_REQUEST:
            return $allIds$handleCreateContactRequest(state, action);
        case CREATE_CONTACT_FAILURE:
            return $allIds$handleCreateContactFailure(state, action);
        case CREATE_CONTACT_SUCCESS:
            return $allIds$handleCreateContactSuccess(state, action);
        case DELETE_CONTACT_SUCCESS:
            return $allIds$handleDeleteContactSuccess(state, action);
        default:
            return state;
    }
};

function $byId$handleFetchContactsSuccess(state, action) {
    return convertArrayToObject(action.payload, 'id');
}

function $allIds$handleFetchContactsSuccess(state, action) {
    return action.payload.map(item => item.id);
}

function $byId$handleCreateContactRequest(state, action) {
    const postedContact = {
        id: action.payload.tempId,
        ...action.payload.postedContact
    };

    return { ...state, [postedContact.id]: postedContact };
}

function $allIds$handleCreateContactRequest(state, action) {
    return [...state, action.payload.tempId];
}

function $byId$handleCreateContactFailure(state, action) {
    return _.omit(state, action.payload.tempId);
}

function $allIds$handleCreateContactFailure(state, action) {
    return state.filter(id => id !== action.payload.tempId);
}

function $byId$handleCreateContactSuccess(state, action) {
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
}

function $allIds$handleCreateContactSuccess(state, action) {
    return state.map(id =>
        id !== action.payload.tempId ?
            id : action.payload.createdContact.id
    );
}

function $byId$handleDeleteContactSuccess(state, action) {
    return _.omit(state, action.payload.id);
}

function $allIds$handleDeleteContactSuccess(state, action) {
    return state.filter(item => item !== action.payload.id);
}

export const contactsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer
});

export default contactsReducer;
