import axios from 'axios';

const API_KEY = 'cbbe08c6a8ba790440b5597739d49786';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export default api;