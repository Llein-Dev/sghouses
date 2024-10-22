import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Ensure this is initialized
  // other state properties...
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Set user on login
    },
    logout(state) {
      state.user = null; // Reset user on logout
    },
    // other reducers...
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
