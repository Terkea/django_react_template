import axiosInstance from '../../axiosConfig';
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


// TODO: 
// the request is valid but still needs more testing
// try to link the auth reducer to this one if possible
export const getProfile = () => dispatch => {

    const token = localStorage.getItem('token');

    dispatch(getProfileStart())
    if (token === undefined) {
        dispatch(getProfileFail('No token provided'))
    }
    else {
        axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
        axiosInstance.get('/rest-auth/user/')
            .then(res => {
                dispatch(getProfileSuccess(res.data))
            })
            .catch(err => {
                dispatch(getProfileFail(err.response.data))
            })
    }
}