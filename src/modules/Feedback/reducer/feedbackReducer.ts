import {createSlice} from '@reduxjs/toolkit';

type InitialStateType = {};

const initialState: InitialStateType = {};

export type FeedbackSendType = {
  shopId: number;
  rate?: number;
  reasonType?: 'LONG_QUEUE' | 'LONG_WAIT' | 'WRONG_PLACE' | 'PERSONAL';
  comment?: string;
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    sendFeedback: {
      reducer() {
        /* NULL */
      },
      prepare({shopId, rate, reasonType, comment}: FeedbackSendType) {
        const requestObj: FeedbackSendType = {
          shopId,
        };
        if (rate) requestObj.rate = rate;
        if (reasonType) requestObj.reasonType = reasonType;
        if (comment) requestObj.comment = comment;

        return {
          payload: {
            request: {
              url: `/feedback`,
              method: 'POST',
              data: JSON.stringify(requestObj),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          },
          meta: {
            driver: 'default',
          },
        };
      },
    },
  },
});

export const {sendFeedback} = feedbackSlice.actions;

export default feedbackSlice.reducer;
