import { Routes, Route} from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Home from '../../page/post/home/home';
import Detail from '../../page/post/detail/detail';
function LayoutPost() {
  return (
    <div>
        <h1> Header</h1>
      <div className="content">
        <Outlet />
      </div>
      <h2> Footer</h2>
    </div>
  );
}
function RouteAdmin(){
    return (
      <>
      <Routes>
      <Route path="/" element={<LayoutPost />}>
       <Route index element={<Home />} />
       <Route path="detail" element={<Detail />} />
     </Route>
   </Routes>
   </>
    )
}
export default RouteAdmin;