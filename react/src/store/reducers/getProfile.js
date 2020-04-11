import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: null,
}

const getProfileStart = (state, action) => {
    return updateObject(state, {
        error: null
    });
}

const getProfileSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
    });
}

const getProfileFail = (state, action) => {
    return updateObject(state, {
        error: null,
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