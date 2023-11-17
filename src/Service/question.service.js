import axios, { AxiosError } from "axios";
const API_URL = "http://localhost:8080"


const getAllquestion = async (token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/question`,config);
        return res.data.data;
    }catch (error) {
        console.log(error);
    }

};




export const questionService = {
    getAllquestion,


};
