import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AlertsState {
  data?: [];
  isOpen: boolean;
}

const initialState: AlertsState = {
  isOpen: false,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isOpen = true;
    },
    remove: (state) => {
      state.isOpen = false;
    },
  },
});
export const { show, remove } = alertsSlice.actions;

export default alertsSlice.reducer;
