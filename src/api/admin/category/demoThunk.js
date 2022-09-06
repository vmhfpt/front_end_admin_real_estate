import axiosClient from '../handleApi';

const ThunkApi = {
    getApi : (params) => {
        const url = '/admin/category/list';
        return axiosClient.get(url,  { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
  }
  
  export default ThunkApi; 