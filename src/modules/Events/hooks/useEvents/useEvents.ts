import {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useDispatchRequest} from '@redux-requests/react';

import {
  getEvents,
  setEventsData,
  setSelectedEvents,
  EventDataType,
  SelectedEventType,
} from '../../reducer';
import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';
import {
  saveDataToLocalStorage,
  removeDataFromLocalStorage,
} from '../../../../utils/storageUtils';
import {RootState} from '../../../../redux/store';

export type UseEventsType = {
  loadEvents: () => Promise<EventDataType[] | null | void>;
  selectEvents: (ids: number[]) => Promise<void>;
  clearEvents: () => Promise<void>;
  eventsData: EventDataType[] | null;
  selectedEvents: SelectedEventType[] | null;
  isLoading: boolean;
};

export type EventResponseType = {
  id: number;
  name: string;
  parent: string;
  type: string;
  brand: string;
  universal_id: number;
};

export const isValidEventResponseType = (
  data: unknown
): data is EventResponseType => {
  if ((data as EventResponseType).id) return true;
  return false;
};

export const isValidEventType = (data: unknown): data is EventDataType => {
  if ((data as EventDataType).id) return true;
  return false;
};

export const isValidEventsType = (data: unknown[]): data is EventDataType[] => {
  if (!data.length || isValidEventType(data[0])) return true;
  return false;
};

export const useEvents = (): UseEventsType => {
  const dispatch = useDispatchRequest();
  const {handleError} = useErrorHandler();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const eventsData = useSelector<RootState, EventDataType[] | null>(
    (state) => state.eventsReducer.eventsData
  );
  const selectedEvents = useSelector<RootState, SelectedEventType[] | null>(
    (state) => state.eventsReducer.selectedEvents
  );

  const loadEvents = useCallback(async (): Promise<
    EventDataType[] | null | void
  > => {
    try {
      setIsLoading(true);
      const result = await dispatch(getEvents());
      if (result.error) throw result.error;

      if (result.data?.code === 0) {
        const response = result.data?.data;

        const eventsDataLocal = response?.map((el: unknown) => {
          if (isValidEventResponseType(el))
            return {
              id: el.id,
              name: el.name,
              parent: el.parent,
              type: el.type,
              brand: el.brand,
              universalId: el.universal_id,
            };
        });

        if (isValidEventsType(eventsDataLocal)) {
          const eventsResult = await dispatch(setEventsData(eventsDataLocal));
          if (eventsResult.error) throw eventsResult.error;
          setIsLoading(false);

          return eventsDataLocal;
        }
      }
      throw new Error();
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  }, [dispatch, handleError]);

  const selectEvents = useCallback(
    async (ids: number[]): Promise<void> => {
      try {
        setIsLoading(true);
        const parsedEvents =
          eventsData
            ?.filter(({id}) => ids.includes(id))
            .map(({id, name}) => ({id, name})) ?? null;
        await saveDataToLocalStorage(
          'selectedEvents',
          JSON.stringify(parsedEvents)
        );
        const eventsResult = await dispatch(setSelectedEvents(parsedEvents));
        if (eventsResult.error) throw eventsResult.error;
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        handleError(err);
      }
    },
    [dispatch, handleError, eventsData]
  );

  const clearEvents = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await removeDataFromLocalStorage('selectedEvents');
      const eventsResult = await dispatch(setSelectedEvents(null));
      if (eventsResult.error) throw eventsResult.error;
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  }, [dispatch, handleError]);

  return {
    loadEvents,
    selectEvents,
    clearEvents,
    eventsData,
    selectedEvents,
    isLoading,
  };
};
