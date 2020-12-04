import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateApiAction} from '../../../utils/requestUtils';

export type EventDataType = {
  id: number;
  name: string;
  parent: string;
  type: string;
  brand: string;
  universalId: number;
};

export type SelectedEventType = {
  id: number;
  name: string;
};

type InitialStateType = {
  eventsData: EventDataType[] | null;
  selectedEvents: SelectedEventType[] | null;
};

const initialState: InitialStateType = {
  eventsData: null,
  selectedEvents: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    getEvents: {
      reducer() {
        /** REDUCER */
      },
      prepare() {
        const data = generateApiAction(
          'Myqr',
          'Manager',
          'listEditionSeminars'
        );

        return {
          payload: {
            request: {
              url: '/api.php',
              method: 'POST',
              data,
            },
          },
          meta: {
            driver: 'default',
          },
        };
      },
    },
    setEventsData: {
      reducer(
        state,
        action: PayloadAction<{eventsData: EventDataType[] | null}>
      ) {
        const {eventsData} = action.payload;

        state.eventsData = eventsData;
      },
      prepare(eventsData: EventDataType[] | null) {
        return {
          payload: {
            request: null,
            eventsData,
          },
        };
      },
    },
    setSelectedEvents: {
      reducer(
        state,
        action: PayloadAction<{events: SelectedEventType[] | null}>
      ) {
        const {events} = action.payload;

        state.selectedEvents = events;
      },
      prepare(events: SelectedEventType[] | null) {
        return {
          payload: {
            request: null,
            events,
          },
        };
      },
    },
  },
});

export const {
  getEvents,
  setEventsData,
  setSelectedEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
