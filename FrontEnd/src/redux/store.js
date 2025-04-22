import {combineReducers,legacy_createStore} from 'redux'
import {ActuelCourtierReducer, BienReducer, ChatAiReducer, CreateBienReducer, CreateBienToggleReducer, FavorisReducer, filesReducer, filterBiensReducer, filtredBiensReducer, loadingReducer, RecentCourtiers, statusReducer, userReducer, VillesReducer} from './reducers'
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
    CreateBienToggleReducer,
    filterBiensReducer,
    ChatAiReducer,
    FavorisReducer,
    filtredBiensReducer,
    statusReducer
})

export const store = legacy_createStore(reducers);