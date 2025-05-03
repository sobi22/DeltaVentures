import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertsData } from '../../types/alerts';

export interface AlertsState {
  data?: AlertsData;
  isOpen: boolean;
}

const initialState: AlertsState = {
  isOpen: false,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<AlertsData>) => {
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
