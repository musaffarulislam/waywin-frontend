import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import { IUserState } from "../../utils/entity/UserEntity";

const initialValue : IUserState = {
    isLoading: false,
    trainers: null,
    trainerInfo: null,
}

export const getAllTrainersInfo = createAsyncThunk<any>(
    "user/getAllTrainersInfo",
    async () => {
        const response = await axios.get("/user/getAll-trainer-info");
        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers:{
        addTrainerInfo: (state, action) => {
            state.trainerInfo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
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
    }
})

export const {addTrainerInfo} = userSlice.actions;
export default userSlice.reducer;