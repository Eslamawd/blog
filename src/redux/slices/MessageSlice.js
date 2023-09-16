import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name: "message",
    initialState: {
        message: [],
        chat: []

    },
    reducers: {
        setMessage(state, action) {
            state.message = action.payload
        },
        deleteMessage(state, action) {
            state.message = state.message.filter(c => c._id !== action.payload)
        },
        setChat(state, action) {
            state.chat = action.payload
        },
        deleteChat(state, action) {
            state.chat = state.chat.filter(c => c._id !== action.payload)
        }
            
    }
});


const messageReducer = messageSlice.reducer;
const messageActions = messageSlice.actions;


export {
    messageReducer,
    messageActions
}