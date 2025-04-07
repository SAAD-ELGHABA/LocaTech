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