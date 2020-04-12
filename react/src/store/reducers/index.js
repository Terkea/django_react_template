import { combineReducers } from 'redux'

import user from './user'

const allReducers = combineReducers({
    user: user
})

export default allReducers
