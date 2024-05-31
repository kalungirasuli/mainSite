import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
  selectedDoctor: null,
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
  },
});

export const { setSelectedUser, setSelectedDoctor } = userSlice.actions;

export default userSlice.reducer;
