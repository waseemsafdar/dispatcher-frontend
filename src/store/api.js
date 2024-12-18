import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
  withCredentials: true,

});

export const login = async (credentials) => {
  const response = await apiClient.post('/login', credentials, { withCredentials: true });

 return response.data;
};
export const logout = async () => {
  const response = await apiClient.post('/logout');

 return response.data;
};
export const getPartner = async () => {
  const response = await apiClient.get('/partners');
  return response.data;
};
export const getTrailer = async () => {
  const response = await apiClient.get('/trailer');
  return response.data;
};
export const addPartnerdata = async (partner) => {
  const response = await apiClient.post('/partners', partner);
  return response.data;
};



// Add other API methods here
export default apiClient;
