import axiosInstance from '../../axiosConfig';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, profile) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            profile: profile
        }
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: {
            login: error,
            register: null
        }
    }
}

export const registerFail = error => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: {
            login: null,
            register: error
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => dispatch => {
    dispatch(authStart());
    axiosInstance.post('/rest-auth/login/', {
        username: username,
        password: password
    })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);

            axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
            axiosInstance.get('/rest-auth/user/')
                .then(res => {
                    console.log('valid token', res.data)
                    dispatch(authSuccess(token, res.data));
                })
                .catch(err => dispatch(logout()))
            
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(Object.keys(err.response.data).map((key) => err.response.data[key])))
        })
}


/**
*
* Makes an API request to the given URL
* if the response is valid then it stores on localStorage the token
* along with the expirationDate for the given time
* after it dispatches authSuccess and checkAuthTimeout
*
* In case there's an error we'll grab it with err.response.data
* Since our backend returns errors as a naster object
* we'll have to decompose it and build an array out of that
* before pasing it to the view where it has to be rendered
*/
export const authSignup = (username, email, password1, password2) => dispatch => {
    dispatch(authStart());
    axiosInstance.post('/rest-auth/registration/', {
        username: username,
        email: email,
        password1: password1,
        password2: password2
    })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
            axiosInstance.get('/rest-auth/user/')
                .then(res => {
                    console.log('valid token', res.data)
                    dispatch(authSuccess(token, res.data));
                })
                .catch(err => dispatch(logout()))
            
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(registerFail(Object.keys(err.response.data).map((key) => err.response.data[key])))
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
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            axiosInstance.defaults.headers.common = { 'Authorization': `Token ${token}` }
            axiosInstance.get('/rest-auth/user/')
                .then(res => {
                    console.log('valid token', res.data)
                    dispatch(authSuccess(token, res.data));
                })
                .catch(err => dispatch(logout()))
            
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));

        }
    }
}