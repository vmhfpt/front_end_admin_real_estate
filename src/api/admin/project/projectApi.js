import axiosClient from '../handleApi';

const ProjectApi = {
    
    createProject : (file, data) => {
        var formData = new FormData();
      if(file){
        formData.append("file",file);
      }
      var exampleObject = data;
      function getFormData(object) {
        Object.keys(object).forEach(key => {
            formData.append(key, object[key])
           
        });
        return formData;
    }
    getFormData(exampleObject);
       const url = '/admin/project/add';
        return axiosClient.post(url, 
           formData,
        { 
            headers: { 
                       "content-type": "multipart/form-data",
                       authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                  }, 
        },
        );
    },
   getList : (page) => {
        const url = '/admin/project/list';
        return axiosClient.get(url,  { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
   updateProperty : (file, data) => {
         var formData = new FormData();
       if(file){
         formData.append("file",file);
       }
       var exampleObject = data;
       function getFormData(object) {
         Object.keys(object).forEach(key => {
             formData.append(key, object[key])
         });
         return formData;
     }
     getFormData(exampleObject);
        const url = '/admin/project/update/' + data.slug;
         return axiosClient.put(url, 
            formData,
         { 
             headers: {
                        "content-type": "multipart/form-data",
                        authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                   },
         },
         );
     },
    destroy : (params) => {
      const url = '/admin/project/delete/' ;
      return axiosClient.delete(url,
          { 
          headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`},
          data: {
              id: params
          }
      });
     },
     
   
  }
  
  export default ProjectApi; 