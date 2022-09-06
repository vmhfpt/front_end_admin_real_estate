import axiosClient from '../handleApi';

const authenticationApi = {
    login: (params) => {
      const url = '/admin/login';
      return axiosClient.post(url, { params });
    },
    logout : (params, accessToken) => {
        const url = '/admin/logout';
        return axiosClient.post(url, { params });
    }
  
  }
  
  export default authenticationApi; 