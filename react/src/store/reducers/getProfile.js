import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: null,
    profile: null
}

const getProfileStart = (state, action) => {
    return updateObject(state, {
        error: null,
        profile: null
    });
}

const getProfileSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        profile: action.payload
    });
}

const getProfileFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        profile: null
    });
}

const handlers = {
    [actionTypes.GET_PROFILE_START]: getProfileStart,
    [actionTypes.GET_PROFILE_SUCCESS]: getProfileSuccess,
    [actionTypes.GET_PROFILE_FAIL]: getProfileFail,
}

const reducer = (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state

export default reducer;