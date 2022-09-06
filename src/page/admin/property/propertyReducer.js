import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import PropertyService from "../../../service/admin/property.service";

const initialState = {
  properties: [],
  isLoad : false
};
export const propertySlice = createSlice({
  name: "propertyReducer",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.properties = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.fulfilled, (state, action) => {
        state.properties = action.payload;
      })
      .addCase(create.pending, (state, action) => {
        state.isLoad = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
            state.isLoad = false;
          state.properties.push(action.payload.result);
        }
      })
      .addCase(update.pending, (state, action) => {
        state.isLoad = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
            state.isLoad = false;
          let dataProperties = state.properties;
          state.properties = dataProperties.map((item) => {
            if (item._id === action.payload.result._id) {
              item = action.payload.result;
            }
            return item;
          });
        }
      })
     .addCase(destroy.fulfilled, (state, action) => {
           if(action.payload.status === "success"){
            let dataItem = state.properties;
            state.properties = dataItem.filter(
                (item) => item._id !== action.payload.id
            );
           }
         });  
  },
});

export const create = createAsyncThunk("property/add", async (data) => {
  const response = await PropertyService.create(
    data.file,
    data.files,
    data.data
  );
  return response;
});
export const getList = createAsyncThunk("property/list", async (page) => {
  const response = await PropertyService.index(page);
  return response;
});
export const update = createAsyncThunk("property/update", async (data) => {
  const response = await PropertyService.update(
    data.file,
    data.files,
    data.data
  );
  return response;
});
export const destroy = createAsyncThunk('property/delete', async (id) => {
    const response = await PropertyService.destroy(id);
    return response;
});

export const { setValue } = propertySlice.actions;

export default propertySlice.reducer;
