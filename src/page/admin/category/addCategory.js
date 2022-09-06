import { useEffect, useState } from "react";
import CategoryApi from "../../../api/admin/category/categoryApi";
import CategoryService from "../../../service/admin/category.service";

function Add() {
  const [name, setName] = useState("");
  const [parent_id, setCategoryId] = useState(0);
  const [listCategory, setCategory] = useState([]);
  const [errorName, setErrorName] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    const getListCategory = async () => {
      const response = await CategoryService.index();
      if (response) setCategory(response);
    };
    getListCategory();
  }, [status]);
  const validateName = (e) => {
    if(e.target.value.length < 5){
      setErrorName('* Tên danh mục phải ít nhất 5 ký tự');
    }else {
      setErrorName('');
    }
    setName(e.target.value);
  };
  
  const handleSubmit = async () => {
    if(name.length < 5){
      setErrorName('* Tên danh mục phải ít nhất 5 ký tự');
    }else if(errorName === '') {
        const create = await CategoryService.create(name, parent_id);
        if(create.status === 'success') {
            setName("");
             setStatus(`Thêm danh mục ${name} thành công` );
        }
    }
  }
  return (
    <div className="content-wrapper" style={{ minHeight: "823px" }}>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Thêm danh mục mới </h3>
                </div>
               
                <form
                  action="https://blogapi.x10.mx/admin/category/handleadd"
                  method="POST"
                >
                  {status ?  <div className="alert alert-success">
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
                        onChange={(e) => validateName(e)}
                        value={name}
                        type="text"
                        name="name"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Nhập tên danh mục"
                      />
                    </div>
                    {errorName ?  <div className="alert alert-danger">
                      <strong>Cảnh bảo!</strong> . {errorName}
                    </div> : ''}
                    <div className="form-group">
                      <label>Danh mục cha</label>
                      <select
                        onChange={(e) => setCategoryId(e.target.value)}
                        name="parent_id"
                        className="form-control"
                      >
                        <option value="0">-- Danh mục cha --</option>

                        {listCategory.map((item, key) => (
                          <option key={key + 1} value={item._id}>
                            {" "}
                            {item.parent_id == null ? "" : "---"} {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                
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
      </section>
    </div>
  );
}
export default Add;
