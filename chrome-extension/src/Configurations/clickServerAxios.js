import axios from 'axios';

export const axiosClickServer = axios.create({
   baseURL: 'http://localhost:5000/'
});

export default axiosClickServer;