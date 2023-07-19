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
        try{
            const response = await axios.get(`/user/get-trainer-info/${trainerId}`);
            return response.data;
        }catch(err: any){ 
            throw Error(err.response.data.error)
        }
    }
  );

  export const accessChat =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "user/accessChat",
    async (trainerId) =>{
        try{
            const response = await axios.post("/chat", { userId: trainerId });  
            return response.data;
        }catch(err: any){ 
            throw Error(err.response.data.error)
        }
    }
)

  export const getAllMessages =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "user/getAllMessages",
    async (chatId) =>{
        try{
            const response = await axios.get(`/message/${chatId}`);   
            return response.data.messages;
        }catch(err: any){ 
            throw Error(err.response.data.error)
        }
    }
)

export const sendMessage =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "user/sendMessage",
    async ({newMessage,chatId}) =>{
        try{ 
            const response = await axios.post("/message", { content: newMessage ,chatId });  
            return response.data.message;
        }catch(err: any){ 
            throw Error(err.response.data.error)
        }
    }
)

export const getBookingInfo = createAsyncThunk<any>(
    "user/getBookingInfo",
    async () => {
        try{
            const response = await axios.get("/user/get-booking-info");
            return response.data;
        }catch(err: any){ 
            throw Error(err.response.data.error)
        }
    }
);

export const booking =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "user/booking",
    async (amount) =>{
        try{
            const response = await axios.post("/user/booking", { amount });
            if(!response.data.data){
                throw Error("Please check internet connection")
            }
            return response.data.data;
        }catch(err: any){ 
            throw Error(err.response.data.error)
        }
    }
)

export const bookingTrainer =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "user/bookingTrainer",
    async ({formData, trainerId, bookingId, orderId}) =>{
        try{ 
            const bookingData = {
                ...formData,
                service: formData.service[0],
                mode: formData.mode[0],
                date: new Date(formData.date.getTime() - formData.date.getTimezoneOffset() * 60000).toISOString(),
              };
            const response = await axios.post("/user/book-trainer", { bookingData, trainerId, bookingId, orderId});
            return response.data;
        }catch(err: any){ 
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
        },
        // signout: (state) => {
        //     return { ...initialValue };
        // }
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
            .addCase(getTrainerInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrainerInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainerInfo = action.payload.trainer;
            })
            .addCase(accessChat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(accessChat.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(accessChat.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message);
            })
            .addCase(getAllMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMessages.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message);
            })
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message);
            })
            .addCase(getTrainerInfo.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message);
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