/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ISnackBar {
  show: boolean
  status: 'SUCCESS' | 'NORMAL' | 'WARNING' | 'ERROR'
  message: string
  position?: 'TOP' | 'BOTTOM'
}
interface IStateUI {
  showLoading: boolean
  snackbar: ISnackBar
  // toast: ToastProps[]
}
const initialState: IStateUI = {
  showLoading: false,
  snackbar: {
    show: false,
    status: 'NORMAL',
    message: 'Something done...',
    position: 'TOP'
  },
  // toast: []
}
export const stateUI = createSlice({
  name: 'stateUI',
  initialState,
  reducers: {
    setShowLoading: (state, action: PayloadAction<boolean>) => {
      state.showLoading = action.payload
    },
    setSnackbar: (state, action: PayloadAction<ISnackBar>) => {
      state.snackbar = {
        ...action.payload,
        show: true
      }
    },
    closeSnackbar: (state) => {
      state.snackbar = {
        ...state.snackbar,
        show: false
      }
    },
    // addToast: (state, action: PayloadAction<any>) => {
    //   state.toast.push(action.payload)
    // },
    // removeToast: (state, action: PayloadAction<number>) => {
    //   const filter = state.toast.filter((item: any) => {
    //     return item.id !== action.payload
    //   })
    //   if (filter) {
    //     state.toast = filter
    //   }
    // }
  }
})
// Action creators are generated for each case reducer function
export const { setShowLoading, setSnackbar, closeSnackbar, } = stateUI.actions

export default stateUI.reducer