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

export const changeUserStatus = createAsyncThunk<any>(
    "admin/changeUserStatus",
    async (userId) => {
        const response = await axiosPrivate.put("/change-user-status", userId);
        return response.data;
    }
);

export const getAllTrainersInfo = createAsyncThunk<any>(
    "admin/getAllTrainersInfo",
    async () => {
        const response = await axiosPrivate.get("/getAll-trainer-info");
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
            .addCase(changeUserStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeUserStatus.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(changeUserStatus.rejected, (state) => {
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
    }
})

export const { } = adminSlice.actions;
export default adminSlice.reducer;