import axios from 'axios';

export const axiosClickServer = axios.create({
   baseURL: process.env.REACT_APP_CLICK_SERVER_URL
});

export default axiosClickServer;