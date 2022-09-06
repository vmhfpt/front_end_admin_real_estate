import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import  TypeService from "../../../service/admin/type.service";

const initialState = {
    types : [],
};
export const typeSlice = createSlice({
    name : 'typeReducer',
    initialState,
    reducers : {
        updateType : (state, action) => {
            let dataItem = state.types;
            state.types = dataItem.map((item) => {
              if (item._id === action.payload.id) {
                  item.name = action.payload.name;
              }
              return item;
            });
        },
    
    },
    extraReducers: (builder) => {
        builder
          .addCase(getLists.fulfilled, (state, action) => {
                state.types = action.payload;
          })
          .addCase(create.fulfilled, (state, action) => {
            state.types.push(action.payload);
          })
          .addCase(destroy.fulfilled, (state, action) => {
            let dataItem = state.types;
            state.types = dataItem.filter(
                (item) => item._id !== action.payload.data._id
              );
         });
        
      },
});
export const getLists = createAsyncThunk('type/list', async () => {
    const response = await TypeService.index();
     return response;
});
export const create = createAsyncThunk('type/add', async (name) => {
    const response = await TypeService.create(name);
    return response;
});
export const update = createAsyncThunk('type/update', async (data) => {
    const response = await TypeService.update(data);
    return response;
});
export const destroy = createAsyncThunk('type/delete', async (id) => {
    const response = await TypeService.destroy(id);
    return response;
});
export const {  updateType } = typeSlice.actions;
  
export default typeSlice.reducer;
