import axios from 'axios';

const apiConfig = axios.create({
    baseURL: 'http://localhost:8060/', 
    timeout: 10000, 
});

apiConfig.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt');
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export default apiConfig;