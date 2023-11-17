import axios, { AxiosError } from "axios";
const API_URL = "http://localhost:8080";

const getAllquestion = async (token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API_URL}/question`, config);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

const getQuestionByID = async (token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API_URL}/question/${id}`, config);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

const addQuestion = async (token, form) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.post(`${API_URL}/question`, form, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const putQuestion = async (token, form) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.put(`${API_URL}/question`, form, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const questionService = {
    getAllquestion,
    addQuestion,
    getQuestionByID,
    putQuestion,
};
