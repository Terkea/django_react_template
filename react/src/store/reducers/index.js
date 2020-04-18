import { combineReducers } from 'redux'
import user from './user'
import userInterface from './userInterface'

const allReducers = combineReducers({
    user,
    userInterface,
})

export default allReducers
