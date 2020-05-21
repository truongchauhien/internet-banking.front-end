import { combineReducers } from "redux";
import {
    CONTACT_MODIFICATION_INIT,
    CONTACT_MODIFICATION_INPUT_CHANGE,
    CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE
} from "./actions";

const initState = {
    fields: {
        id: null,
        name: '',
        accountNumber: '',
        bankId: ''
    },
    isModalOpen: false
};

const fields = ['name', 'accountNumber', 'bankId'];
const inputFieldsReducer = (state = initState.fields, action) => {
    switch (action.type) {
        case CONTACT_MODIFICATION_INIT:
            return action.payload;
        case CONTACT_MODIFICATION_INPUT_CHANGE:
            if (!fields.includes(action.payload.field)) {
                return state;
            }
            return Object.assign({}, state, {
                [action.payload.field]: action.payload.value
            });
        default:
            return state;
    }
};

const modalOpenStatusReducer = (state = initState.isModalOpen, action) => {
    switch (action.type) {
        case CONTACT_MODIFICATION_MODAL_OPEN_STATUS_CHANGE:
            return action.payload;
        default:
            return state;
    }
};

export const contactModificationReducer = combineReducers({
    fields: inputFieldsReducer,
    isModalOpen: modalOpenStatusReducer
});

export default contactModificationReducer;
