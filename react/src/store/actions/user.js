import axiosInstance from '../../axiosConfig';
import * as actionTypes from './actionTypes';

const SESSION_TIMEOUT = 3600 * 24 * 365;

export const authStart = (email) => {
    return {
        type: actionTypes.AUTH_START,
        error: null,
        payload: {
            token: null,
            profile: null,
            email: email
        },
        loading: true,
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
export const authValidateLogin = (email, loginCode, notificationCallback = (message, outcome) => { }) => dispatch => {
    dispatch(authStart(email));
    axiosInstance.post('passwordless/auth/token/', {
        email: email,
        token: loginCode
    }).then(res => {
        notificationCallback("You have successfully logged in!", "SUCCESS")
        const token = res.data.token;
        const expirationDate = new Date(new Date().getTime() + SESSION_TIMEOUT);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(getProfile(res.data.token))
        dispatch(checkAuthTimeout(SESSION_TIMEOUT));
    }).catch(err => {
        // Axios catch error returns javascript error or bad server response
        // The server replies to wrong tokens with a response saying what the problem is
        if (err.response) {
            notificationCallback(err.response.data.token, "ERROR");
            dispatch(authFail());
        } else {
            notificationCallback(err.message, "ERROR");
            dispatch(authFail());
        }
    });
}

export const authSendLoginCode = (email, notificationCallback = (message, outcome) => { }) => dispatch => {
    dispatch(authStart(email));
    // for some reason the headers have to be cleared when
    // making requests anonymously otherwise i'll pick on the ones used previously
    delete axiosInstance.defaults.headers.common["Authorization"]
    axiosInstance.post('passwordless/auth/email/', {
        email: email
    })
        //beware: ORDER MATTERS
        .then(res => {
            dispatch(authLoginCodeSentSuccess());
            notificationCallback("The code was sent to your email.", "SUCCESS")
        })
        .catch(err => {
            // Axios catch error returns javascript error or bad server response
            dispatch(authFail());
            notificationCallback(err.message, "ERROR")
        })
}

export const authLoginCodeSentSuccess = () => {
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

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
        loading: false,
        error: true,
    }
}

export const updateProfile = (token, profile, notificationCallback = (message, outcome) => { }) => dispatch => {
    dispatch(updateProfileStart());
    axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
    axiosInstance.put('/rest-auth/user/', profile)
        .then(res => {
            dispatch(updateProfileSuccess(res.data))
            notificationCallback("Profile Updated Successfully", "SUCCESS");
        })
        .catch(err => {
            dispatch(updateProfileFail())
            notificationCallback(err.message, "ERROR");
        })
}

export const updateProfileStart = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_START,
        loading: true
    }
}

export const updateProfileSuccess = (new_profile) => {
    return {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        loading: false,
        payload: {
            profile: new_profile
        }
    }
}

export const updateProfileFail = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_FAIL,
        loading: false,
        error: true
    }
}

export const checkAuthTimeout = (expirationTime) => dispatch => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationTime * 1000)

}

export const authReset = () => {
    return {
        type: actionTypes.AUTH_RESET,
        loading: null,
        error: null,
        payload: {
            token: null,
            profile: null,
            email: null
        },
    };
}

export const authLogout = (notificationCallback = (message, outcome) => { }) => dispatch => {
    dispatch(authReset())
    const token = localStorage.getItem('token');
    if (token) {
        // delete the token from db
        axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
        axiosInstance.post('/rest-auth/logout/')
            .then(res => notificationCallback("You have been successfully logged out.", "SUCCESS"))
            .catch(err => notificationCallback("Your client has failed to log out.", "ERROR"))
    }
    if (localStorage.getItem('token')) { localStorage.removeItem('token') };
    if (localStorage.getItem('expirationDate')) { localStorage.removeItem('expirationDate') };
}

// verify the integrity of the token
export const getProfile = token => dispatch => {
    axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
    axiosInstance.get('/rest-auth/user/')
        .then(res => {
            dispatch(authSuccess(token, res.data));
        })
        .catch(err => {
            // Axios catch error returns javascript error or bad server response
            authFail()
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
