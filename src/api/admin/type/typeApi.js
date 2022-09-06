import axiosClient from '../handleApi';
const TypeApi = {
    getList : () => {
        const url = '/admin/type/list';
        return axiosClient.get(url, 
            { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } },
            
            );
    },
    create : (params) => {
        const url = '/admin/type/add';
        return axiosClient.post(url, { name : params },
            { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } },
            );
    },
    update : (data) => {
        const url = '/admin/type/update/'+ data.id ;
        return axiosClient.put(url, { name : data.name },{ headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    destroy : (id) => {
        const url = '/admin/type/delete/' ;
        return axiosClient.delete(url,
            { 
            headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`},
            data: {
                id: id
            }
        });
    }
    
}
export default TypeApi;