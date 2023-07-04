import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import {axiosPrivate} from "../../config/axios";
import { IAdminState } from "../../utils/entity/AuthEntity copy";

const initialValue: IAdminState = {
    isLoading: false,
    users: null,
    trainers: null,
};


export const getAllUsersInfo = createAsyncThunk<any>(
    "admin/getAllUsersInfo",
    async () => {
        const response = await axiosPrivate.get("/getAll-user-info");
        return response.data;
    }
);

export const getActiveUsersInfo = createAsyncThunk<any>(
    "admin/getActiveUsersInfo",
    async () => {
        const response = await axiosPrivate.get("/getActive-user-info");
        return response.data;
    }
);

export const getInactiveUsersInfo = createAsyncThunk<any>(
    "admin/getInactiveUsersInfo",
    async () => {
        const response = await axiosPrivate.get("/getInactive-user-info");
        return response.data;
    }
);


export const changeAuthStatus = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
    "admin/changeAuthStatus",
    async (authId) => {
        try{
            const response = await axiosPrivate.put("/change-auth-status", {authId});
            return response.data;
        }catch(error){
            // throw new Error(error)
        }
    }
);

export const getAllTrainersInfo = createAsyncThunk<any>(
    "admin/getAllTrainersInfo",
    async () => {
        const response = await axiosPrivate.get("/getAll-trainer-info");
        return response.data;
    }
);

export const getActiveTrainersInfo = createAsyncThunk<any>(
    "admin/getActiveTrainersInfo",
    async () => {
        const response = await axiosPrivate.get("/getActive-trainer-info");
        return response.data;
    }
);

export const getInactiveTrainersInfo = createAsyncThunk<any>(
    "admin/getInactiveTrainersInfo",
    async () => {
        const response = await axiosPrivate.get("/getInactive-trainer-info");
        return response.data;
    }
);

export const adminSlice = createSlice({
    name: "admin",
    initialState: initialValue,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getAllUsersInfo.rejected, (state) => {
                state.isLoading = false;
                throw Error("Something went wrong");
            })
            .addCase(getActiveUsersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getActiveUsersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getActiveUsersInfo.rejected, (state) => {
                state.isLoading = false;
                throw Error("Something went wrong");
            })
            .addCase(getInactiveUsersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInactiveUsersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getInactiveUsersInfo.rejected, (state) => {
                state.isLoading = false;
                throw Error("Something went wrong");
            })
            .addCase(changeAuthStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeAuthStatus.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(changeAuthStatus.rejected, (state) => {
                state.isLoading = false;
                throw Error("Status not change");
            })
            .addCase(getAllTrainersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTrainersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainers = action.payload.trainers;
            })
            .addCase(getAllTrainersInfo.rejected, (state) => {
                state.isLoading = false;
                throw Error("Something went wrong");
            })
            .addCase(getActiveTrainersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getActiveTrainersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainers = action.payload.trainers;
            })
            .addCase(getActiveTrainersInfo.rejected, (state) => {
                state.isLoading = false;
                throw Error("Something went wrong");
            })
            .addCase(getInactiveTrainersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInactiveTrainersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainers = action.payload.trainers;
            })
            .addCase(getInactiveTrainersInfo.rejected, (state) => {
                state.isLoading = false;
                throw Error("Something went wrong");
            })
    }
})

export const { } = adminSlice.actions;
export default adminSlice.reducer;