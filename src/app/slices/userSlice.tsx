import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import { IUserState } from "../../utils/entity/UserEntity";

const initialValue : IUserState = {
    isLoading: false,
    trainers: null,
    trainerInfo: null,
    bookings: null,
}

export const getAllTrainersInfo = createAsyncThunk<any>(
    "user/getAllTrainersInfo",
    async () => {
        const response = await axios.get("/user/getAll-trainer-info");
        return response.data;
    }
);

export const getTrainerInfo = createAsyncThunk<any, any, { dispatch?: Dispatch<AnyAction> }>(
    "user/getTrainerInfo",
    async (trainerId) => {
      const response = await axios.get(`/user/get-trainer-info/${trainerId}`);
      return response.data;
    }
  );

export const getBookingInfo = createAsyncThunk<any>(
    "user/getBookingInfo",
    async () => {
        const response = await axios.get("/user/get-booking-info");
        return response.data;
    }
);

export const booking =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/booking",
    async (amount) =>{
        try{
            const response = await axios.post("/user/booking", { amount });
            if(!response.data.data){
                throw Error("Please check internet connection")
            }
            return response.data.data;
        }catch(err: any){
            console.error(err.response.data)
            throw Error(err.response.data.error)
        }
    }
)

export const bookingTrainer =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/bookingTrainer",
    async ({formData, trainerId, bookingId, orderId}) =>{
        try{
            console.log("bookingData : ",formData)
            const bookingData = {
                ...formData,
                service: formData.service[0],
                mode: formData.mode[0],
                date: new Date(formData.date.getTime() - formData.date.getTimezoneOffset() * 60000).toISOString(),
              };
            const response = await axios.post("/user/book-trainer", { bookingData, trainerId, bookingId, orderId});
            return response.data;
        }catch(err: any){
            console.error(err.response.data)
            throw Error(err.response.data.error)
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers:{
        addTrainerInfo: (state, action) => {
            state.trainerInfo = action.payload
        },
        loading: (state, action) =>{
            state.isLoading = action.payload;
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
            .addCase(getBookingInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookingInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookings = action.payload.bookings;
            })
            .addCase(getBookingInfo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(booking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(booking.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(booking.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message);
            })
            .addCase(bookingTrainer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bookingTrainer.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(bookingTrainer.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message);
            })
    }
})

export const {addTrainerInfo, loading} = userSlice.actions;
export default userSlice.reducer;