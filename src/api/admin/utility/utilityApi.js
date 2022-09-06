import axiosClient from '../handleApi';
const UtilityApi = {
    getAll : (params) => {
        const url = '/admin/utility/get-all';
        return axiosClient.get(url,
            { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } },
        );
    },
    getList : (params) => {
        const url = '/admin/utility/list?page='+ params;
        return axiosClient.get(url, 
            { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } },
            
            );
    },
    create : (params) => {
        const url = '/admin/utility/add';
        return axiosClient.post(url, { name : params },
            { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } },
            );
    },
    update : (data) => {
        const url = '/admin/utility/update/'+ data.id ;
        return axiosClient.put(url, { name : data.name },{ headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    destroy : (id) => {
        const url = '/admin/utility/delete/' ;
        return axiosClient.delete(url,
            { 
            headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`},
            data: {
                id: id
            }
        });
    }
    
}
export default UtilityApi;