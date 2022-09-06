import { CKEditor } from "ckeditor4-react";
import Dropzone from "react-dropzone";
import {useState, useEffect} from "react";
import AddressService from "../../../service/admin/address.service";
import {create} from "./projectReducer";
import { useDispatch, useSelector } from "react-redux";
import {memo} from 'react';
import {getLoad} from "./selectProject";
function AddProject({setTab}) {
    const [success, setSuccess] = useState(false);
    const isLoad = useSelector(getLoad);
    const dispatch = useDispatch();
    const [file, setFile] = useState(false);
  const [fileName, setNameFile] = useState({
    file: "Hoặc thả vào đây"
  });
  const [address, setAddress] = useState("");
  const [listDistrict, setListDistrict] = useState(false);
  const [listCity, setListCity] = useState([]);
  const [listWard, setListWard] = useState(false);
  const [codeCity, setCodeCity] = useState(false);
  const [codeDistrict, setCodeDistrict] = useState(false);
  const [active, setActive] = useState(1);

  
   const [groundFirst , setGroundFirst] = useState({
      name : '',
      title : '',
      block_number : '',
      apartment_number : '',
      floor_number : '',
      price_rent : '',
      price_sale_title : '',
   });

   const [groundSecond, setGroundSecond] = useState({
    position : '',
    name_commerce : '',
    investor : '',
    contractor_sum : '',
    distribution_unit : '',
    design : '',
    scale : '',
    area_sum : '',
    apartment_type : '',
    area_type : '',
    utility : '',
    start_up : '',
    law : '',
    price_sale : '',
   });
   const [groundThird, setGroundThird] = useState({
    description : '',
    investor_content : '',
    position_content : '',
    utility_content : '',
    ground_floor : '',
    price : '',
    pay_method : '',
    progress : '',
    example_house : '',
    faq : '',
   })
 
  useEffect(() => {
    
    const getCity = async () => {
      const dataCity = await AddressService.getCity();
      setListCity(dataCity);
    };
    
    getCity();
  }, []);
  useEffect(() => {
    const getDistrict = async (code) => {
      const dataDistrict = await AddressService.getDistrict(code);
      setListDistrict(dataDistrict);
    };
    if (codeCity) getDistrict(codeCity);
  }, [codeCity]);

  useEffect(() => {
    const getWard = async (code) => {
      const dataWard = await AddressService.getWard(code);
      setListWard(dataWard);
    };
    if (codeDistrict) getWard(codeDistrict);
  }, [codeDistrict]);
  const handleFile = (file) => {
    file.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFile(file[0]);
    setNameFile({ ...fileName, file: file[0].name });
  };
 const handleSubmit = () => {
    //console.log(groundFirst, groundSecond, groundThird);
    
    var  objectPayLoad = {...groundFirst, ...groundSecond, ...groundThird,  ...{address : address}, active};
    var payLoad = {file, data :  objectPayLoad};
   // console.log(payLoad);
    dispatch(create(payLoad));
    setSuccess('Thêm thành công dự án' + groundFirst.name);
     setGroundFirst({
        name : '',
        title : '',
        block_number : '',
        apartment_number : '',
        floor_number : '',
        price_rent : '',
        price_sale_title : '',
     });
  setGroundSecond({
      position : '',
      name_commerce : '',
      investor : '',
      contractor_sum : '',
      distribution_unit : '',
      design : '',
      scale : '',
      area_sum : '',
      apartment_type : '',
      area_type : '',
      utility : '',
      start_up : '',
      law : '',
      price_sale : '',
     });
     setGroundThird({
      description : '',
      investor_content : '',
      position_content : '',
      utility_content : '',
      ground_floor : '',
      price : '',
      pay_method : '',
      progress : '',
      example_house : '',
      faq : '',
     });
  
 }

  return (
    <div className="container custom_top">
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Thêm dự án mới</h3>
          <div className="card-tools">
         
         <button  onClick={() => setTab(false)} type="button" className="btn btn-tool" data-card-widget="remove">
           <i className="fas fa-times"></i>
         </button>
       </div>
        </div>

        <div className="card-body">
          <form>
            <div className="card">
            {success && <div className="alert alert-success">
                <strong>Thành công!</strong>  {success}.
              </div>}
              <div className="card-header border-transparent">
                <h3 className="card-title">Phần mô tả dự án</h3>

                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>

              <div className="card-body p-0" style={{ display: "block" }}>
                <div className="card-body">
                  <div className="form-group">
                    <label className="col-form-label">Tên</label>
                    <input
                      onChange={(e) => setGroundFirst((prev) => {
                          return {...prev, name : e.target.value}
                      })}
                      value={groundFirst.name}
                      type="text"
                      className="form-control "
                      placeholder="Nhập tên ..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Tiêu đề </label>
                    <input
                      onChange={(e) => setGroundFirst((prev) => {
                          return {...prev, title : e.target.value}
                      })}
                      value={groundFirst.title}
                      type="text"
                      className="form-control "
                      placeholder="Nhập tiêu đề ..."
                    />
                  </div>

                  <div className="form-group">
                <label>Tỉnh</label>

                <select
                  onChange={(e) => {
                    setAddress("");
                    setListWard(false);
                    setCodeCity(() => {
                      if (e.target.value !== "0") {
                        return e.target.value;
                      } else {
                        setListDistrict(false);
                      }
                    });
                  }}
                  className="form-control"
                >
                  <option value="0">--- Lựa chọn ---</option>
                  {listCity.map((item, key) => (
                    <option value={item.code} key={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {listDistrict && (
                <div className="form-group">
                  <label>Quận, Huyện</label>
                  <select
                    onChange={(e) => {
                      setAddress("");
                      setListWard(false);
                      setCodeDistrict(() => {
                        if (e.target.value !== "0") {
                          return e.target.value;
                        } else {
                          setListWard(false);
                        }
                      });
                    }}
                    value={codeDistrict}
                    className="form-control"
                  >
                    <option value="0">--- Lựa chọn ---</option>
                    {listDistrict.map((item, key) => (
                      <option value={item.code} key={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {listWard && (
                <div className="form-group">
                  <label>Xã, Phường, Thị trấn</label>
                  <select
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="form-control"
                  >
                    <option value="">--- Lựa chọn ---</option>
                    {listWard.map((item, key) => (
                      <option value={item.path_with_type} key={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}



                  <div className="form-group">
                    <label className="col-form-label">Số block</label>
                    <input
                      onChange={(e) => setGroundFirst((prev) => {
                          return {...prev, block_number : e.target.value}
                      })}
                      value={groundFirst.block_number}
                      type="text"
                      className="form-control "
                      placeholder="Nhập số block ..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Số căn</label>
                    <input
                      onChange={(e) => setGroundFirst((prev) => {
                          return {...prev, apartment_number : e.target.value}
                      })}
                      value={groundFirst.apartment_number}
                      type="text"
                      className="form-control "
                      placeholder="Nhập số căn ..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Số tầng</label>
                    <input
                      onChange={(e) => setGroundFirst((prev) => {
                        return {...prev, floor_number : e.target.value}
                      })}
                      value={groundFirst.floor_number}
                      type="text"
                      className="form-control "
                      placeholder="Nhập số tầng ..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Giá thuê</label>
                    <input
                      onChange={(e) => setGroundFirst((prev) => {
                        return {...prev, price_rent : e.target.value}
                      })}
                      value={groundFirst.price_rent}
                      type="text"
                      className="form-control "
                      placeholder="Nhập giá thuê ..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Giá bán</label>
                    <input
                      onChange={(e) => setGroundFirst((prev) => {
                        return {...prev, price_sale_title : e.target.value}
                      })}
                      value={groundFirst.price_sale_title}
                      type="text"
                      className="form-control "
                      placeholder="Nhập giá bán ..."
                    />
                  </div>
                  <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div className="form-group">
                    <label>Chọn 1 ảnh đại diện</label>
                    <div {...getRootProps()} className="input-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          {...getInputProps()}
                        />
                        <label className="custom-file-label">
                          {fileName.file}
                        </label>
                      </div>
                      <div className="input-group-append">
                        <span className="input-group-text">Chọn từ tệp</span>
                      </div>
                    </div>
                    {file.preview && (
                      <div className="col-12">
                        <div className="card card-primary">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-2">
                                <img
                                  src={file.preview}
                                  className="img-fluid mb-2"
                                  alt="white sample"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>

              <div className="form-group">
                <label>Trạng thái bài đăng</label>
                <div className="form-check">
                  <input
                    onChange={() => setActive(1)}
                    checked={1 === active}
                    className="form-check-input"
                    type="radio"
                    name="radio1"
                  />
                  <label className="form-check-label">Đăng bán</label>
                </div>
                <div className="form-check">
                  <input
                    onChange={() => setActive(2)}
                    checked={2 === active}
                    className="form-check-input"
                    type="radio"
                    name="radio1"
                  />
                  <label className="form-check-label">Phác thảo</label>
                </div>
               
             
              </div>

                </div>
              </div>
             
            </div>

            <div className="card">
              <div className="card-header border-transparent">
                <h3 className="card-title">Thông tin nhanh dự án</h3>

                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>

              <div className="card-body p-0" style={{ display: "block" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Tên thương mại</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, name_commerce : e.target.value}
                          }) }
                          value={groundSecond.name_commerce}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập tên thương mại ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Vị trí</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, position : e.target.value}
                          }) }
                          value={groundSecond.position}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập vị trí ..."
                          disabled=""
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Chủ đầu tư</label>
                        <textarea
                          onChange={(e) => setGroundSecond ((prev) => {
                            return {...prev, investor : e.target.value}
                          }) }
                          value={groundSecond.investor}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập chủ đầu tư ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Tổng thầu xây dựng</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, contractor_sum : e.target.value}
                          }) }
                          value={groundSecond.contractor_sum}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập tổng thầu xây dựng ..."
                       
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Đơn vị phân phối</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, distribution_unit : e.target.value}
                          }) }
                          value={groundSecond.distribution_unit}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập đơn vị phân phối ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Thiết kế</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, design: e.target.value}
                          }) }
                          value={groundSecond.design}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập thiết kế ..."
                          
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Tổng diện tích</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, area_sum : e.target.value}
                          }) }
                          value={groundSecond.area_sum}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập tổng diện tích ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Quy mô</label>
                        <textarea
                         onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, scale : e.target.value}
                          }) }
                          value={groundSecond.scale}
                          className="form-control"
                          rows="3"
                          placeholder="Nhâp quy mô ..."
                          
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Loại căn hộ</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, apartment_type : e.target.value}
                          }) }
                          value={groundSecond.apartment_type}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập loại căn hộ ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Diện tích các loại</label>
                        <textarea
                        onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, area_type : e.target.value}
                          }) }
                          value={groundSecond.area_type}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập diện tích các loại ..."
                          
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Tiện ích</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, utility : e.target.value}
                          }) }
                          value={groundSecond.utility}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập tiện ích ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Khởi công - bàn giao</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, start_up : e.target.value}
                          }) }
                          value={groundSecond.start_up}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập khởi công bàn giao ..."
                          
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Pháp lý</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, law : e.target.value}
                          }) }
                          value={groundSecond.law}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập pháp lý ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Giá bán</label>
                        <textarea
                          onChange={(e) => setGroundSecond((prev) => {
                            return {...prev, price_sale : e.target.value}
                          }) }
                          value={groundSecond.price_sale}
                          className="form-control"
                          rows="3"
                          placeholder="Nhập giá bán ..."
                          
                        ></textarea>
                      </div>
                    </div>
                  </div>
           
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header border-transparent">
                <h3 className="card-title">Phần nội dung chi tiết</h3>

                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>

              <div className="card-body p-0" style={{ display: "block" }}>
                <div className="card-body">
                  <div className="form-group">
                    <label className="col-form-label">Giới thiệu chung</label>
                    <CKEditor 
                     onChange={(evt) => setGroundThird((prev) => {
                         return {...prev, description : evt.editor.getData()}
                     })}
                     initData={groundThird.description}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Chủ đầu tư </label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, investor_content : evt.editor.getData()}
                    })}
                    initData={groundThird.investor_content}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Vị trí </label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev,  position_content : evt.editor.getData()}
                    })}
                    initData={groundThird.position_content}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Tiện ích</label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, utility_content : evt.editor.getData()}
                    })}
                    initData={groundThird.utility_content}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Mặt bằng</label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, ground_floor : evt.editor.getData()}
                    })}
                    initData={groundThird.ground_floor}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Giá bán</label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, price : evt.editor.getData()}
                    })}
                    initData={groundThird.price}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">
                      Phương thức thanh toán
                    </label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, pay_method : evt.editor.getData()}
                    })}
                    initData={groundThird.pay_method}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Tiến độ xây dựng</label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, progress : evt.editor.getData()}
                    })}
                    initData={groundThird.progress}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Nhà mẫu</label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, example_house : evt.editor.getData()}
                    })}
                    initData={groundThird.example_house}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">
                      FAQ & địa chỉ liên hệ
                    </label>
                    <CKEditor 
                    onChange={(evt) => setGroundThird((prev) => {
                        return {...prev, faq : evt.editor.getData()}
                    })}
                    initData={groundThird.faq}
                    />
                  </div>
                </div>
              </div>
            </div>
            {!isLoad && success ? <div className="alert alert-success custom_top">
                <strong>Thành công!</strong>  {success}.
              </div> : ''}
              
            <div className="card-footer">
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Thêm Mới
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoad &&  <div className="overlay-wrapper">
            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin"></i><div className="text-bold pt-2">Đang thêm...</div></div>
      </div>}
    </div>
  );
}
export default memo(AddProject);
