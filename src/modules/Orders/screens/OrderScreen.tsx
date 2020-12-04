import React from 'react';

import {useOrderPage} from '../hooks/useOrderPage';

import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';
import PageContainer from '../../../components/common/PageContainer';
import OrderPageCard from '../components/OrderPageCard';
import SwitchItem from '../../../components/ui/SwitchItem';

const OrderScreen: React.FC = () => {
  const {
    orderData,
    isPresentsStatusActive,
    isPresentsStatusActiveLocal,
    isPresentsStatusLoading,
    handleSwitch,
  } = useOrderPage();

  return (
    <SafeScrollerContainer
      forceInset={{horizontal: 'always', vertical: 'never'}}
      isFlex>
      <PageContainer>
        <OrderPageCard orderData={orderData} />
        <SwitchItem
          title="Подарки выданы"
          isActive={
            isPresentsStatusLoading
              ? isPresentsStatusActiveLocal
              : isPresentsStatusActive
          }
          isDisabled={isPresentsStatusLoading}
          onSwitch={handleSwitch}
        />
      </PageContainer>
    </SafeScrollerContainer>
  );
};

export default OrderScreen;
