import { Link } from "react-router-dom";
import CategoryApi from "../../../api/admin/category/categoryApi";
import { useEffect, useState } from "react";
import CategoryService from "../../../service/admin/category.service";
import { useDispatch, useSelector } from "react-redux";
import {getList} from "./categoryReducer";
import {getStateCategory} from "./selectCategory";
function Category() {
  const  dataItem = useSelector(getStateCategory);
  const dispatch = useDispatch();
  const [statusDelete, setStatus] = useState('');
  //const [dataItem, setdataItem] = useState([]);
  const handleDelete = async (id) => {
    const response = await CategoryService.destroy(id);
    //console.log(response);
    if(response.status === "success") {
       setStatus('Xóa thành công' + response.data.name);
    }
  }
  useEffect(() => {
     dispatch(getList());
  }, []);
 
  return (
    <div className="content-wrapper" style={{ minHeight: "806px" }}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Danh sách danh mục </h3>
               
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
           { statusDelete ?  <div className="alert alert-warning">
                      <strong>Thông báo!</strong> {statusDelete}
                    </div> : ''}
            <div className="card-body table-responsive p-0">
              
              <table className="table table-hover text-nowrap">
                
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên </th>
                    <th>Danh mục cha</th>
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
                      <td>{item.parent_id ? item.parent_id.name : "Danh mục cha"}</td>
                      <td>
                        <span className="tag tag-success">Kích hoạt</span>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm"
                          to={'/admin/category/edit/' + item.slug}
                        >
                          <i className="fas fa-pencil-alt"></i>
                          Sửa
                        </Link>
                      </td>
                      <td>
                        <Link
                          onClick={() => handleDelete(item._id)}
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
    </div>
  );
}
export default Category;
