import { Link} from "react-router-dom";
import { useState, useEffect} from "react";
import {getList} from "./propertyReducer";
import {destroy} from "./propertyReducer";
import { useDispatch, useSelector} from "react-redux";
import {getListProperty} from "./selectProperty";
import AddProperty from '../../../page/admin/property/addProperty';
import EditProperty from "../../../page/admin/property/editProperty";
function Property() {
  const dispatch = useDispatch();
  //const [dataItem, setDataItem] = useState([]);
  const [tabEdit, setTabEdit] = useState(false);
  const [tabAdd, setTabAdd] = useState(false);
     useEffect(() => {
       dispatch(getList());
    }, []);
    const deleteProperty = (id, name) => {
      if(window.confirm(`Bạn có chắc muốn xóa "${name}" không ?`)){
        dispatch(destroy(id));
      }
    }
    const dataItem = useSelector(getListProperty);
   // console.log(dataItem)
    return (<div className="content-wrapper" style={{ minHeight: "806px" }}>
    <div  className="row" onClick={()=> setTabAdd(false)}>
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Danh sách tiện ích </h3>
        
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
                  <th>Tiêu đề </th>
                  <th> Ảnh</th>
                  <th> Giá</th>
                  <th> Danh mục</th>
                  <th>Trạng thái</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataItem.map((item, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.title}</td>
                    <td> <img className="img-custom" alt="" src={item.thumb} /> </td>
                    <th> {item.price}</th>
                    <th> {item.category_id.name}</th>
                    <td>
                      <span className="tag tag-success">{item.active === 1 ? "Kích hoạt" : "Nháp"}</span>
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
                       onClick={() => deleteProperty(item._id, item.title)}
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
    <div className="col-sm-12 col-md-5">
        <div className="dataTables_info" id="example2_info" role="status" aria-live="polite"> Tổng  trang trên tiện ích
        </div>
    </div>
    <div className="col-sm-12 col-md-7">
        <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
            <ul className="pagination">
          

    
     
              
            </ul>
        </div>
    </div>
</div>
<button type="button" onClick={() => {
    setTabAdd(!tabAdd);
  }} className="btn btn-success"> {tabAdd ? "Đóng lại" : "Thêm mới"}</button>


{tabAdd ? <div className="custom-popup">
  <div className="overflow-custom"> 
     <AddProperty setTab={setTabAdd}/>
  </div>
</div> : ''}

{tabEdit ? <div className="custom-popup">
<div className="overflow-custom"> 
   <EditProperty setTab={setTabEdit} dataEdit={tabEdit} setPop={setTabEdit} />
   </div>
</div> : ''}


  </div>);
}
export default Property;