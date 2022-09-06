import { useDispatch } from "react-redux";
import   {updateUtility }  from "./utilityReducer";
import {useState} from "react";
import {update}  from "./utilityReducer";
function EditUtility ({dataEdit, setPop}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(dataEdit.name);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const validate = (e) => {
    if(e.target.value.length <= 5){
      setError('* Tên tiện ích phải ít nhất 5 ký tự');
  } else {
      setError('');
  }
  setName(e.target.value);
  }
const handleUpdate = () => {
   if(error === ''){
       dispatch(update({name : name, id : dataEdit._id }));
       dispatch(updateUtility({name : name, id : dataEdit._id }));
       setStatus('Đã sử tiện ích thành ' + name);

   }
}
   return ( <div className="container" >
   <div className="card card-warning">
     <div className="card-header">
       <h3  className="card-title">Sửa tiện ích "{dataEdit.name}"</h3>

       <div className="card-tools">
         
         <button onClick={() => setPop(false)} type="button" className="btn btn-tool" data-card-widget="remove">
           <i className="fas fa-times"></i>
         </button>
       </div>
      
     </div>
 
     <div className="card-body">
    
<div className="container">
 <div className="row">
   <div className="col-md-12">
     <div className="card card-primary">  
       <form
         action="https://blogapi.x10.mx/admin/category/handleadd"
         method="POST"
       >
        {status ? <div className="alert alert-success">
             <strong>Thông báo!</strong> {status}
           </div> : ''}
           
          
         <input
           type="hidden"
           name="_token"
           value="75soPHrhfELNnce0Wkjjw6BreXbTrpKRnTjMtDpm"
         />{" "}
         <div className="card-body">
           <div className="form-group">
             <label htmlFor="exampleInputEmail1">Tên danh mục</label>
             <input
             onChange={(e) => validate(e)}
              value={name}
               type="text"
               className="form-control"
               id="exampleInputEmail1"
               placeholder="Nhập tên tiện ích"
             />
           </div>
           {error ? <div className="alert alert-danger">
             <strong>Cảnh báo!</strong> {error}
           </div> : ''}
           
       
         </div>
         <div className="card-footer">
           <button 
           onClick={handleUpdate}
           type="button" className="btn btn-primary">
             Lưu lại
           </button>
         </div>
       </form>
     </div>

     <div className="col-md-6"></div>
   </div>
 </div>
</div>

     </div>
    
   </div>
 
 </div>)
}
export default EditUtility;