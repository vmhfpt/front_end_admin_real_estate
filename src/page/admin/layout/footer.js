import { Link } from "react-router-dom";
function Footer(){
    return (<footer className="main-footer">
    <strong>Copyright © 2014-2021 <Link to="https://adminlte.io">AdminLTE.io</Link>.</strong>
    All rights reserved.
    <div className="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.2.0
    </div>
  </footer>)
}
export default Footer;