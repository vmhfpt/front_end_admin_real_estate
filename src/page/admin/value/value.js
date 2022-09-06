import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { setValue } from "./valueReducer";
import {getList} from "./selectValue";
import {create} from "./valueReducer";
import {getLists} from "../type/typeReducer";
import {destroy} from "./valueReducer";
function Value({setPop, dataValue}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
       dispatch(setValue(dataValue.data));
    }, []);
    const validateName = (e) => {
        if(e.target.value.length <= 0){
            setError('*');
        } else {
            setError('');
        }
        setName(e.target.value);
    }
    const handleSubmit = async () => {
        if(name.length <= 0){
            setError('*');
        }else {
            
             dispatch(create({
                 name : name, 
                 id : dataValue.id
             }));
            
             setTimeout(() => {
                dispatch(getLists());
              }, 100);
        }
    }
    const handleDelete = (id) => {
       if(window.confirm(`Bạn có chắc muốn xóa  không ?`)){
        dispatch(destroy(id)) ;
        setTimeout(() => {
            dispatch(getLists());
          }, 100);
      }
    }
    const dataItem = useSelector(getList);
   return (<div className="row">
   <div className="col-12">
     <div className="card">
       <div className="card-header">
         <h3 className="card-title">Giá trị</h3>

         <div className="card-tools">
         
           <div className="input-group input-group-sm" style={{"width": "100%"}}>
            {error && <span className="custom-error"> {error}</span>}
             <input 
             onChange={(e) => validateName(e)}
             type="text" name="table_search" className="form-control float-right" placeholder="Nhập giá trị" />

             <div className="input-group-append">
               <button 
               onClick={handleSubmit}
               type="button" className="btn btn-default">
                 Thêm mới
               </button>
               <button  
               onClick={() => setPop({data : [],  hidden : false})}
               type="button" className="btn btn-tool" data-card-widget="remove">
   <i className="fas fa-times"></i>
 </button>
             </div>
           </div>
         </div>
       </div>
    
       <div className="card-body table-responsive p-0" style={{"height": "300px"}}>
         <table className="table table-head-fixed text-nowrap">
           <thead>
             <tr>
               <th>STT</th>
               <th>Giá trị</th>
               <th>Tiện ích</th>
               <th>Xóa</th>
             </tr>
           </thead>
           <tbody>
             
             {dataItem.map((item, key) => (
                <tr key={key}>
               <td>{key +1 }</td>
               <td>{item.value}</td>
               <td>{dataValue.name}</td>
               <td> <Link
                 onClick={() => handleDelete(item._id)}
                className="delete btn btn-danger btn-sm"
                to="#"
              >
                <i className="fas fa-trash"></i>
                Xóa
              </Link></td>
             </tr>

             ))}
           </tbody>
         </table>
       </div>
      
     </div>

   </div>
 </div>);
}
export default Value;