import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import  ValueService from "../../../service/admin/value.service";

const initialState = {
    values : [],
};
export const valueSlice = createSlice({
    name : 'valueReducer',
    initialState,
    reducers : {
        setValue : (state, action) => {
            state.values = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(create.fulfilled, (state, action) => {
             state.values.push(action.payload.data);
          })
          .addCase(destroy.fulfilled, (state, action) => {
    
            let dataItem = state.values;
            state.values = dataItem.filter(
                (item) => item._id !== action.payload.dataDelete._id
              );
         }); 
        
      }, 
});

export const create = createAsyncThunk('value/add', async (data) => {
    const response = await  ValueService.create(data);
    return response;
});
export const destroy = createAsyncThunk('value/delete', async (id) => {
    const response = await ValueService.destroy(id);
    return response;
});

export const {  setValue } = valueSlice.actions;
  
export default valueSlice.reducer;
