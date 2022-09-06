import axiosClient from '../handleApi';

const AddressApi = {
    getCity : (params) => {
        const url = '/admin/address/city/list';
        return axiosClient.get(url,  { 
            headers: {
                       "content-type": "application/json",
                       authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                  },
                  
        },);
    },
    getDistrict : (code) => {
        const url = '/admin/address/district?city=' + code;
        return axiosClient.get(url,  { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    getWard : (code) => {
        const url = '/admin/address/ward?district=' + code;
        return axiosClient.get(url,  { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    }
   
  }
  
  export default AddressApi; 