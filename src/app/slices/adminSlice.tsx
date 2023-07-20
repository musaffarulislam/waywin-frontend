import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import {axiosPrivate} from "../../config/axios";
import { IAdminState } from "../../utils/entity/AdminEntity";
import { AxiosError } from "axios";


const initialValue: IAdminState = {
    isLoading: false,
    users: null,
    trainers: null,
    tags: null,
    bookings: null,
    chartData: {
        labels: [],    
        datasets: [],   
    },
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

export const getVerifiedTrainersInfo = createAsyncThunk<any>(
    "admin/getVerifiedTrainersInfo",
    async () => {
        const response = await axiosPrivate.get("/getVerify-trainer-info");
        return response.data;
    }
);

export const getUnverifiedTrainersInfo = createAsyncThunk<any>(
    "admin/getUnverifiedTrainersInfo",
    async () => {
        const response = await axiosPrivate.get("/getUnverify-trainer-info");
        return response.data;
    }
);

export const getAllTags = createAsyncThunk<any>(
    "admin/getAllTags",
    async () => {
        const response = await axiosPrivate.get("/getAll-tags");
        return response.data;
    }
);

export const changeAuthStatus = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
    "admin/changeAuthStatus",
    async (authId) => {
        try{
            const response = await axiosPrivate.put("/change-auth-status", {authId});
            return response.data;
        }catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data.error);
            } else {
                throw new Error(error as string);
            }
        }
    }
);

export const trainerVerify = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
    "admin/trainerVerify",
    async (trainerId) => {
        try{
            const response = await axiosPrivate.put("/trainer-verify", {trainerId});
            return response.data;
        }catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data.error);
            } else {
                throw new Error(error as string);
            }
        }
    }
);


export const addTagValue = createAsyncThunk<any, string, { dispatch?: Dispatch<AnyAction> }>(
    "admin/addTagValue",
    async (addTag) => {
        try{
            const response = await axiosPrivate.put("/add-tag", {addTag});
            return response.data;
        }catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data.error);
            } else {
                throw new Error(error as string);
            }
        }
    }
);

export const editTag = createAsyncThunk<any, any, { dispatch?: Dispatch<AnyAction> }>(
    "admin/editTag",
    async ({index, tag}) => {
        try{
            const response = await axiosPrivate.put("/edit-tag", {index, tag});
            return response.data;
        }catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data.error);
            } else {
                throw new Error(error as string);
            }
        }
    }
);

export const deleteTag = createAsyncThunk<any, number, { dispatch?: Dispatch<AnyAction> }>(
    "admin/deleteTag",
    async (index) => {
        try{
            const response = await axiosPrivate.delete(`/delete-tag/${index}`);
            return response.data;
        }catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data.error);
            } else {
                throw new Error(error as string);
            }
        }
    }
);

export const getAllBookings = createAsyncThunk<any>(
    "admin/getAllBookings",
    async () => {
        const response = await axiosPrivate.get("/getAll-bookings");
        return response.data;
    }
);

export const getChartData = createAsyncThunk<any>(
    "admin/getChartData",
    async () => { 
        const response = await axiosPrivate.get("/getChart-data");
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
            })
            .addCase(getVerifiedTrainersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVerifiedTrainersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainers = action.payload.trainers;
            })
            .addCase(getVerifiedTrainersInfo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getUnverifiedTrainersInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUnverifiedTrainersInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainers = action.payload.trainers;
            })
            .addCase(getUnverifiedTrainersInfo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllTags.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tags = action.payload.tags;
            })
            .addCase(getAllTags.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(changeAuthStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeAuthStatus.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeAuthStatus.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message)
            })
            .addCase(trainerVerify.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trainerVerify.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(trainerVerify.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addTagValue.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTagValue.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addTagValue.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message)
            })
            .addCase(editTag.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editTag.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editTag.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message)
            })
            .addCase(deleteTag.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTag.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteTag.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message)
            })
            .addCase(getAllBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload.bookings;
            })
            .addCase(getAllBookings.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getChartData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChartData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chartData = action.payload.chartData;
            })
            .addCase(getChartData.rejected, (state) => {
                state.isLoading = false; 
            })
        }
    })

export const { } = adminSlice.actions;
export default adminSlice.reducer;