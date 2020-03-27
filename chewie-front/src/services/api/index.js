import axios from 'axios';
import Auth from '../../utils/auth';

export const baseURL = 'http://localhost:3333';

const http = axios.create({
  baseURL,
  timeout: 5000
});

http.interceptors.request.use(
  config => {
    try {
      const token = Auth.getToken();
      if (token && token.length > 0) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Error parsing token', e);
    }
    return config;
  },
  error => {
    console.log('API error', error);
    return Promise.reject(error);
  }
);

export default http;
