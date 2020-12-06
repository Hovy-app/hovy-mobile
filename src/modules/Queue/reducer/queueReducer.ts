import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type QueueDataType = {
  myQueueNumber: number;
  currentQueueNumber: number;
  peopleLeft: number;
};

export type QueueUpdateDataType = {
  currentQueueNumber: number;
  peopleLeft: number;
};

type InitialStateType = {
  queueData: QueueDataType | null;
};

const initialState: InitialStateType = {
  queueData: null,
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    enterQueue: {
      reducer() {
        /* NULL */
      },
      prepare(shopId: number) {
        return {
          payload: {
            request: {
              url: `/enterQueue/${shopId}/0`,
              method: 'GET',
            },
          },
          meta: {
            driver: 'default',
          },
        };
      },
    },
    setQueueData: {
      reducer(state, action: PayloadAction<{queueData: QueueDataType | null}>) {
        const {queueData} = action.payload;

        state.queueData = queueData;
      },
      prepare(queueData: QueueDataType | null) {
        return {
          payload: {
            request: null,
            queueData,
          },
        };
      },
    },
    getQueueStatus: {
      reducer() {
        /* NULL */
      },
      prepare(shopId: number, myQueueNumber: number) {
        return {
          payload: {
            request: {
              url: `/queueStatus/${shopId}/0/${myQueueNumber}`,
              method: 'GET',
            },
          },
          meta: {
            driver: 'default',
          },
        };
      },
    },
    updateQueueData: {
      reducer(
        state,
        action: PayloadAction<{queueData: QueueUpdateDataType | null}>
      ) {
        const {queueData} = action.payload;

        state.queueData = state.queueData
          ? {
              myQueueNumber: state.queueData.myQueueNumber,
              currentQueueNumber:
                queueData?.currentQueueNumber ??
                state.queueData.currentQueueNumber,
              peopleLeft: queueData?.peopleLeft ?? state.queueData.peopleLeft,
            }
          : null;
      },
      prepare(queueData: QueueUpdateDataType | null) {
        return {
          payload: {
            request: null,
            queueData,
          },
        };
      },
    },
  },
});

export const {
  enterQueue,
  setQueueData,
  getQueueStatus,
  updateQueueData,
} = queueSlice.actions;

export default queueSlice.reducer;
