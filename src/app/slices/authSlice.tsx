import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import {RootState} from '../store';
import axios from "../../config/axios"; 
import { ILogin, IAuthState } from "../../utils/entity/AuthEntity";


const initialValue: IAuthState = {
  isLoading: false,
  auth: null,
  role: null, 
  confirmObj: null,
};

export const checkUsername = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/checkUsername",
  async (username: any) => {
    try{
      console.log(username)
      const response = await axios.get(`/auth/checkUsername/${username}`); 
      return response.data;
    }catch(err: any){  
      throw Error(err.response.data.error)
    }
  }
);

export const checkEmail = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/checkEmail",
  async (email: string) => {
    try{
      console.log(email)
      const response = await axios.get(`/auth/checkEmail/${email}`); 
      return response.data;
    }catch(err: any){ 
      throw Error(err.response.data.error)
    }
  }
);

export const checkPhoneNumber = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/checkPhoneNumber",
  async (phoneNumber: string) => {
    try{
      console.log(phoneNumber)
      const response = await axios.get(`/auth/checkPhoneNumber/${phoneNumber}`); 
      return response.data;
    }catch(err: any){  
      throw Error(err.response.data.error)
    }
  }
);

export const createUser = createAsyncThunk<any, void, { state: RootState }>(
  "auth/createUser",
  async (_, { getState }) => {
    try{
      const { auth } = getState().auth; // Accessing the 'auth' value from the state
      const response = await axios.post("/auth/signup", auth, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    }catch(err: any){ 
      throw Error(err.response.data.error)
    }
  }
);

export const otpGenerate = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/otpGenerate",
  async (email: string) => {
    try{
      const response = await axios.get(`/auth/otp-generate/${email}`);
      return response.data;
    }catch(err: any){ 
      throw Error(err.response.data.error)
    }
  }
);

export const verifyOtp = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/verifyOtp",
  async (emailAndOtp: string) => {
    try{
      const [email, otp] = emailAndOtp.split('/'); 
      const response = await axios.get(`/auth/otp-verify/${email}/${otp}`);
      return response.data;
    }catch(err: any){ 
      throw Error(err.response.data.error)
    }
  }
);

export const getAuthByEmail = createAsyncThunk<{ accessToken: string; refreshToken: string; role: string }, ILogin , { dispatch?: Dispatch<AnyAction> }>(
  "auth/getAuthByEmail",
  async (data: ILogin) => {
    try{
      const response = await axios.post("/auth/login", data, {headers: { 'Content-Type': 'application/json' } });
      const { accessToken, refreshToken, role } = response.data
      return { accessToken, refreshToken, role };
    }catch(err: any){ 
      throw Error(err.response.data.error)
    }
  }
);

export const getAuthInfo =  createAsyncThunk<any, void, {dispatch?: Dispatch<AnyAction>}>(
  "auth/getAuthInfo",
  async () =>{
      const response = await axios.get("/auth/getAuth-info");
      return response.data;
  }
)

export const generateAccessToken = createAsyncThunk<{ accessToken: string}, string, { dispatch?: Dispatch<AnyAction> }>(
  "auth/generateAccessToken",
  async (refreshToken: string) =>{
    const response = await axios.post("/auth/token", refreshToken);
    const { accessToken } = response.data;
    return accessToken;
  }
)

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
    },
    loading: (state,action) => {
      state.isLoading = action.payload
    },
    logout: (state) => {
      window.localStorage.removeItem("accessToken")
      window.localStorage.removeItem("refreshToken")
      return { ...initialValue };
    },
    logoutAdmin: (state) => {
      window.localStorage.removeItem("accessTokenAdmin")
      window.localStorage.removeItem("refreshTokenAdmin")
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
      .addCase(checkUsername.rejected, (state, action) => {
        state.isLoading = false;
        throw Error(action.error.message);
      })
      .addCase(checkEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.isLoading = false;
        throw Error(action.error.message);
      })
      .addCase(checkPhoneNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkPhoneNumber.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkPhoneNumber.rejected, (state, action) => {
        state.isLoading = false;
        throw Error(action.error.message);
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        throw Error(action.error.message);
      })
      .addCase(otpGenerate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(otpGenerate.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(otpGenerate.rejected, (state, action) => {
        state.isLoading = false;
        throw Error(action.error.message);
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        throw Error(action.error.message);
      })
      .addCase(getAuthByEmail.pending, (state) => {
        state.isLoading = true;
        state.role = null;
      })
      .addCase(getAuthByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload.role === "Admin"){
          window.localStorage.setItem("accessTokenAdmin", JSON.stringify(action.payload.accessToken))
          window.localStorage.setItem("refreshTokenAdmin", JSON.stringify(action.payload.refreshToken))
        }else{
          state.role = action.payload.role;
          window.localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken))
          window.localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken))
        }
      })
      .addCase(getAuthByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.role = null;
        throw Error(action.error.message);
      })
      .addCase(getAuthInfo.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getAuthInfo.fulfilled, (state,action) => {
        state.isLoading = false;
        state.auth = action.payload.authInfo;
    })
    .addCase(getAuthInfo.rejected, (state) => {
        state.isLoading = false;
        state.auth = null;
    })
  },
});

export const { addAuth, changeRole, otpConfirmObj, loading, logout, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
