import { USER_NOTIFICATION, SIDEBAR_ACTION, SIDEBAR_NAVIGATION_ITEMS, HOLIDAY_NOTIFICATIONS_ACTION, FILTER_ARGS_ACTION } from "../actions";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
export type GlobalState = {

    unfoldable: Boolean,
    navigations: [],
    notification: {
        open: Boolean,
        body: '',
        type: Boolean,
        variant: String
    },
};
const initialState = {
    unfoldable: false,
    navigations: [],
    notification: {
        open: false,
        body: '',
        type: false,
        variant: 'success'
    },
    // holiday_notification: {
    //     open: false,
    //     body: '',
    //     title: '',
    //     header: '',
    //     handleClose: () => { },
    // },
    // filter_args: {
    //     selected: [],
    //     projectFilter: {}
    // },
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        switchaction: (
            state,
            action: PayloadAction<any>
          ) => {
            switch (action.type) {
                case SIDEBAR_ACTION: {
                    return {
                        ...state,
                        unfoldable: action.payload,
                    };
                }
                case SIDEBAR_NAVIGATION_ITEMS: {
                    return {
                        ...state,
                        navigations: action.payload,
                    };
                }
                case USER_NOTIFICATION: {
                    return {
                        ...state,
                        notification: action.payload,
                    };
                }
                case HOLIDAY_NOTIFICATIONS_ACTION: {
                    return {
                        ...state,
                        holiday_notification: action.payload,
                    };
                }
                case FILTER_ARGS_ACTION: {
                    return {
                        ...state,
                        filter_args: action.payload,
                    };
                }
        
                default: {
                    return {
                        ...state,
                    };
                }
            }

          }

    }
})


  
  // Action creators are generated for each case reducer function
  export const { switchaction } = globalSlice.actions;
  
  export default globalSlice.reducer;
  

