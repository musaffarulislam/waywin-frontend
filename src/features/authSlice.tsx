import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import {RootState} from '../app/store'
import axios from "../config/axios";
import { ILogin, IAuthState } from "../utils/entity/AuthEntity";


const getInitialConfirmObj = (): string | null => {
  const confirmObj = window.localStorage.getItem("confirmObj");
  if (confirmObj) {
    return JSON.parse(confirmObj);
  }
  return null;
};


const getInitialAccessToken = (): string | null=> {
  const accessToken = window.localStorage.getItem("accessToken");
  if (accessToken) {
    return JSON.parse(accessToken);
  }
  return null;
};


const initialValue: IAuthState = {
  isLoading: false,
  auth: null,
  role: null,
  accessToken: getInitialAccessToken(),
  refreshToken: null,
  confirmObj: getInitialConfirmObj(),
};

export const checkUsername = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/checkUsername",
  async (username: any) => {
      const response = await axios.get(`/api/auth/checkUsername/${username}`);
      return response.data;
  }
);

export const checkEmail = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/checkEmail",
  async (email: string) => {
      const response = await axios.get(`/api/auth/checkEmail/${email}`);
      return response.data;
  }
);

export const checkPhoneNumber = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/checkPhoneNumber",
  async (phoneNumber: string) => {
    const response = await axios.get(`/api/auth/checkPhoneNumber/${phoneNumber}`);
    return response.data;
  }
);


export const createUser = createAsyncThunk<any, void, { state: RootState }>(
  "auth/createUser",
  async (_, { getState }) => {
      const { auth } = getState().auth; // Accessing the 'auth' value from the state
      const response = await axios.post("/api/auth/signup", auth, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
  }
);

export const getAuthByEmail = createAsyncThunk<{ accessToken: string; refreshToken: string; role: string }, ILogin , { dispatch?: Dispatch<AnyAction> }>(
  "auth/getAuthByEmail",
  async (data: ILogin) => {
      const response = await axios.post("/api/auth/login", data, {headers: { 'Content-Type': 'application/json' } });
      const { accessToken, refreshToken, role } = response.data
      return { accessToken, refreshToken, role };
  }
);


export const getAuthById = createAsyncThunk<any, ILogin, { dispatch?: Dispatch<AnyAction> }>(
  "auth/getAuthByEmail",
  async (data: ILogin) => {
      const response = await axios.post("/api/auth/login", data, {headers: { 'Content-Type': 'application/json' } });
      const { accessToken, refreshToken } = response.data
      return { accessToken, refreshToken };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    addAuth: (state, action) => {
      state.auth = action.payload;
    },
    changeRole: (state, action) => {
      state.role = action.payload;
    },
    otpConfirmObj: (state, action) => {
      state.confirmObj = action.payload;
      window.localStorage.setItem("confirmObj", JSON.stringify(state.confirmObj))
    },
    loading: (state,action) => {
      state.isLoading = action.payload
    },
    logout: (state) => {
      state.auth = null;
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
      window.localStorage.removeItem("accessToken")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUsername.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkUsername.rejected, (state) => {
        state.isLoading = false;
        throw Error("Username already exist");
      })
      .addCase(checkEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkEmail.rejected, (state) => {
        state.isLoading = false;
        throw Error("Email already used");
      })
      .addCase(checkPhoneNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkPhoneNumber.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkPhoneNumber.rejected, (state) => {
        state.isLoading = false;
        throw Error("Phone number already used");
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        throw new Error("Bad request");
      })
      .addCase(getAuthByEmail.pending, (state) => {
        state.isLoading = true;
        state.accessToken = null;
        state.refreshToken = null;
        state.role = null;
        window.localStorage.setItem("accessToken", JSON.stringify(state.accessToken))
      })
      .addCase(getAuthByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
        window.localStorage.setItem("accessToken", JSON.stringify(state.accessToken))
      })
      .addCase(getAuthByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.role = null;
        throw Error("Invalid Credetial");
      });
  },
});

export const { addAuth, changeRole, otpConfirmObj, loading, logout } = authSlice.actions;
export default authSlice.reducer;
