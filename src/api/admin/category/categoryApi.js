import axiosClient from '../handleApi';

const CategoryApi = {
    getList : (params) => {
        const url = '/admin/category/list';
        return axiosClient.get(url,  { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    createCategory : (params) => {
        const url = '/admin/category/add';
        return axiosClient.post(url, { params }, { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    showCategory : (params) => {
        const url = '/admin/category/show/' + params;
        return axiosClient.get(url, { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    update : (params, slug) => {
        const url = '/admin/category/update/' + slug;
        return axiosClient.put(url, { params },{ headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    destroy : (params) => {
        const url = '/admin/category/delete/' ;
        return axiosClient.delete(url,
            { 
            headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`},
            data: {
                id: params
            }
        
        });
    }
  }
  
  export default CategoryApi; 