import {Dispatch, SetStateAction} from 'react';
import {
  useNavigation,
  CompositeNavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {LocalOrderDataType} from '../useOrdersList';
import {OrderDataType} from '../../../Orders/reducer';

export type OrderScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    {
      Order: {
        orderData: OrderDataType;
        setLocalOrdersData: Dispatch<
          SetStateAction<Map<number, LocalOrderDataType>>
        >;
      };
    },
    'Order'
  >,
  StackNavigationProp<{}>
>;

export type OrderScreenRouteProp = RouteProp<
  {
    Order: {
      orderData: OrderDataType;
      setLocalOrdersData: Dispatch<
        SetStateAction<Map<number, LocalOrderDataType>>
      >;
    };
  },
  'Order'
>;

export type OrderNavigationType = {
  navigation: OrderScreenNavigationProp;
  route: OrderScreenRouteProp;
};

export const useOrderNavigation = (): OrderNavigationType => ({
  navigation: useNavigation<OrderScreenNavigationProp>(),
  route: useRoute<OrderScreenRouteProp>(),
});
