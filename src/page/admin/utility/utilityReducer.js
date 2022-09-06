import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import  UtilityService from "../../../service/admin/utility.service";

const initialState = {
    utility : [],
    showUtility : {}
};
export const utilitySlice = createSlice({
    name : 'utilityReducer',
    initialState,
    reducers : {
        updateUtility : (state, action) => {
                let dataItem = state.utility.data;
                state.utility.data = dataItem.map((item) => {
                  if (item._id === action.payload.id) {
                      item.name = action.payload.name;
                  }
                  return item;
                });
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getList.fulfilled, (state, action) => {
                state.utility = action.payload;
          })
          .addCase(create.fulfilled, (state, action) => {
             if(action.payload.status === 'success'){
                state.utility.data = action.payload.data;
                state.utility.paginate = {
                    ...state.utility.paginate,
                    currentPage : 1
                };
             }
          })
          .addCase(destroy.fulfilled, (state, action) => {
            let dataItem = state.utility.data;
              state.utility.data = dataItem.filter(
                (item) => item._id !== action.payload.data._id
              );
            //  console.log(action.payload.data._id)
         });
        
      },
});
export const getList = createAsyncThunk('utility/list', async (page) => {
    const response = await UtilityService.index(page);
     return response;
});
export const create = createAsyncThunk('utility/add', async (name) => {
    const response = await UtilityService.create(name);
    return response;
});
export const update = createAsyncThunk('utility/update', async (data) => {
    const response = await UtilityService.update(data);
    return response;
});
export const destroy = createAsyncThunk('utility/delete', async (id) => {
    const response = await UtilityService.destroy(id);
    return response;
});
export const {  updateUtility } = utilitySlice.actions;
  
export default utilitySlice.reducer;
