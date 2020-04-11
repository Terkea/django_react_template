import { combineReducers } from 'redux'

import authReducer from './auth'
import getProfileReducer from './getProfile'

const allReducers = combineReducers({
    authentication: authReducer,
    profile: getProfileReducer
})

export default allReducers
