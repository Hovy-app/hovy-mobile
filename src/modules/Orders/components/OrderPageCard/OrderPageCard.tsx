import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {OrderDataType} from '../../reducer';

import Text from '../../../../components/ui/Text';

export type OrderCardProps = ViewProps & {
  orderData: OrderDataType;
  isLast?: boolean;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderData,
  isLast,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  const renderPhoneNumber = (): string => {
    if (orderData.userPhone) {
      const userPhonesArr = orderData.userPhone.toString().split(',');
      if (userPhonesArr.length > 1)
        return userPhonesArr.map((el) => `+${el}`).join(', ');
      return `+${userPhonesArr[0]}`;
    }
    return 'не указан';
  };

  const renderTextItem = (
    title: string,
    description: string,
    isLastTextItem = false
  ): JSX.Element => {
    return (
      <Text
        type="description"
        colorType="light"
        numberOfLines={1}
        style={[
          {
            color: theme.colors.primaryText,
            marginBottom: theme.layout.xs,
          },
          isLastTextItem && styles.descriptionLast,
        ]}>
        {title}:{' '}
        <Text type="description" colorType="light" style={styles.description}>
          {description}
        </Text>
      </Text>
    );
  };

  return (
    <View style={[styles.container, style]} {...restProps}>
      <View
        style={[
          {
            paddingVertical: theme.layout.md,
            borderBottomColor: theme.colors.secondaryBorder,
            borderBottomWidth: theme.border.md,
          },
          isLast && {borderBottomColor: `transparent`},
        ]}>
        <View style={[styles.titleContainer, {marginBottom: theme.layout.sm}]}>
          <View
            style={[
              styles.orderNumberContainer,
              {
                backgroundColor: theme.colors.secondary,
                paddingHorizontal: theme.layout.sm,
                borderRadius: theme.radii.sm,
              },
            ]}>
            <Text
              type="description"
              numberOfLines={1}
              style={{color: theme.colors.black}}>
              #{orderData.id}
            </Text>
          </View>
          <Text>{orderData.sum} грн</Text>
        </View>
        <Text type="subtitle" style={styles.title}>
          {orderData.eventName}
        </Text>
        {renderTextItem(
          'Покупатель',
          `${orderData.firstName || ''} ${orderData.lastName || ''}`
        )}
        {renderTextItem('Email', `${orderData.userEmail || 'не указан'}`)}
        {renderTextItem('Лицевой счёт', `${orderData.userId}`)}
        {renderTextItem('Номер телефона', renderPhoneNumber())}
        {renderTextItem('Дата оплаты', orderData.datePayment || 'не указана')}
        {renderTextItem(
          'ЕДРПОУ',
          orderData.contractorKey
            ? orderData.contractorKey.toString()
            : 'не указан'
        )}
        {renderTextItem(
          'Количество человек',
          orderData.countsMonth
            ? orderData.countsMonth.toString()
            : 'не указано',
          true
        )}
      </View>
    </View>
  );
};

OrderCard.defaultProps = {
  isLast: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumberContainer: {
    paddingVertical: 2,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  descriptionLast: {
    marginBottom: 0,
  },
  description: {
    fontWeight: 'normal',
  },
});

export default OrderCard;
