import auth from "../../api/admin/auth/authenticationApi";
import validator from "validator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/admin/auth/authReducer";
import { useDispatch  } from "react-redux";
import { actionLogin } from "../../state/admin/auth/actionLogin";

function Login() {
  
  
  const dispatch = useDispatch();;
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [status, setStatus] = useState("");
 
  const validateEmail = (e) => {
    setStatus("");
    setErrorEmail(null);
    if (validator.isEmail(e.target.value) === false) {
      setErrorEmail("* Email không hợp lệ");
    }
    if (!e.target.value) {
      setErrorEmail("* Email không được để trống");
    }
    setEmail(e.target.value);
  };
  const validatePassword = (e) => {
    setStatus("");
    setErrorPassword(null);
    if (e.target.value.length < 9 || e.target.value.length > 15) {
      setErrorPassword("* Mật khẩu trong khoảng từ 9 đến 15 ký tự");
    }
    if (e.target.value.length === 0) {
      setErrorPassword("* Mật khẩu không được để trống");
    }
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    
    //console.log(dataLogin);
    if (errorEmail === null && errorPassword === null) {
      try {
        const response = await auth.login({ email: email, password: password });
        if (response.status === "error") {
          setStatus(response.message);
          setPassword("");
        } else {
          localStorage.setItem('accessToken',response.token);
          localStorage.setItem('refreshToken',response.refreshToken);
         
  
          dispatch(
            login({
              accessToken: response.token,
              refreshToken: response.refreshToken,
              isLogin: true,
              name : response.name,
              email : response.email,
              id : response.id
            })
          );
           history(`/admin/`);
       
        }
      } catch (error) {
        console.log("fail fetch login", error);
      }
    }
  };
  return (
    <div className="hold-transition login-page">
      
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>Đăng nhập</b>...
          </a>
        </div>

        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Đăng nhập để bắt đầu phiên của bạn</p>

            <form>
              <div className="input-group mb-3">
                <input
                  value={email}
                  onChange={(e) => validateEmail(e)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              {errorEmail ? (
                <div className="alert alert-danger">
                  <strong>Lỗi !</strong> {errorEmail}.
                </div>
              ) : (
                ""
              )}
              <div className="input-group mb-3">
                <input
                  onChange={(e) => validatePassword(e)}
                  value={password}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              {errorPassword ? (
                <div className="alert alert-danger">
                  <strong>Lỗi !</strong> {errorPassword}.
                </div>
              ) : (
                ""
              )}

              {status ? (
                <div className="alert alert-danger">
                  <strong>Lỗi !</strong> {status}.
                </div>
              ) : (
                ""
              )}
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>

                <div className="col-4">
                  <button
                    onClick={handleLogin}
                    type="button"
                    className="btn btn-primary btn-block"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-1">
              <a href="forgot-password.html">Quyên mật khẩu</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
