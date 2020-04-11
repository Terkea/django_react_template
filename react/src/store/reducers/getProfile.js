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



const getProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROFILE_START: return getProfileStart(state, action);
        case actionTypes.GET_PROFILE_SUCCESS: return getProfileSuccess(state, action);
        case actionTypes.GET_PROFILE_FAIL: return getProfileFail(state, action);
        default:
            return state;
    }
}

export default getProfileReducer;