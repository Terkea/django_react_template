import { combineReducers } from 'redux'

import auth from './auth'
import getProfile from './getProfile'

const reducer = combineReducers({
    auth,
    getProfile
})

export default reducer
