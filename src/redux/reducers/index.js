import { combineReducers } from "redux";
import userReducer from "./User";
import productReducer from "./Product";

export default combineReducers({ userReducer, productReducer });
