import {combineReducers,legacy_createStore} from 'redux'
import {userReducer} from './reducers'
import { CourtierSignUpReducer } from './reducers';
const reducers = combineReducers({
    userReducer,
    CourtierSignUpReducer
})

export const store = legacy_createStore(reducers);