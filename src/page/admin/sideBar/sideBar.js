import { Link } from "react-router-dom";
import React from 'react'
import { useSelector } from 'react-redux'
import {getLogin} from '../selectReducer';
const SideBar  = () => {
  const dataLogin = useSelector(getLogin);
    return (<aside className="main-sidebar sidebar-dark-primary elevation-4">
    
    <Link to="index3.html" className="brand-link">
      <img src="https://blogapi.x10.mx/Admin/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"  />
      <span className="brand-text font-weight-light">Trang quản trị admin</span>
    </Link>

   
    <div className="sidebar os-host os-theme-light os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-scrollbar-vertical-hidden os-host-transition"><div className="os-resize-observer-host observed"><div className="os-resize-observer" style={{'left': '0px', 'right': 'auto'}}></div></div><div className="os-size-auto-observer observed" style={{'height': 'calc(100% + 1px)', 'float': 'left'}}><div className="os-resize-observer"></div></div><div className="os-content-glue" style={{'margin': '0px -8px', 'width': '249px', 'height': '822px'}}></div><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible"><div className="os-content" style={{'padding': '0px 8px', 'height': '100%', 'width': '100%'}}>
     
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="https://blogapi.x10.mx/Admin/dist/img/user2-160x160.jpg" alt="AdminLTE Logo" className="img-circle elevation-2"  />
        </div>
        <div className="info">
          <Link to="#" className="d-block">{dataLogin.name}</Link>
        </div>
      </div>

      
      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div><div className="sidebar-search-results"><div className="list-group"><Link to="#" className="list-group-item"><div className="search-title"><strong className="text-light"></strong>N<strong className="text-light"></strong>o<strong className="text-light"></strong> <strong className="text-light"></strong>e<strong className="text-light"></strong>l<strong className="text-light"></strong>e<strong className="text-light"></strong>m<strong className="text-light"></strong>e<strong className="text-light"></strong>n<strong className="text-light"></strong>t<strong className="text-light"></strong> <strong className="text-light"></strong>f<strong className="text-light"></strong>o<strong className="text-light"></strong>u<strong className="text-light"></strong>n<strong className="text-light"></strong>d<strong className="text-light"></strong>!<strong className="text-light"></strong></div><div className="search-path"></div></Link></div></div>
      </div>

      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


          <li className="nav-item">
            <Link to="#" className="nav-link">
              <i className="nav-icon fas fa-edit"></i>
              <p>
                Danh mục
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/admin/category/list" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Danh sách danh mục</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/category/add" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Thêm danh mục</p>
                </Link>
              </li>


            </ul>
          </li>
          <li className="nav-item">
            <Link to="/admin/utility/list" className="nav-link">
              <i className="nav-icon fas fa-edit"></i>
              <p>
                Tiện ích
              </p>
            </Link>
           
          </li>
          <li className="nav-item">
            <Link to="/admin/property/add" className="nav-link">
              <i className="nav-icon fas fa-edit"></i>
              <p>
                Bài viết 
              </p>
            </Link>
            
          </li>
          <li className="nav-item">
            <Link to="/admin/type/list" className="nav-link">
              <i className="nav-icon fas fa-edit"></i>
              <p>
                 Tiện ích mở rộng
              
              </p>
            </Link>
           
          </li>
          <li className="nav-item">
            <Link to="/admin/project/list" className="nav-link">
              <i className="nav-icon fas fa-edit"></i>
              <p>
                 Dự án
              
              </p>
            </Link>
           
          </li>
        </ul>
      </nav>
    </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{'width': '100%', 'transform': 'translate(0px, 0px)'}}></div></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{'height': '100%', 'transform': 'translate(0px, 0px)'}}></div></div></div><div className="os-scrollbar-corner"></div></div>
   
  </aside>);
}
export default SideBar;