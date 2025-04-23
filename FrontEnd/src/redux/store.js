import {combineReducers,legacy_createStore} from 'redux'
import {ActuelCourtierReducer, AdminsReducer, AgencesReducer, AllCourtiersReducer, BienReducer, ChatAiReducer, CommandesReducer, conversationsReducer, CreateBienReducer, CreateBienToggleReducer, currentConversationReducer, FavorisReducer, filesReducer, filterBiensReducer, filtredBiensReducer, loadingReducer, RecentCourtiers, statusReducer, userReducer, usersReducer, VillesReducer} from './reducers'
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
    statusReducer,
    usersReducer,
    AllCourtiersReducer,
    AgencesReducer,
    AdminsReducer,
    CommandesReducer,
    conversationsReducer,
    currentConversationReducer
})

export const store = legacy_createStore(reducers);