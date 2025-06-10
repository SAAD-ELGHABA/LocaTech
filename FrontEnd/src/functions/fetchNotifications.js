import axios from "axios";

export const fetchNotifications = async (dispatch)=>{
    try {
        const res = await axios.get('/api/get-notifications',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({
            type:"GET_NOTIFICATIONS",
            payload:res.data.notifications
        })
    } catch (error) {
        console.log(error);
        
    }
}