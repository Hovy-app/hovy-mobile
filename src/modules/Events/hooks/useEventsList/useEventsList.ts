import {useState, useEffect} from 'react';

import {useEvents} from '../useEvents';
import {EventDataType} from '../../reducer';
import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';
import {handleNoDataError} from '../../../../utils/errorUtils';
import {useChooseEventsNavigation} from '../useChooseEventsNavigation';

export type UseEventsListType = {
  toggleSelectEvent: (id: number) => void;
  submitSelectedEvents: () => Promise<void>;
  eventsData: (EventDataType & {isSelected: boolean})[] | null;
  localSelectedEventIds: Set<number>;
  isError: boolean;
  isNoData: boolean;
  isLoading: boolean;
  displayBackButton: boolean;
};

export const useEventsList = (): UseEventsListType => {
  const {loadEvents, selectEvents, eventsData, isLoading} = useEvents();
  const {handleError} = useErrorHandler();
  const {navigation, route} = useChooseEventsNavigation();

  const [isError, setIsError] = useState<boolean>(false);
  const [isNoData, setIsNoData] = useState<boolean>(false);
  const [localSelectedEventIds, setLocalSelectedEventIds] = useState<
    Set<number>
  >(new Set());

  useEffect(() => {
    loadEvents().catch((err) => {
      handleError(err, setIsError);
      handleNoDataError(err, setIsNoData);
    });
  }, [loadEvents, handleError]);

  const toggleSelectEvent = (id: number): void => {
    setLocalSelectedEventIds((prev) => {
      const prevCopy = new Set(prev);
      if (prevCopy.has(id)) prevCopy.delete(id);
      else prevCopy.add(id);
      return prevCopy;
    });
  };

  const submitSelectedEvents = async (): Promise<void> => {
    try {
      await selectEvents(Array.from(localSelectedEventIds));
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      });
    } catch (err) {
      handleError(err);
    }
  };

  return {
    toggleSelectEvent,
    submitSelectedEvents,
    eventsData:
      eventsData?.map((el) => ({
        ...el,
        isSelected: localSelectedEventIds.has(el.id),
      })) ?? null,
    localSelectedEventIds,
    isError,
    isNoData,
    isLoading,
    displayBackButton: !!route.params?.displayBackButton,
  };
};
