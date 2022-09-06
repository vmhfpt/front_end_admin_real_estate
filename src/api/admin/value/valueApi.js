import axiosClient from '../handleApi';
const ValueApi = {
   
    create : (data) => {
        const url = '/admin/value/add';
        return axiosClient.post(url, { value : data.name, type_id : data.id },
            { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } },
        );
    },
    destroy : (id) => {
        const url = '/admin/value/delete/' ;
        return axiosClient.delete(url,
            { 
            headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`},
            data: {
                id: id
            }
        });
    },
}
export default ValueApi;