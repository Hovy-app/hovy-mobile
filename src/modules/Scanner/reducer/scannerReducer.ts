import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialStateType = {
  qrPlaceId: string | null;
};

const initialState: InitialStateType = {
  qrPlaceId: null,
};

const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {
    setQrPlaceId: {
      reducer(state, action: PayloadAction<{qrPlaceId: string | null}>) {
        const {qrPlaceId} = action.payload;

        state.qrPlaceId = qrPlaceId;
      },
      prepare(qrPlaceId: string) {
        return {
          payload: {
            request: null,
            qrPlaceId,
          },
        };
      },
    },
  },
});

export const {setQrPlaceId} = scannerSlice.actions;

export default scannerSlice.reducer;
