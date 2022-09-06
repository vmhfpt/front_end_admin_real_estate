import TypeApi from "../../api/admin/type/typeApi";
class TypeService {
   async index(page){
      return await TypeApi.getList(page);
   }
   async create(name){
      return await TypeApi.create(name);
   }
   async update(data){
       return await TypeApi.update(data);
   }
   async destroy (id) {
       return await TypeApi.destroy(id);
   }
}
export default new TypeService();