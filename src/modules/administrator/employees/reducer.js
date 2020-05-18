import { combineReducers } from "redux";
import { convertArrayToObject } from '../../../commons/utils/array-utils';
import { FETCH_EMPLOYEES_SUCCESS } from "./actions";
import { CREATE_EMPLOYEE_SUCCESS } from "./employee-creation/actions";
import { UPDATE_EMPLOYEE_SUCCESS } from "./employee-modification/actions";
import { DELETE_EMPLOYEE_SUCCESS } from "./employee-deletion/actions";
import employeeCreationReducer from "./employee-creation/reducer";
import { employeeModificationReducer } from "./employee-modification/reducer";

const initState = {
    byId: {},
    allIds: []
};

const byIdReducer = (state = initState.byId, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES_SUCCESS:
            return convertArrayToObject(action.payload.employees, 'id');
        case CREATE_EMPLOYEE_SUCCESS:
            return Object.assign({}, {
                [action.payload.employee.id]: action.payload.employee
            }, state);
        case UPDATE_EMPLOYEE_SUCCESS:
            return _.merge({}, state, {
                [action.payload.id]: action.payload
            });
        case DELETE_EMPLOYEE_SUCCESS:
            return _.omit(state, [action.payload.id])
        default:
            return state;
    }
};

const allIdsReducer = (state = initState.allIds, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES_SUCCESS:
            return action.payload.employees.map(employee => employee.id);
        case CREATE_EMPLOYEE_SUCCESS:
            return [action.payload.employee.id, ...state];
        case DELETE_EMPLOYEE_SUCCESS:
            return state.filter(id => id !== action.payload.id);
        default:
            return state;
    }
};

export const employeesReducer = combineReducers({
    byId: byIdReducer,
    allIds: allIdsReducer,
    employeeCreation: employeeCreationReducer,
    employeeModification: employeeModificationReducer
});

export default employeesReducer;
