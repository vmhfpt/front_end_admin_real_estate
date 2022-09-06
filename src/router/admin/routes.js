




import { Routes, Route, Navigate} from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Footer from '../../page/admin/layout/footer';
import Header from '../../page/admin/layout/header';
import SideBar from '../../page/admin/sideBar/sideBar';
import ListCategory from '../../page/admin/category/category';
import Home from '../../page/admin/home/home';
import AddCategory from '../../page/admin/category/addCategory';
import EditCategory from '../../page/admin/category/editCategory';
import ErrorNot404 from '../../page/admin/layout/not404';

import Property from "../../page/admin/property/property";
import EditProperty from '../../page/admin/property/editProperty';
import ListProperty from '../../page/admin/property/property';
import Utility from "../../page/admin/utility/listUtility";
import Type from "../../page/admin/type/type";
import Project from "../../page/admin/project/project";
function LayoutAdmin() {
  
  return (
    <div>
        <Header />
        <SideBar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
function RouteAdmin(){
 // let navigate = useNavigate()
 
 
    return (     
      <div>
    <Routes>
       <Route path="*" element={<ErrorNot404 />} />
        <Route path="/" element={<LayoutAdmin />}>
           <Route index element={<Home />} />
       </Route>
       <Route path="category" element={<LayoutAdmin />}>
           <Route path="list" element={<ListCategory />} />
           <Route path="add" element={<AddCategory />} />
           <Route path="edit/:slug" element={<EditCategory />} />
      </Route>


      <Route path="utility" element={<LayoutAdmin />}>
           <Route path="list" element={<Utility />} />
      </Route>
      <Route path="type" element={<LayoutAdmin />}>
           <Route path="list" element={<Type />} />
      </Route>

      <Route path="project" element={<LayoutAdmin />}>
           <Route path="list" element={<Project />} />
      </Route>
      <Route path="property" element={<LayoutAdmin />}>
           <Route path="list" element={<ListProperty />} />
           <Route path="add" element={<Property />} />
           <Route path="edit" element={<EditProperty />} />
      </Route>

 </Routes>

   
 </div>)
}
export default RouteAdmin;
// <Route index element={<Home />} />