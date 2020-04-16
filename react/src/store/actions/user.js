import axiosInstance from '../../axiosConfig';
import * as actionTypes from './actionTypes';

// one year
const SESSION_TIMEOUT = 3600 * 24 * 365; 


export const authStart = (email) => {
    return {
        type: actionTypes.AUTH_START,
        payload: {
            token: null,
            profile: null,
            email: email
        },
        loading: true
    }
}

/**
 *
 * Makes an API request to the given URL
 * if the response is valid then it stores on localStorage the token
* along with the expirationDate for the given time
* after it dispatches authSuccess and checkAuthTimeout
*
* In case there's an error we'll grab it with err.response.data
* Since our backend returns errors as a nasted object
* we'll have to decompose it and build an array out of that
* before pasing it to the view where it has to be rendered
*/
export const authValidateLogin = (email, loginCode) => dispatch => {
    // shows loading again
    dispatch(authStart(email));
    axiosInstance.post('passwordless/auth/token/', {
        email: email,
        token: loginCode
    }).then(res => {
        dispatch(getProfile(res.data.token))
        dispatch(authSuccess)
        console.log("RES HERE MOTHERFUCKER")
        console.log(res.data.token)
    }).catch(err => {
        // Axios catch error returns javascript error not server response
        // The server does not reply to wrong tokens 
        dispatch(authFail(err.response.data.token))
        dispatch(authLogout());
    });
}

export const authSendLoginCode = email => dispatch => {
    dispatch(authStart(email));
    axiosInstance.post('passwordless/auth/email/', {
        email: email
    })
        .then(res => {
            dispatch(authLoginCodeSentSuccess());
        })
        .catch(err => {
            // Axios catch error returns javascript error not server response
            dispatch(authFail(err.message));
            dispatch(authLogout());
        })
}

export const authLoginCodeSentSuccess = (error) => {
    return {
        type: actionTypes.AUTH_LOGIN_CODE_SENT_SUCCESS,
        loading: false,
    }
}

export const authSuccess = (token, profile) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            profile: profile
        },
        loading: false,
        error: null
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        loading: false,
        error: error,
    }
}

export const updateProfileStart = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_START,
        loading: true
    }
}

export const updateProfileSuccess = (profile) => {
    return {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        payload: {
            profile: profile
        }
    }
}

export const updateProfileFail = (error) => {
    return {
        type: actionTypes.UPDATE_PROFILE_FAIL,
        loading: false,
        error: error,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000)
    }
}

export const authLogout = () => {
    if (localStorage.getItem('token')) { localStorage.removeItem('token') };
    if (localStorage.getItem('expirationDate')) { localStorage.removeItem('expirationDate') };
    return {
        type: actionTypes.AUTH_LOGOUT,
        loading: null,
        error: null,
        payload: {
            token: null,
            profile: null,
            email: null
        },
    };
}

// verify the integrity of the token
export const getProfile = token => dispatch => {
    axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
    axiosInstance.get('/rest-auth/user/')
        .then(res => {
            dispatch(authSuccess(token, res.data));
        })
        .catch(err => {
            // Axios catch error returns javascript error not server response
            // dispatch(authFail(err));
            authFail(err.message)
            // what is this by the way? old : Object.keys(err.response.data).map((key) => err.response.data[key])
            dispatch(authLogout());
        })
}



/**
 * If there's no token in localStorage
 * log out the user
 *
 * if there's a token
 *  check its validity and dispatch the appropriate action
 *
 */
export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
        dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            dispatch(getProfile(token))
            dispatch(checkAuthTimeout(SESSION_TIMEOUT));
        }
    }
}