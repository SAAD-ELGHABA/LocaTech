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
                user: action.payload.user, 
                token: action.payload.token
            };
        case "REGISTER":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
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


const biens = [

]
export const BienReducer = (state=biens,action)=>{
    switch (action.type){
        case "ALLBIENS":
            return {
                ...state,
                payload:action.payload
            }
        default :
        return state;
    }
}