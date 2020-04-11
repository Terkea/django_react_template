import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

const handlers = {
    [actionTypes.AUTH_START]: authStart,
    [actionTypes.AUTH_SUCCESS]: authSuccess,
    [actionTypes.AUTH_FAIL]: authFail,
    [actionTypes.AUTH_LOGOUT]: authLogout,
}

const reducer = (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state

export default reducer;