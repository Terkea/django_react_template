import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    error: {
        login: null,
        register: null
    },
    payload: {
        token: null,
        profile: null
    }
}

const authStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        payload: {
            token: action.payload.token,
            profile: action.payload.profile
        },
        error: {
            login: null,
            register: null
        },
        loading: false,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

const registerFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}


const authLogout = (state) => {
    return updateObject(state, {
        payload: {
            token: null,
            profile: null
        },
    });
}

const handlers = {
    [actionTypes.AUTH_START]: authStart,
    [actionTypes.AUTH_SUCCESS]: authSuccess,
    [actionTypes.AUTH_FAIL]: authFail,
    [actionTypes.AUTH_LOGOUT]: authLogout,
    [actionTypes.REGISTER_FAIL]: registerFail,
}

const reducer = (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state

export default reducer;