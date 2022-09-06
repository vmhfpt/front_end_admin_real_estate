import axiosClient from '../handleApi';

const PropertyApi = {
    
    createProperty : (file, files, data) => {
     // console.log(data)
        var formData = new FormData();
      if(files){
        for (let i = 0; i < files.length; i++) {
          formData.append("images",files[i]);
        }
       
      }
      if(file){
        formData.append("file",file);
      }
      var exampleObject = data;
      function getFormData(object) {
        Object.keys(object).forEach(key => {
           if(key !== "utility" && key !== "type"){
            formData.append(key, object[key])
           }
        });
        return formData;
    }
    getFormData(exampleObject);

    var arrayUtility = data.utility;
    for (var i = 0; i < arrayUtility.length; i++) {
       formData.append('utility[]', arrayUtility[i]);
    }

    var arrayType = data.type;
    for (var i = 0; i < arrayType.length; i++) {
       formData.append(`type[${i}]`,  JSON.stringify(arrayType[i]));
   }

     

       const url = '/admin/property/add';
        return axiosClient.post(url, 
           formData,
        { 
            headers: {
                       // Accept: 'application/json',
                       "content-type": "multipart/form-data",
                    //   "content-type": "application/json",
                       authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                  },
                  
        },
       
       

        );
    },
   getList : (page) => {
        const url = '/admin/property/list';
        return axiosClient.get(url,  { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    },
    updateProperty : (file, files, data) => {
      // console.log(data) dataDeleteFiles
         var formData = new FormData();

         var arrayDeleteFiles = data.dataDeleteFiles;
    for (var i = 0; i < arrayDeleteFiles.length; i++) {
       formData.append('dataDeleteFiles[]', arrayDeleteFiles[i]);
    }
       if(files){
         for (let i = 0; i < files.length; i++) {
           formData.append("images",files[i]);
         }
        
       }
       if(file){
         formData.append("file",file);
       }
       var exampleObject = data;
       function getFormData(object) {
         Object.keys(object).forEach(key => {
            if(key !== "utility" && key !== "type" && key !== "dataDeleteFiles"){
             formData.append(key, object[key])
            }
         });
         return formData;
     }
     getFormData(exampleObject);
 
     var arrayUtility = data.utility;
     for (var i = 0; i < arrayUtility.length; i++) {
        formData.append('utility[]', arrayUtility[i]);
     }
 
     var arrayType = data.type;
     for (var i = 0; i < arrayType.length; i++) {
        formData.append(`type[${i}]`,  JSON.stringify(arrayType[i]));
    }
 
      
 
        const url = '/admin/property/update/' + data.slug;
         return axiosClient.put(url, 
            formData,
         { 
             headers: {
                        // Accept: 'application/json',
                        "content-type": "multipart/form-data",
                     //   "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                   },
                   
         },
        
        
 
         );
     },
     destroy : (params) => {
      const url = '/admin/property/delete/' ;
      return axiosClient.delete(url,
          { 
          headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}`},
          data: {
              id: params
          }
      });
     },
     
   /*  showCategory : (params) => {
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
    }*/
  }
  
  export default PropertyApi; 