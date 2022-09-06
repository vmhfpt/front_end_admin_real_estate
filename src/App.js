import RouteAdmin from "./router/admin/routes";
import RoutePost from "./router/post/routes";
import Login from "./page/admin/login";
import { useDispatch, useSelector } from "react-redux";
import { actionLogin } from "./state/admin/auth/actionLogin";
import { useState} from "react";
import { getLogin } from "./page/admin/selectReducer";
import { LogOut } from "./page/admin/logout";
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import {HandleToken} from './api/admin/auth/setupToken';
import apiToken from './api/admin/auth/token';
function App(){
  const check = useSelector(getLogin);
  //console.log(check)  
  function Demo () {
    return <h1> hahaha</h1>;
  }

const isLogin = check.isLogin;
  
 return ( 
    <Routes>
      <Route path="admin/logout" element={<LogOut />} />
      <Route path="admin/login" element={<Login />} />
      <Route path="/" element={<Demo />} />
      <Route path="admin/*" element={isLogin  ? <RouteAdmin /> : <Navigate to="login" /> } />
  </Routes>
    );
}
export default App;
/*
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./page/admin/login";
import { setTrue, setFalse, setCustomValue} from "./page/admin/home/homeSlide";
import { useDispatch , useSelector} from "react-redux/es/exports";
import {changeThunk} from "./page/admin/home/homeSlide";
import {axiosThunk} from "./page/admin/home/homeSlide";
import {setupToken} from "./api/admin/auth/authReducer";
function App(){
  
  const dispatch = useDispatch();
 // dispatch(setupToken());



  const data = useSelector(select => select.authLogin)
  const dataCount = useSelector(select => select.counter);
const setTrues = () => {
  dispatch(setTrue())
}
const setFalses = () => {
  dispatch(setFalse())
}
const setCustoms = () => {
  dispatch(setCustomValue( 114));
}
const setReduxThunk = () => {
   dispatch(axiosThunk(1234));
}
const testLogin = () => {
   dispatch(setupToken());
}
console.log(data, dataCount)
 /* */
   /*function Template () {
  return (<div>
    <button onClick={setTrues}>Set true</button>
    <button onClick={setFalses}>Set false</button>
    <button onClick={setCustoms}>Set value custom</button>
   <button onClick={setReduxThunk}>Set value redux thunk</button>
    <button onClick={testLogin}> Test Login</button>
   </div>)
 }
 return (
  <Routes>
     
      <Route path="login" element={<Login />} />
      
      <Route path="/*" element={data.isLogin  ? <Template /> : <Navigate to="login" /> } />
  </Routes>
 )
  
}
export default App;*/