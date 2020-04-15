import { combineReducers } from 'redux'

import user from './user'
import uiState from './uiState'

const allReducers = combineReducers({
    user,
    uiState,
})

export default allReducers
