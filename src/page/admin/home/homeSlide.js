import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryApi from '../../../api/admin/category/categoryApi';
const initialState = {
   action : "empty data"
}

export const counterSlice = createSlice({
    name: 'homeSlide',
    initialState,
    reducers: {
     setTrue : (state) => {
      console.log('run setTrue')
        state.action = true;
      },
      setFalse: (state) => {
        state.action = false;
      },
      setCustomValue: (state, action) => {
        state.action =  action.payload
      },
      setValueThunk: (state, action) => {
        state.action =  action.payload
      },
      
    },
    extraReducers: (builder) => {
        builder
          .addCase(axiosThunk.fulfilled, (state, action) => {
            //console.log(action)
              state.action = action.payload;
          });
         
      },
  })

  export const axiosThunk = createAsyncThunk('category/list', async (data) => {
       return  await CategoryApi.getList()
        .then((data) => {
          console.log(data)
          return data;
        })
        .catch((error) => {
          console.log('error')
           return {status : '403 forbidden'}
        })
        
  });
  export function changeThunk(){
      return function setValue(dispatch, getState){
        //console.log(getState());
        dispatch(counterSlice.actions.setValueThunk('set value by redux thunk'))
      }
  };
  // Action creators are generated for each case reducer function
  export const { setTrue, setFalse, setCustomValue} = counterSlice.actions
  
  export default counterSlice.reducer