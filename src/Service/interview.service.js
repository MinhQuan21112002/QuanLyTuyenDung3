import axios, { AxiosError } from "axios";
const API_URL = "http://localhost:8080"

const getInterviewByID = async (token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/interview/getRoom/${id}`,config );
        if(res.data.status==="200 OK") {
            return res.data.data;
        } else{
            throw new Error(res.data.message);
        }
    } catch(error) {
        const axiosError = error;
        if (axiosError && axiosError.response && axiosError.response.status === 403) {
            throw new Error("no_permistion");
        }
        else   {
            throw error;
        }

    }
}

const getCandidatesByJob = async (token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/interview/candidates/${id}`,config );
        return res.data.data;
    } catch(error) {
        const axiosError = error;
        if (axiosError && axiosError.response && axiosError.response.status === 403) {
            throw new Error("no_permistion");
        }
        else   {
            throw error;
        }

    }
}
const getMyInterviewer = async (token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/interview/interviewers`,config );
        return res.data.data;
    } catch(error) {
        const axiosError = error;
        if (axiosError && axiosError.response && axiosError.response.status === 403) {
            throw new Error("no_permistion");
        }
        else   {
            throw error;
        }

    }
}
const interviewerAssign = async (token, form) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.post(`${API_URL}/interview/interviewerAssign`,form,config );
        return res.data;
        
    } catch(error) {
        const axiosError = error;
        if (axiosError && axiosError.response && axiosError.response.status === 403) {
            throw new Error("no_permistion");
        }
        else   {
            throw error;
        }

    }
}





export const interviewService = {
    getCandidatesByJob,
    getMyInterviewer,
    interviewerAssign,
    getInterviewByID,
};
