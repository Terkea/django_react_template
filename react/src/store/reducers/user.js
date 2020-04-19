import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    error: null,
    payload: {
        token: null,
        profile: null,
        email: null
    }
}

const authStart = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        payload: {
            token: action.payload.token,
            profile: action.payload.profile,
            email: action.payload.email,
        }
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error,
        payload: {
            token: action.payload.token,
            profile: action.payload.profile,
        },
    });
}

const authLoginCodeSentSuccess = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error,
    });
}

const authReset = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error,
        payload: {
            token: action.payload.token,
            profile: action.payload.profile,
            email: action.payload.email
        },
    });
}

const updateProfileStart = (state, action) => {
    return updateObject(state, {
        loading: action.loading
    });
}

const updateProfileSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        payload: {
            profile: action.payload.profile
        },
    });
}

const updateProfileFail = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error,
    });
}


const handlers = {
    [actionTypes.AUTH_START]: authStart,
    [actionTypes.AUTH_LOGIN_CODE_SENT_SUCCESS]: authLoginCodeSentSuccess,
    [actionTypes.AUTH_SUCCESS]: authSuccess,
    [actionTypes.AUTH_FAIL]: authFail,
    [actionTypes.AUTH_RESET]: authReset,

    [actionTypes.UPDATE_PROFILE_START]: updateProfileStart,
    [actionTypes.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [actionTypes.UPDATE_PROFILE_FAIL]: updateProfileFail,
}

const reducer = (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state

export default reducer;
