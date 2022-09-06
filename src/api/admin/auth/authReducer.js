import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiToken from './token';
const initialState = {
    name : '',
    email : '',
    id : '',
    accessToken : false,
    refreshToken : false,
    isLogin : false
}

export const authSlice = createSlice({
    name: 'authSlide',
    initialState,
    reducers: {
      login: (state, action) => {
        state.name =  action.payload.name;
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLogin = true;
      },
      logout: (state) => {
        state.name =  '';
        state.email = '';
        state.id = '';
        state.accessToken = false;
        state.refreshToken = false;
        state.isLogin = false;
      },
      
    },
    extraReducers: (builder) => {
        builder
          .addCase(setupToken.fulfilled, (state, action) => {
            state.name =  action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLogin = action.payload.isLogin
          });
         
      },
  })

  export const setupToken = createAsyncThunk('admin/handle-token', async () => {
    
    const accessToken = localStorage.getItem('accessToken');

    return await apiToken.getAccessToken(null, accessToken)
     .then((data) => {
      return {...data,
       accessToken :accessToken,
       refreshToken :  localStorage.getItem('refreshToken'),
       isLogin : true
      };
      
     })
     .catch(async (error) => {
        if(error.response.status === 403){
          const refreshToken = localStorage.getItem('refreshToken');
        return await apiToken.getRefreshToken({refreshToken : refreshToken})
         .then((dataRefreshToken) => {
          
              localStorage.setItem('accessToken',dataRefreshToken.token);
              localStorage.setItem('refreshToken',dataRefreshToken.refreshToken);
             // dispatch login
             return ({...dataRefreshToken,
              accessToken : dataRefreshToken.token,
              refreshToken : dataRefreshToken.refreshToken,
              isLogin : true
            });
         })
         .catch((errorRefreshToken) => {
             return {
                name : '',
                email : '',
                id : '',
                accessToken : false,
                refreshToken : false,
                isLogin : false
             }
         })
        }
     })
  });

  export const { login, logout} = authSlice.actions
  
  export default authSlice.reducer