import PropertyApi from "../../api/admin/property/propertyApi";
class PropertyService {
   async create(file, files, data){
   
        return await PropertyApi.createProperty(file, files, data);   
    }
    async index(page){
   
        return await PropertyApi.getList(page);   
    }
    async update(file, files, data){
   
        return await PropertyApi.updateProperty(file, files, data);   
    }
    async destroy(id){
         return await PropertyApi.destroy(id);
    }

}
export default new PropertyService();