import {useState, useCallback} from 'react';
import {useDispatchRequest} from '@redux-requests/react';
import SplashScreen from 'react-native-splash-screen';

// import {getDataFromLocalStorage} from '../../../../utils/storageUtils';
// import {setUserData} from '../../../Auth/reducer';
// import {setSelectedEvents} from '../../../Events/reducer';
import {useLoadingNavigation} from '../useLoadingNavigation';

type UseAppInitializeType = {
  initialize: () => Promise<void>;
  isLoading: boolean;
};

export const useAppInitialize = (): UseAppInitializeType => {
  const dispatch = useDispatchRequest();
  const {navigation} = useLoadingNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialize = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    // const userData = await getDataFromLocalStorage('userData');
    // if (userData) {
    //   const userResult = await dispatch(setUserData(JSON.parse(userData)));
    //   if (userResult.error) throw userResult.error;

    //   const selectedEvents = await getDataFromLocalStorage('selectedEvents');
    //   if (selectedEvents) {
    //     const eventsResult = await dispatch(
    //       setSelectedEvents(JSON.parse(selectedEvents))
    //     );
    //     if (eventsResult.error) throw eventsResult.error;
    //     navigation.replace('MainTabs', {});
    //   } else navigation.replace('ChooseEvents', {});
    // } else navigation.replace('Login', {});
    navigation.replace('Scanner', {});
    SplashScreen.hide();
    setIsLoading(false);
  }, [dispatch, navigation]);

  return {initialize, isLoading};
};
