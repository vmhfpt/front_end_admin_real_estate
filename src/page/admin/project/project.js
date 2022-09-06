import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import AddProject from "./addProject";
import EditProject from "./editProject";
import {memo} from "react";
import {getList} from "./projectReducer";
import {getListProject} from "./selectProject";
import {destroy} from "./projectReducer";
function Project(){
    const dispatch = useDispatch();
    useEffect( () => {
      dispatch(getList(1));
    }, []);
     const [tabAdd, setTabAdd] = useState(false);
     const [tabEdit, setTabEdit] = useState(false);
      const handleDelete = (id, name) => {
        if(window.confirm(`Bạn có chắc muốn xóa ${name} không ?`)){
          dispatch(destroy(id));
        }
      }
      const paginate = [];
      const dataItem = useSelector(getListProject) ;
      
      return( <div className="content-wrapper" style={{ minHeight: "806px" }}>
  
  
  
  
      <div onClick={() => setTabAdd(false)} className="row">
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
                    <th>Tên dự án </th>
                    <th> Ảnh</th>
                    <th> Chủ đầu tư</th>
                    <th> Giá bán</th>
                    <th>Trạng thái</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataItem && dataItem.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.name}</td>
                      <td> <img className="img-custom" alt="" src={item.thumb} /> </td>
                      <td> {item.project_value_id.investor}</td>
                      <td> {item.price_sale}</td>
                      <td>
                        <span className="tag tag-success">{item.active === 1 ? "Kích hoạt" : "Tạm khóa"}</span>
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
      <div className="col-sm-12 col-md-5">
          <div className="dataTables_info" id="example2_info" role="status" aria-live="polite"> Tổng {paginate.sumPage} trang trên {paginate.itemTotal} tiện ích
          </div>
      </div>
      <div className="col-sm-12 col-md-7">
          <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
              <ul className="pagination">
              {paginate.prev_page ? <li  className="paginate_button page-item previous disabled" id="example2_previous"><Link to="#"
                          aria-controls="example2" data-dt-idx="0" tabIndex="0" className="page-link">Previous</Link></li> : ''}
              {
      new Array(paginate.sumPage).fill(0).map((_, index) => (
           <li key={index}  className={"paginate_button page-item " + (index + 1 === paginate.currentPage ? "active" : "")}><Link to="#" aria-controls="example2" data-dt-idx="1"
              tabIndex="0" className="page-link">{index + 1}</Link></li>
      ))
  }
        {paginate.next_page ?  <li  className="paginate_button page-item next" id="example2_next"><Link to="#" aria-controls="example2"
                  data-dt-idx="7" tabIndex="0" className="page-link">Next</Link></li> : ''}
                
              </ul>
          </div>
      </div>
  </div>
  <button type="button" onClick={() => {
    setTabEdit(false);
    setTabAdd(!tabAdd);
  }} className="btn btn-success"> {!tabAdd ? 'Thêm dự án' : 'Đóng lại'} </button>
  
  {tabAdd ? <div className="custom-popup">
  <div className="overflow-custom">
     <AddProject setTab={setTabAdd} />
     </div>
  </div> : ''}
  
  {tabEdit ? <div className="custom-popup">
  <div className="overflow-custom">
     <EditProject dataEdit={tabEdit} setTab={setTabEdit} />
     </div>
  </div> : ''}
  
  
    </div>)
  }
export default memo(Project);