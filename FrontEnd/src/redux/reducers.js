const user = {
    userInfo: null,
    isLoggedIn: false,
    token: localStorage.getItem('token') || null,
}
export const userReducer = (state = user, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                userInfo: action.payload, 
                token: action.payload.token,
                isLoggedIn:true
            };
        case "REGISTER":
            return {
                userInfo: action.payload, 
                token: action.payload.token,
                isLoggedIn:true
            };
        case "LOGOUT":
            localStorage.removeItem('token');
            return {
                user: null,
                token: null
            };
        default:
            return state;
    }
};


const users = []
export const usersReducer = (state=users,action)=>{
    switch (action.type){
        case "GET_USERS":
            return action.payload;
        case "RESET_USERS":
            return users;
        default:
            return state;
    }
}


const CourtierSignUp = {
    step1:{
        'nom':null,
        'prenom':null,
        'email':null,
        'password':null,
    },
    step2:{
        'agence':null,
        'ICE':null,
        'RC':null
    },
}
export const CourtierSignUpReducer = (state=CourtierSignUp,action)=>{
    switch (action.type){
        case "STEP1":
            return {
                ...state,
                step1:action.payload
            }
        case "STEP2":
            return {
                ...state,
                step2:action.payload
            }
            default:
                return state;
    }
}

const ActuelCourtier = [

]

export const ActuelCourtierReducer = (state=ActuelCourtier,action)=>{
    switch (action.type){
        case "ActuelCourtier":
            return action.payload;
        default :
        return state;
    }
}

const recentCourtiers = [

]

const loadingGlobal = true;

export const loadingReducer = (state = loadingGlobal, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return action.payload;
      default:
        return state;
    }
  };

export const RecentCourtiers = (state=recentCourtiers,action)=>{
    switch (action.type){
        case "GET_RECENT_COURTIERS":
            return  action.payload;
            
            default:
                return state;
    }
}

const files = [

]

export const filesReducer = (state=files,action)=>{
    switch(action.type){
        case "SET_FILES":
            return action.payload;
        case "RESET_FILES":
            return files;
            default:
            return state
    }
}

const createBien = {
    title:null,
    description:null,
    budget:null,
    superficier:null,
    chambres:null,
    salles_de_bain:null,
    etage:null,
    meuble:false,
    ville:null,
    type:null,
    typeAffaire:null,
    quartier:null,
    images:[],
    video:null,
    status:1
}


export const CreateBienReducer = (state=createBien,action)=>{
    switch(action.type){
        case "SET_CREATE_BIEN":
            return {
                ...state,
                ...action.payload,
              };
        case "RESET_CREATE_BIEN":
            return createBien;
        default :
        return state;
    }
}

const CreateBienToggle = false;

export const CreateBienToggleReducer = (state = CreateBienToggle, action) => {
    switch (action.type) {
      case 'SHOW_CREATEBIENTOGGLE':
        return action.payload;
      default:
        return state;
    }
  };

  
  const biens = [
  
  ]
  export const BienReducer = (state=biens,action)=>{
      switch (action.type){
          case "ALLBIENS":
              return action.payload;
          default :
          return state;
      }
  }
  const biensAssistant = [
  
  ]
  export const BiensAssistantReducer = (state=biensAssistant,action)=>{
      switch (action.type){
          case "ALLBIENS_ASSISTANT":
              return action.payload;
          default :
          return state;
      }
  }


const villes = []

export const VillesReducer = (state=villes,action)=>{
    switch (action.type){
        case "GET_VILLES":
            return action.payload;

        default:
            return state;
    }
}

const status = []

export const statusReducer = (state=status,action)=>{
    switch (action.type){
        case "GET_STATUS":
            return action.payload;
        default:
            return state;
    }
}

const filterBiens = {
    type: "",
    ville: "",
    typeAffaire: "",
    budget: null,
}
export const filterBiensReducer = (state=filterBiens,action)=>{
    switch(action.type){
        case "SET_FILTER":
            return action.payload;
        case "RESET_FILTER":
            return filterBiens;
        default :
            return state;
    }
}

const filtredBiens = []

export const filtredBiensReducer = (state=filtredBiens,action)=>{
    switch(action.type){
        case "GET_FILTRED_BIENS":
            return action.payload;
        case "RESET_FILTERED_BIENS":
            return [];
        default:
            return state;
    }
}


const messages = [
    {
        role: "ai",
        data: "Bonjour, comment puis-je vous aider aujourd'hui 😊?",
    },
]

export const ChatAiReducer = (state=messages,action)=>{
    switch (action.type){
        case "PUSH_MESSAGE":
            return [
                ...state,action.payload
            ]
        default:
            return messages;
    }
}


const Favoris = []
export const FavorisReducer = (state=Favoris,action)=>{
    switch (action.type){
        case "ADD_TO_FAVORIS":
            return action.payload;
        case "RESET_FAVORIS":
            return Favoris;
        default :
        return state;
    }
}


const AllCourtiers = []
export const AllCourtiersReducer = (state=AllCourtiers,action)=>{
    switch (action.type){
        case "GET_ALL_COURTIERS":
            return action.payload;
        default:
            return state;
    }
}

const Agences = []
export const AgencesReducer = (state=Agences,action)=>{
    switch (action.type){
        case "GET_AGENCES":
            return action.payload;
        default:
            return state;
    }
}

const Admins = []
export const AdminsReducer = (state=Admins,action)=>{
    switch (action.type){
        case "GET_ADMINS":
            return action.payload;
        default:
            return state;
    }
}

const Commandes = []
export const CommandesReducer = (state=Commandes,action)=>{
    switch (action.type){
        case "GET_COMMANDES":
            return action.payload;
        default:
            return state;
    }
}

const conversations = [];

export const conversationsReducer = (state=conversations,action)=>{
    switch (action.type){
        case "SET_CONVERSATIONS":
            return action.payload;
        case "REMOVE_CONVERSATION":
            return state.filter((conversation)=>conversation._id !== action.payload.id)
        default:
            return state;
    }
}

const currentConversation = {};
export const currentConversationReducer = (state=currentConversation,action)=>{
    switch (action.type){
        case "SET_CURRENT_CONVERSATION":
            return action.payload;
        case "ADD_MESSAGE_TO_CURRENT_CONVERSATION":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
}

const assistants = []
export const assistantsReducer = (state=assistants,action)=>{
    switch(action.type){
        case "GET_ASSISTANTS":
            return action.payload;
        default :
            return state;
    }
}

const allConversations = []
export const allConversationsReducer = (state=allConversations,action)=>{
    switch(action.type){
        case "GET_CONVERSATION_ASSISTANT":
            return action.payload;
        default:
            return state;
    }
}

const statusConversations = [];
export const statusConversationsReducer = (state=statusConversations,action)=>{
    switch(action.type){
        case "GET_STATUS_CONVERSATIONS":
            return action.payload;
        default :
            return state;
    }
}

const notifications = []
export const notificationsReducer = (state=notifications,action)=>{
    switch(action.type){
        case "GET_NOTIFICATIONS":
        return action.payload
        case "ADD_NOTIFICATION":
            return [action.payload, ...state];
        default :
        return state
    }
}


const BienCommentaire = []
export const BienCommentaireReducer = (state=BienCommentaire,action)=>{
    switch(action.type){
        case "GET_BIEN_COMMENTAIRES":
            return action.payload
        case "ADD_COMMENTAIRE":
            return [...state, action.payload];
        default :
            return state
    }
}