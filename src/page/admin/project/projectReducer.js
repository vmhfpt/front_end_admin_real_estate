import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import projectSercive from "../../../service/admin/project.sercive";

const initialState = {
  projects: [],
  isLoad : false
};
export const projectSlice = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.projects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state, action) => {
        state.isLoad = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
            state.projects.push(action.payload.result);
            state.isLoad = false;
        }
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(update.pending, (state, action) => {
        state.isLoad = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        
        if (action.payload.status === "success") {
            state.isLoad = false;
          let dataProjects = state.projects;
          state.projects = dataProjects.map((item) => {
            if (item._id === action.payload.result._id) {
              item = action.payload.result;
            }
            return item;
          });
        }
      })
     .addCase(destroy.fulfilled, (state, action) => {
           if(action.payload.status === "success"){
            let dataItem = state.projects;
            state.projects = dataItem.filter(
                (item) => item._id !== action.payload.id
            );
           }
         });  
  },
});

export const create = createAsyncThunk("project/add", async (data) => {
  const response = await projectSercive.create(
    data.file,
    data.data
  );
  return response;
});
export const getList = createAsyncThunk("project/list", async (page) => {
  const response = await projectSercive.index(page);
  return response;
});

export const update = createAsyncThunk("project/update", async (data) => {
  const response = await projectSercive.update(
    data.file,
    data.data
  );
  return response;
})
export const destroy = createAsyncThunk('project/delete', async (id) => {
    const response = await projectSercive.destroy(id);
    return response;
});

export const { setValue } = projectSlice.actions;

export default projectSlice.reducer;
