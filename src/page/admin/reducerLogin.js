/*const initState = {
    post : true
}
const changeReducer = (state = initState, action) => {
    switch (action.type) {
        case "change" : {
         
             return ({
                       post : action.payLoad
             });
         }
        default : {
            return (state);
        }
    }
  
}
export default changeReducer;*/
const initState = {
    name : '',
    email : '',
    id : '',
    accessToken : false,
    refreshToken : false,
    isLogin : false
}
const reducerLogin = (state = initState, action) => {
   // console.log(action)// set a name function  the same name when you want import use
    switch (action.type){
      
        case 'login' : {
            
            return ({
                   accessToken : action.payLoad.accessToken,
                    refreshToken : action.payLoad.refreshToken,
                    isLogin : true,
                    name : action.payLoad.name,
                    email : action.payLoad.email,
                    id : action.payLoad.id,         
            });
        }
        case 'logout' : {
            return ( {
                    accessToken : false,
                    refreshToken : false,
                    isLogin : false,
                    name : '',
                    email : '',
                    id : '',
                });
        }
        default : {
            return (state);
        }
    }
}
export default reducerLogin;