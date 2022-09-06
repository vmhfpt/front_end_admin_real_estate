import { Link} from "react-router-dom";
import {useState, useEffect} from "react";
import EditUtility from "./editUtility";
import AddUtility from "./addUtility";
import {getList} from "./utilityReducer";
import {getListUtility} from "./selectUtility";
import { getPaginate } from "./selectUtility";
import {useDispatch, useSelector} from "react-redux";
import {destroy} from "./utilityReducer";
function Utility(){
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
    const paginate = useSelector(getPaginate);
    const dataItem = useSelector(getListUtility); 
   
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
                  <th>Tên </th>
              
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
                   
                    <td>
                      <span className="tag tag-success">Kích hoạt</span>
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
  
    {paginate && <div className="row">
    <div className="col-sm-12 col-md-5">
        <div className="dataTables_info" id="example2_info" role="status" aria-live="polite"> Tổng {paginate.sumPage} trang trên {paginate.itemTotal} tiện ích
        </div>
    </div>
    <div className="col-sm-12 col-md-7">
        <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
            <ul className="pagination">
            {paginate.prev_page ? <li onClick={() =>  dispatch(getList((paginate.currentPage) - 1))} className="paginate_button page-item previous disabled" id="example2_previous"><Link to="#"
                        aria-controls="example2" data-dt-idx="0" tabIndex="0" className="page-link">Previous</Link></li> : ''}
            {
    new Array(paginate.sumPage).fill(0).map((_, index) => (
         <li key={index} onClick={() =>  dispatch(getList(index + 1))} className={"paginate_button page-item " + (index + 1 === paginate.currentPage ? "active" : "")}><Link to="#" aria-controls="example2" data-dt-idx="1"
            tabIndex="0" className="page-link">{index + 1}</Link></li>
    ))
}
      {paginate.next_page ?  <li onClick={() =>  dispatch(getList((paginate.currentPage) + 1))} className="paginate_button page-item next" id="example2_next"><Link to="#" aria-controls="example2"
                data-dt-idx="7" tabIndex="0" className="page-link">Next</Link></li> : ''}
              
            </ul>
        </div>
    </div>
</div>}
<button type="button" onClick={() => {
  setTabEdit(false);
  setTabAdd(!tabAdd);
}} className="btn btn-success"> {!tabAdd ? 'Thêm tiện ích' : 'Đóng lại'} </button>

{tabAdd ? <div className="custom-popup">
   <AddUtility setPop={setTabAdd}/>
</div> : ''}

{tabEdit ? <div className="custom-popup">
   <EditUtility dataEdit={tabEdit} setPop={setTabEdit} />
</div> : ''}


  </div>)
}
export default Utility;