
import ValueApi from "../../api/admin/value/valueApi";
class ValueService {
  
   async create(data){
      return await ValueApi.create(data);
   }
   async destroy (id) {
    return await ValueApi.destroy(id);
   }
 
}
export default new ValueService();