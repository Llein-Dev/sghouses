import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  status: '', // 'success', 'error', 'warning'
  visible: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.visible = true;
    },
    hideNotification: (state) => {
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
