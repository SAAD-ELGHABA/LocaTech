import {combineReducers,legacy_createStore} from 'redux'
import {ActuelCourtierReducer, AdminsReducer, AgencesReducer, allConversationsReducer, AllCourtiersReducer, assistantsReducer, BienReducer, BiensAssistantReducer, ChatAiReducer, CommandesReducer, conversationsReducer, CreateBienReducer, CreateBienToggleReducer, currentConversationReducer, FavorisReducer, filesReducer, filterBiensReducer, filtredBiensReducer, loadingReducer, RecentCourtiers, statusConversationsReducer, statusReducer, userReducer, usersReducer, VillesReducer} from './reducers'
import { CourtierSignUpReducer } from './reducers';

const reducers = combineReducers({
    userReducer,
    CourtierSignUpReducer,
    RecentCourtiers,
    loadingReducer,
    CreateBienReducer,
    filesReducer,
    BienReducer,
    BiensAssistantReducer,
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
    currentConversationReducer,
    assistantsReducer,
    allConversationsReducer,
    statusConversationsReducer
})

export const store = legacy_createStore(reducers);