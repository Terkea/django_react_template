import { combineReducers } from 'redux'

import user from './user'
import getProfileReducer from './getProfile'

const allReducers = combineReducers({
    user: user
})

export default allReducers
