import AddressApi from "../../api/admin/address/addressApi";
class AddressService {
   async getCity(){
      return await AddressApi.getCity();
   }
   async getDistrict(code){
    return await AddressApi.getDistrict(code);
   }
   async getWard(code){
    return await AddressApi.getWard(code);
   }
  
}
export default new AddressService();