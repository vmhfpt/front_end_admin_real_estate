import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryService from "../../../service/admin/category.service";
import { useNavigate } from "react-router-dom";
function Edit() {
  const history = useNavigate();
  const [dataItem, setDataItem] = useState({});
  const [listCategory, setList] = useState([]);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [parent_id, setParentId] = useState("");
  const { slug } = useParams();
  const handleUpdate = async () => {
    if(name.length <= 5 ){
    //  console.log(name.length)
       setErrorName("* Tên phải ít nhất 5 ký tự");
   }else {
       setErrorName("");
       const response = await CategoryService.update( name,parent_id,slug);
       return (history('/admin/category/list'));
   }
  }
  const validateName = (e) => {
    if (e.target.value.length <= 5) {
      setErrorName("* Tên phải ít nhất 5 ký tự");
    } else {
      setErrorName("");
    }
    setName(e.target.value);
  };
 
  useEffect(() => {
    const getItem = async () => {
      const response = await CategoryService.show(slug);
      if (response) {
        setDataItem(response.dataItem);
        setList(response.list);
        setName(response.dataItem.name);
        setParentId(response.dataItem.parent_id);
      }
    };
    getItem();
  }, []);

  return (
    <div className="content">
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">
                      Sửa danh mục "{dataItem.name}"{" "}
                    </h3>
                  </div>
                  <form>
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
                      {errorName ? <div className="alert alert-danger">
                        <strong>Cảnh bảo!</strong> {errorName}
                      </div> : ''}
                      <div className="form-group">
                        <label>Danh mục cha</label>
                        <select  onChange={(e) => setParentId(e.target.value)} name="parent_id" className="form-control">
                        <option value="0" >-- Danh mục cha --</option>
                          {listCategory.map((item, key) => (
                           
                
                            <option 
                            key={key + 1} 
                            value={item._id}
                            selected={item._id === dataItem.parent_id ? true : false}
                            >
                            {item.parent_id == null ? "" : "---" } {item.name}
                         </option>
                            
                          

                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button onClick={handleUpdate}  type="button" className="btn btn-primary">
                        Lưu lại
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
    </div>
  );
}
export default Edit;
