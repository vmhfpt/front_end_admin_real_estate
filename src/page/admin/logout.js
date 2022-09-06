import  authenticationApi from "../../api/admin/auth/authenticationApi";
import {Navigate} from "react-router-dom";
export const LogOut = async () =>{
     try {
        console.log('run')
      //   const response =  await authenticationApi.logout(null, localStorage.getItem('accessToken'));
        // console.log(response)
       //return (  <Navigate to="/admin/login" /> );
     }catch (error) {
     console.log(error);
     } 
}
