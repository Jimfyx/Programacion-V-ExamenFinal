import axios from 'axios';

const API = 'http://localhost:5000/api/contact/';

export const createContact = async (data) => {
    const response = await axios.post(API,data)
    return response.data;
}