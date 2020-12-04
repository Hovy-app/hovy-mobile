import {useEffect} from 'react';
import moment from 'moment';

import {useOrderNavigation} from '../useOrderNavigation';
import {useOrder, UseOrderType} from '../useOrder';
import {OrderDataType} from '../../../Orders/reducer';

export type UseOrderPageType = UseOrderType & {
  handleSwitch: () => Promise<void>;
  orderData: OrderDataType;
};

export const useOrderPage = (): UseOrderPageType => {
  const {route} = useOrderNavigation();
  const {
    setPresentsStatus,
    setIsPresentsStatusActive,
    isPresentsStatusActive,
    ...restUseOrderFuncs
  } = useOrder();

  useEffect(() => {
    setIsPresentsStatusActive(!!route.params?.orderData.presentDateSend);
  }, [setIsPresentsStatusActive, route.params?.orderData]);

  const handleSwitch = async (): Promise<void> => {
    const id = route?.params?.orderData.id;
    if (!id) return;
    await setPresentsStatus(id, !isPresentsStatusActive);
    route?.params?.setLocalOrdersData((prev) => {
      const prevCopy = new Map(prev);
      prevCopy.set(id, {
        presentDateSend: !isPresentsStatusActive
          ? moment().format('YYYY-MM-DD')
          : null,
      });
      return prevCopy;
    });
  };

  return {
    handleSwitch,
    setPresentsStatus,
    setIsPresentsStatusActive,
    isPresentsStatusActive,
    orderData: route.params?.orderData,
    ...restUseOrderFuncs,
  };
};
