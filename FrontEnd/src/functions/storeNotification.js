import axios from "axios";

export const storeNotification = async (notification)=>{
     try {
    const response = await axios.post('/api/store-notifications', notification, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });

    console.log('✅ Notification stored in Laravel:', response.data);

  } catch (error) {
    console.error('❌ Error sending to Laravel:', error.message);
  }
}