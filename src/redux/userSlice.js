import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
  selectedDoctor: null,
  bookingDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
  },
});

export const { setSelectedUser, setSelectedDoctor, setBookingDetails } = userSlice.actions;

export default userSlice.reducer;
