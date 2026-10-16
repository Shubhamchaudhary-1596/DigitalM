import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '' });
const storedToken = localStorage.getItem('token');
if (storedToken) api.defaults.headers.common.Authorization = 'Bearer ' + storedToken;
