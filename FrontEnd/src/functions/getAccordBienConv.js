import axios from "axios";

export const getAccordBienConv = async (BienId)=>{
    try {
        const res = await axios.get(`/api/get-accord-bien/${BienId}`,{
            headers:{
                Authorization:`Bearer ${localStorage?.getItem('token')}`
            }
        });
        return res?.data?.bienAccord?.status;
    } catch (error) {
        console.log(error);
        
    }
}