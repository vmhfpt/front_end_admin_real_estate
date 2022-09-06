import { useState}  from "react";
import {create} from "./utilityReducer";
import {useDispatch } from "react-redux"
import {getList} from "./utilityReducer";
function AddUtility({setPop}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const validateName = (e) => {
        if(e.target.value.length <= 5){
            setError('* Tên tiện ích phải ít nhất 5 ký tự');
        } else {
            setError('');
        }
        setName(e.target.value);
    }
    const handleSubmit = async () => {
        if(name.length <= 5){
            setError('* Tên tiện ích phải ít nhất 5 ký tự');
        }else {
          const response = await dispatch(create(name));
        
          if(response.payload.status === 'error'){
            setError(response.payload.message)
          }else {
            setName('');
            setStatus(response.payload.message);
          }
        }
    }
    return (    <div className="container" >
    <div className="card card-success">
      <div className="card-header">
        <h3 className="card-title">Thêm tiện ích nhanh</h3>

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
          />
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Tên tiện ích</label>
              <input
              onChange={(e) => validateName(e)}
                type="text"
                value={name}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Nhập tên danh mục"
              />
            </div>
            {error ?  <div className="alert alert-danger">
              <strong>Cảnh bảo!</strong> {error}
            </div> : ''}
           
        
          </div>
          <div className="card-footer">
            <button 
            onClick={handleSubmit}
            type="button" className="btn btn-primary">
              Thêm mới
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
export default AddUtility;