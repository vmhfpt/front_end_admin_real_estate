import axiosClient from '../handleApi';

const handleToken = {
    getRefreshToken : (params) => {
         const url = '/admin/refresh-token';
         return axiosClient.post(url, { params });
    },
    getAccessToken : (params, accessToken) => {
        const url = '/admin/access-token';
        return axiosClient.post(url, { params },{ headers: {"authorization" : `Bearer ${accessToken}`} });
    }
  }
  
  export default handleToken; 