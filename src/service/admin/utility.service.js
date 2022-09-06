import UtilityApi from "../../api/admin/utility/utilityApi";
class UtilityService {
   async getALl(){
      return await UtilityApi.getAll();
   }
   async index(page){
      return await UtilityApi.getList(page);
   }
   async create(name){
      return await UtilityApi.create(name);
   }
   async update(data){
       return await UtilityApi.update(data);
   }
   async destroy (id) {
       return await UtilityApi.destroy(id);
   }
}
export default new UtilityService();