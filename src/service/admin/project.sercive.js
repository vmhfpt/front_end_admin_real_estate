import ProjectApi from "../../api/admin/project/projectApi";
class ProjectService {
   async create(file, data){
        return await ProjectApi.createProject(file, data); 
    }
    async index(page){
        return await ProjectApi.getList(page);
    }
    async update(file, data){
         return await ProjectApi.updateProperty(file, data);
    }
    async destroy(id){
        return await ProjectApi.destroy(id);
    }
}
export default new ProjectService();