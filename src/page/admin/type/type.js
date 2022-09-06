import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {getLists} from "./typeReducer";
import { useDispatch, useSelector } from "react-redux";
import {getListType} from "./selectType";
import AddType from "./addType";
import EditType from "./editType";
import {destroy} from "./typeReducer";
import  Value  from "../value/value";

function Type(){
    const [value, setValue] = useState({data : [], hidden : false});
    const [tabEdit, setTabEdit] = useState(false);
    const [tabAdd, setTabAdd] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(getLists());
    }, []);
    const handleDelete = (id, name) => {
      if(window.confirm(`Bạn có chắc muốn xóa "${name}" không ?`)){
        dispatch(destroy(id));
      }
    }
    const dataItem = useSelector(getListType);
   return (<div className="content-wrapper" style={{ minHeight: "806px" }}>




   <div onClick={() => setTabAdd(false)} className="row">
     <div className="col-12">
       <div className="card">
         <div className="card-header">
           <h3 className="card-title">Danh sách tiện ích mở rộng </h3>
       
           <div className="card-tools">
             <div
               className="input-group input-group-sm"
               style={{ width: "150px" }}
             >
               <input
                 type="text"
                 name="table_search"
                 className="form-control float-right"
                 placeholder="Search"
               />

               <div className="input-group-append">
                 <button type="submit" className="btn btn-default">
                   <i className="fas fa-search"></i>
                 </button>
               </div>
             </div>
           </div>
         </div>
       
         <div className="card-body table-responsive p-0">
           
           <table className="table table-hover text-nowrap">
             
             <thead>
               <tr>
                 <th>STT</th>
                 <th>Tên </th>
             
                 <th>Giá trị</th>
                 <th></th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
               {dataItem && dataItem.map((item, key) => (
                 <tr key={key}>
                   <td>{key + 1}</td>
                   <td>{item.name}</td>
                  
                   <td>
                   <Link 
                    onClick={() =>  setValue({
                      data : item.multiple_value,
                      name : item.name,
                      id : item._id,
                      hidden : true,
                    })}
                    className="btn btn-success btn-sm" to="#"> Xêm thêm  <span className="tag tag-success">{item.multiple_value.length} giá trị</span></Link>
                   </td>
                   <td>
                     <Link 
                        onClick={() => setTabEdit(item)}
                       className="btn btn-info btn-sm"
                       to="#"
                     >
                       <i className="fas fa-pencil-alt"></i>
                       Sửa
                     </Link>
                   </td>
                   <td>
                     <Link
                       onClick={() => handleDelete(item._id, item.name)}
                       data-id="3"
                       data-url="/admin/category/delete"
                       className="delete btn btn-danger btn-sm"
                       to="#"
                     >
                       <i className="fas fa-trash"></i>
                       Xóa
                     </Link>
                   </td>
                 </tr>
               ))}

               
             </tbody>
           </table>
          
         </div>
       </div>
     </div>
   </div>
 
   <div className="row">
   <button onClick={() => {
  setTabEdit(false);
  setTabAdd(!tabAdd);
}} type="button"  className="btn btn-success"> {!tabAdd ? 'Thêm Mới' : 'Đóng lại'} </button>
  
</div>


{tabAdd && <div className="custom-popup">
    <AddType setTab={setTabAdd}/>
</div> }

{tabEdit && <div className="custom-popup">
    <EditType dataEdit={tabEdit} setPop={setTabEdit}/>
</div>}

{ value.hidden && <div className="custom-popup">
    <Value setPop={setValue}
    dataValue={value}
    />
</div> }

 </div>);
}
export default Type;