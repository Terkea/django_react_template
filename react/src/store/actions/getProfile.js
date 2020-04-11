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

export const getProfile = () => dispatch => {

    const token = localStorage.getItem('token');

    dispatch(getProfileStart())
    if (token === undefined) {
        dispatch(getProfileFail('No token provided'))
    }
    else {
        axiosInstance.get('/rest-auth/user/')
            .then(res => {
                dispatch(getProfileSuccess(res.data))
            })
            .catch(err => {
                dispatch(getProfileFail(err.response.data))
            })
    }
}