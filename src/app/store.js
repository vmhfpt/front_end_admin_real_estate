
/*import reducerLogin from '../page/admin/reducerLogin';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import homeSlide  from "../page/admin/home/homeSlide";

import thunk from 'redux-thunk';


const reducers = combineReducers({
  getAuthentication: reducerLogin,
    demo : homeSlide
});

const persistConfig = {
  key: 'root',
  storage,
 // whitelist: ['admin'],
};//homeSlide
const homeConfig = {
  key: 'homeSlide',
  storage,
 // whitelist: ['admin'],
};
const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});*/

import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import counterSlice  from "../page/admin/home/homeSlide";
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import authSlice from '../api/admin/auth/authReducer';
import categorySlice from '../page/admin/category/categoryReducer';
import utilitySlice from "../page/admin/utility/utilityReducer";
import typeSlice from "../page/admin/type/typeReducer";
import valueSlice from "../page/admin/value/valueReducer";
import propertySlice from "../page/admin/property/propertyReducer"
import projectReducer from '../page/admin/project/projectReducer';
const homeConfig = {
  key: 'homeSlide',
  storage,
};
const reducers = combineReducers({
  counter:counterSlice,
  authLogin : authSlice,
  category : categorySlice,
  utility : utilitySlice,
  type : typeSlice,
  value : valueSlice,
  property : propertySlice,
  project : projectReducer,
});
const persistedReducer = persistReducer(homeConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})