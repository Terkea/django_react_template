import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    error: {
        login: null,
        register: null,
        update_profile: null
    },
    payload: {
        token: null,
        profile: null,
        email: null
    }
}

const authStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const authGenerateToken = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const authGetEmail = (state, action) => {
    return updateObject(state, {
        loading: false,
        payload: {
            email: action.payload.email,
        }
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
        payload: {
            profile: null,
            email: null,
            token: null
        }
    });
}


const authLogout = (state) => {
    return updateObject(state, {
        payload: {
            token: null,
            profile: null,
            email: null
        },
    });
}


const updateProfileStart = (state) => {
    return updateObject(state, {
        loading: true
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
        loading: false,
        error: action.error,
    });
}


const handlers = {
    [actionTypes.AUTH_START]: authStart,
    [actionTypes.AUTH_SUCCESS]: authSuccess,
    [actionTypes.AUTH_FAIL]: authFail,
    [actionTypes.AUTH_GET_EMAIL]: authGetEmail,
    [actionTypes.AUTH_GENERATE_TOKEN]: authGenerateToken,
    [actionTypes.AUTH_LOGOUT]: authLogout,

    [actionTypes.UPDATE_PROFILE_START]: updateProfileStart,
    [actionTypes.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [actionTypes.UPDATE_PROFILE_FAIL]: updateProfileFail,
}

const reducer = (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state

export default reducer;