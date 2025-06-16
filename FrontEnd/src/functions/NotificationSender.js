import axios from 'axios';

export const sendNotification = async ( sender, receiver, object, body, data ) =>{
    try {
        const notif = await axios.post(`${import.meta.env.VITE_API_SOCKET}:5000/api/notify`, {
          sender,
          receiver,
          object,
          body,
          data,
        });
        
    } catch (error) {
        console.log(error);
        
    }
}
