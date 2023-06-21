import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import {RootState} from '../store';
import axios from "../../config/axios";
import { ITrainerState } from "../../utils/entity/TrainerEntity";

const initialValue: ITrainerState ={
    isLoading: false,
    isProfile: false,
    trainerInfo: null,
    profileInfo: null,
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

export const trainerSlice = createSlice({
    name: "trainer",
    initialState: initialValue,
    reducers: {

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
            })
            .addCase(getTrainerInfo.rejected, (state) => {
                state.isLoading = false;
                state.trainerInfo = null;
                state.isProfile = false;
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
    }
})


export const {} = trainerSlice.actions;
export default trainerSlice.reducer;