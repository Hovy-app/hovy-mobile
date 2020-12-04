import React, {ReactText} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {RecyclerListView} from 'recyclerlistview';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {useOrdersList} from '../../hooks/useOrdersList';
import {useOrderNavigation} from '../../hooks/useOrderNavigation';
import {OrderDataType, OrderFiltersType} from '../../reducer';

import SafeScrollerContainer from '../../../../components/common/SafeScrollerContainer';
import OrderCard from '../OrderCard';
import ListFooterLoader from '../../../../components/common/ListFooterLoader';
import ErrorCard from '../../../../components/common/ErrorCard';
import LoadingCard from '../../../../components/common/LoadingCard';

export type OrdersListProps = {
  filters?: OrderFiltersType;
};

const OrdersList: React.FC<OrdersListProps> = ({filters}) => {
  const {theme} = useTheme();
  const {
    listDataProvider,
    listLayoutProvider,
    onListEndReached,
    onListRefresh,
    handleListScroll,
    listRefreshing,
    isError,
    isNoData,
    isLoading,
    localOrdersData,
    setLocalOrdersData,
  } = useOrdersList({filters});
  const {navigation} = useOrderNavigation();

  const openOrderScreen = (data: OrderDataType): void => {
    navigation.navigate('Order', {orderData: data, setLocalOrdersData});
  };

  const renderListItem = (
    dataType: ReactText,
    data: OrderDataType
  ): JSX.Element => {
    return (
      <OrderCard orderData={data} onPress={openOrderScreen.bind(null, data)} />
    );
  };

  const renderListFooter = (): JSX.Element | null => {
    return <ListFooterLoader isLoading={isLoading} isEnd={isNoData} />;
  };

  if (!listDataProvider.getSize() && (isError || isNoData))
    return (
      <SafeScrollerContainer
        forceInset={{horizontal: 'always', vertical: 'never'}}
        isFlex
        isCentered>
        <ErrorCard type={isNoData ? 'no-data' : 'default'} />
      </SafeScrollerContainer>
    );

  if (listDataProvider.getSize())
    return (
      <RecyclerListView
        refreshControl={
          <RefreshControl
            refreshing={listRefreshing}
            onRefresh={onListRefresh}
            colors={[theme.colors.secondaryText]}
          />
        }
        extendedState={{localOrdersData}}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle="black"
        keyboardShouldPersistTaps="always"
        style={styles.container}
        canChangeSize
        onEndReachedThreshold={500}
        onEndReached={onListEndReached}
        dataProvider={listDataProvider}
        layoutProvider={listLayoutProvider}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        initialRenderIndex={0}
        rowRenderer={renderListItem}
        renderFooter={renderListFooter}
        onScroll={handleListScroll}
        scrollEventThrottle={50}
      />
    );

  return (
    <SafeScrollerContainer
      forceInset={{horizontal: 'always', vertical: 'never'}}
      isFlex
      isCentered>
      <LoadingCard />
    </SafeScrollerContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 1,
    minWidth: 1,
  },
});

export default OrdersList;
