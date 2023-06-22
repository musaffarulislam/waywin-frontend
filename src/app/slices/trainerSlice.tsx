import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import {RootState} from '../store';
import axios from "../../config/axios";
import { ITrainerState } from "../../utils/entity/TrainerEntity";

const initialValue: ITrainerState ={
    isLoading: false,
    isProfile: false,
    trainerInfo: null,
    profileInfo: null,
    profileImage: null,
}

export const getTrainerInfo =  createAsyncThunk<any, void, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/getTrainerInfo",
    async () =>{
        const response = await axios.get("/trainer/getTrainer-info");
        return response.data;
    }
)

export const getTrainerProfile =  createAsyncThunk<any, void, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/getTrainerProfile",
    async () =>{
        const response = await axios.get("/trainer/getTrainer-profile");
        return response.data;
    }
)


export const uploadProfileImage =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/uploadProfileImage",
    async (image: any) =>{
        const response = await axios.post("/trainer/upload-profile-image", {image: image});
        return response.data;
    }
)

export const trainerSlice = createSlice({
    name: "trainer",
    initialState: initialValue,
    reducers: {
        loading: (state, action) =>{
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrainerInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrainerInfo.fulfilled, (state,action) => {
                state.isLoading = false;
                state.trainerInfo = action.payload.trainerInfo;
                state.isProfile = action.payload.isProfile;
                console.log("action.payload.profileImage : ",action.payload.profileImage)
                state.profileImage = action.payload.profileImage;
            })
            .addCase(getTrainerInfo.rejected, (state) => {
                state.isLoading = false;
                state.trainerInfo = null;
                state.isProfile = false;
                state.profileImage = null;
            })
            .addCase(getTrainerProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrainerProfile.fulfilled, (state,action) => {
                state.isLoading = false;
                state.profileInfo = action.payload.profileInfo;
            })
            .addCase(getTrainerProfile.rejected, (state) => {
                state.isLoading = false;
                state.profileInfo = null;
            })
            .addCase(uploadProfileImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadProfileImage.fulfilled, (state,action) => {
                state.isLoading = false;
                console.log("upload profile :",action.payload.profileImage)
                state.profileImage = action.payload.profileImage;
                console.log(state.profileImage)
            })
            .addCase(uploadProfileImage.rejected, (state) => {
                state.isLoading = false;
                state.profileImage = null;
            })
    }
})


export const {loading} = trainerSlice.actions;
export default trainerSlice.reducer;