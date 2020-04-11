import axios from 'axios';
import * as actionTypes from './actionTypes';


export const getProfileStart = () => {
    return {
        type: actionTypes.GET_PROFILE_START
    }
}

export const getProfileSuccess = (profile) => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        payload: profile
    }
}

export const getProfileFail = (error) => {
    return {
        type: actionTypes.GET_PROFILE_FAIL,
        error: error
    }
}

export const getProfile = (token) => dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/user/', {
        token: token,
    })
        .then(res => {
            dispatch(getProfileStart)

        })
        .catch(err => {
            dispatch(getProfileFail(err))
        })
}