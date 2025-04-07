import {combineReducers,legacy_createStore} from 'redux'
import {userReducer} from './reducers/userReducer'
const reducers = combineReducers({
    userReducer,
})

export const store = legacy_createStore(reducers);