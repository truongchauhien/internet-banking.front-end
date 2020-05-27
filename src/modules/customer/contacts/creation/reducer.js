import { combineReducers } from "redux";
import {
    CONTACT_CREATION_INPUT_CHANGE,
    CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE,
    CONTACT_CREATION_INIT
} from "./actions";
import BANKS from "../../../../commons/constants/banks";

const initState = {
    fields: {
        name: '',
        accountNumber: '',
        bankId: BANKS.INTERNAL
    },
    isModalOpen: false
};

const contactCreationFields = ['name', 'accountNumber', 'bankId'];
const inputFieldsReducer = (state = initState.fields, action) => {
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

const modalOpenStatusReducer = (state = initState.isModalOpen, action) => {
    switch (action.type) {
        case CONTACT_CREATION_MODAL_OPEN_STATUS_CHANGE:
            return action.payload;
        default:
            return state;
    }
};

export const contactCreationReducer = combineReducers({
    fields: inputFieldsReducer,
    isModalOpen: modalOpenStatusReducer
});

export default contactCreationReducer;
