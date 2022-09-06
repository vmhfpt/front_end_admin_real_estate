import CategoryApi from "../../api/admin/category/categoryApi";

class  CategoryService {
    async index () {
       return await CategoryApi.getList() ;
    }
    async create(name, parent_id){
       return await CategoryApi.createCategory({name, parent_id});
    }
    async show(slug) {
        return await CategoryApi.showCategory(slug);
    }
    async update(name, parent_id, slug) {
        return await CategoryApi.update({name, parent_id},  slug);
    }
    async destroy(id) {
        return await CategoryApi.destroy(id);
    }
}
export default new  CategoryService();