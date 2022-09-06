import {setupToken} from "./authReducer";
export const HandleToken = async (store) => {
  console.log('run first')
   const {dispatch} = store;
   return dispatch(setupToken());
  }
