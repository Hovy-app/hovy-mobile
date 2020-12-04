import {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {LayoutProvider, DataProvider} from 'recyclerlistview';
import {ScrollEvent} from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';

import {useOrders} from '../useOrders';
import {OrderDataType, OrderFiltersType} from '../../reducer';
import {useScroller} from '../../../Scroller/hooks/useScroller';
import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';
import {handleNoDataError} from '../../../../utils/errorUtils';

export type UseOrdersListProps = {
  filters?: OrderFiltersType;
};

export type UseOrdersListType = {
  listLayoutProvider: LayoutProvider;
  listDataProvider: DataProvider;
  handleListScroll: (
    e: NativeSyntheticEvent<NativeScrollEvent> | ScrollEvent
  ) => void;
  onListEndReached: () => void;
  onListRefresh: () => void;
  listRefreshing: boolean;
  isError: boolean;
  isNoData: boolean;
  isLoading: boolean;
  localOrdersData: Map<number, LocalOrderDataType>;
  setLocalOrdersData: Dispatch<SetStateAction<Map<number, LocalOrderDataType>>>;
};

export type LocalOrderDataType = {
  presentDateSend: string | null;
};

export const useOrdersList = ({
  filters,
}: UseOrdersListProps): UseOrdersListType => {
  const {loadOrders, ordersData, ordersDataRef, isLoading} = useOrders();
  const {handleScroll} = useScroller();
  const {handleError} = useErrorHandler();

  const [isError, setIsError] = useState<boolean>(false);
  const [isNoData, setIsNoData] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  const [listRefreshing, setListRefreshing] = useState<boolean>(false);
  const [listDataProvider] = useState<DataProvider>(
    new DataProvider((r1: OrderDataType, r2: OrderDataType) => {
      return r1.id !== r2.id;
    })
  );
  const [listLayoutProvider] = useState<LayoutProvider>(
    new LayoutProvider(
      () => {
        return 'Orders';
      },
      (dataType, dim) => {
        dim.width = Dimensions.get('window').width;
        dim.height = 190;
      }
    )
  );
  const [localOrdersData, setLocalOrdersData] = useState<
    Map<number, LocalOrderDataType>
  >(new Map());

  useEffect(() => {
    loadOrders(offset, limit, filters)
      .then(() => {
        setListRefreshing(false);
      })
      .catch((err) => {
        handleError(err, setIsError);
        handleNoDataError(err, setIsNoData);
      });
  }, [loadOrders, offset, limit, filters, handleError]);

  useEffect(() => {
    if (ordersDataRef.current)
      setOffset((prev) => {
        if (prev === 0)
          loadOrders(0, limit, filters)
            .then(() => {
              setListRefreshing(false);
            })
            .catch((err) => {
              handleError(err, setIsError);
              handleNoDataError(err, setIsNoData);
            });
        return 0;
      });
  }, [loadOrders, filters, ordersDataRef, handleError]);

  useEffect(() => {
    if (listRefreshing && ordersDataRef.current)
      setOffset((prev) => {
        if (prev === 0)
          loadOrders(0, limit, filters)
            .then(() => {
              setListRefreshing(false);
            })
            .catch((err) => {
              handleError(err, setIsError);
              handleNoDataError(err, setIsNoData);
            });
        return 0;
      });
    else setListRefreshing(false);
  }, [loadOrders, filters, listRefreshing, ordersDataRef, handleError]);

  const onListEndReached = (): void => {
    setOffset((prev) => prev + limit);
  };

  const onListRefresh = (): void => {
    setListRefreshing(true);
  };

  return {
    listLayoutProvider,
    listDataProvider: listDataProvider.cloneWithRows(
      ordersData?.map((el) => ({
        ...el,
        presentDateSend: localOrdersData.has(el.id)
          ? localOrdersData.get(el.id)?.presentDateSend
          : el.presentDateSend,
      })) ?? []
    ),
    handleListScroll: handleScroll,
    onListEndReached,
    onListRefresh,
    listRefreshing,
    isError,
    isNoData,
    isLoading,
    localOrdersData,
    setLocalOrdersData,
  };
};
