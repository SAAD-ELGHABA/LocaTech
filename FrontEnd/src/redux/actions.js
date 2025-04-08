export const login = (token,user)=>{
    return {
        type:'LOGIN',
        payload:{token,user}
    }
}
export const register = (token,user)=>{
    return {
        type:'REGISTER',
        payload:{token,user}
    }
}

export const logout = ()=>{
    return {
        type:"LOGOUT"
    }
}