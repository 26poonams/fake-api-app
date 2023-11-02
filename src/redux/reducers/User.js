import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import axios from '../utils/axios';
import * as URL from '../config/url';

const cookies = new Cookies();
const dummyToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTY5ODY5MzkwMH0.mvj_cFyg5eLI2D0QDjbujRSQ2w01rQQMtZaHK6Fm9ak";

export const userLoginThunk = createAsyncThunk('USER/LOGIN', async (data, thunkAPI) => {
  const response = await axios.post(URL.LOGIN, data, thunkAPI);
  return response.data;
});
export const userRegisterThunk = createAsyncThunk('USER/REGISTER', async (data, thunkAPI) => {
  const response = await axios.post(URL.REGISTER, data, thunkAPI);
  return response.data;
});
export const userLogoutThunk = createAsyncThunk('USER/LOGOUT', async (thunkAPI) => {
  return true;
});

const initialState = {
  isLoading: false,
  authToken: cookies.get('x-access-token'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [userLoginThunk.pending]: (state) => {
      state.isLoading = true;
      state.authToken = null;
    },
    [userLoginThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.authToken = action.payload.token;
      cookies.set('x-access-token', action.payload.token);
    },
    [userLoginThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.authToken = null;
      toast.error(action?.payload?.message);
    },
    [userRegisterThunk.pending]: (state) => {
      state.isLoading = true;
      state.authToken = null;
    },
    [userRegisterThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.authToken = dummyToken;
      cookies.set('x-access-token', dummyToken);
    },
    [userRegisterThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.authToken = null;
      toast.error(action?.payload?.message);
    },
    [userLogoutThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogoutThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.authToken = null;
      cookies.set('x-access-token', null);
    },
    [userLogoutThunk.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action?.payload?.message);
    },
  },
});

export default userSlice.reducer;