import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('X-API-TOKEN');
    if (token) {
      config.headers['X-API-TOKEN'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserRole = async () => {
  try {
    const response = await axiosInstance.get('/users/current');
    const { role } = response.data.data;
    return role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem('X-API-TOKEN');
};

export default axiosInstance;
