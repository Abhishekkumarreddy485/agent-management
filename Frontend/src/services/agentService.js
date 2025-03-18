import axios from 'axios';

const API_URL = "http://localhost:5000/api/agents";

export const addAgent = async (agentData) => {
    return await axios.post(`${API_URL}/add`, agentData);
};

export const getAgents = async () => {
    return await axios.get(`${API_URL}`);
};

export const deleteAgent = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
