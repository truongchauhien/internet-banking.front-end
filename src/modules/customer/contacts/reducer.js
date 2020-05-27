import _ from 'lodash';
import { combineReducers } from 'redux';
import { convertArrayToObject } from '../../../commons/utils/array-utils';
import {
    FECTH_CONTACTS_SUCCESS
} from './actions';
import {
    CREATE_CONTACT_REQUEST,
    CREATE_CONTACT_FAILURE,
    CREATE_CONTACT_SUCCESS
} from './creation/actions'
import {
    DELETE_CONTACT_SUCCESS,
} from './deletion/actions'
import {
    PATCH_CONTACT_SUCCESS,
} from './modification/actions';
import contactCreationReducer from './creation/reducer';
import contactModificationReducer from './modification/reducer';
import queryReducer from './query/reducer';

const initState = {
    byId: {},
    allIds: []
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
                [action.payload.contact.id]: action.payload.contact
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

export const contactsReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    contactCreation: contactCreationReducer,
    contactModification: contactModificationReducer,
    query: queryReducer
});

export default contactsReducer;
