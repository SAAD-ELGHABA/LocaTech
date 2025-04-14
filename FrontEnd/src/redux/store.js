import {combineReducers,legacy_createStore} from 'redux'
import {ActuelCourtierReducer, BienReducer, CreateBienReducer, CreateBienToggleReducer, filesReducer, loadingReducer, RecentCourtiers, userReducer, VillesReducer} from './reducers'
import { CourtierSignUpReducer } from './reducers';
const reducers = combineReducers({
    userReducer,
    CourtierSignUpReducer,
    RecentCourtiers,
    loadingReducer,
    CreateBienReducer,
    filesReducer,
    BienReducer,
    VillesReducer,
    ActuelCourtierReducer,
    CreateBienToggleReducer
})

export const store = legacy_createStore(reducers);