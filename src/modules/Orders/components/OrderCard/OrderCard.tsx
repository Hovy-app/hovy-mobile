import React from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableHighlightProps,
  GestureResponderEvent,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Feather';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {OrderDataType} from '../../reducer';

import SafeContainer from '../../../../components/ui/SafeContainer';
import Text from '../../../../components/ui/Text';

export type OrderCardProps = TouchableHighlightProps & {
  orderData: OrderDataType;
  isLast?: boolean;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderData,
  isLast,
  onPress,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  const handlePress = (e: GestureResponderEvent): void => {
    if (!onPress) return;
    ReactNativeHapticFeedback.trigger('contextClick');
    onPress(e);
  };

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
        colorType="primary"
        numberOfLines={1}
        style={[
          {
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
    <TouchableHighlight
      underlayColor={theme.colors.secondaryBorder}
      style={[styles.container, style]}
      onPress={handlePress}
      {...restProps}>
      <SafeContainer isFlex>
        <View
          style={[
            {
              paddingVertical: theme.layout.md,
              marginHorizontal: theme.layout.md,
              borderBottomColor: theme.colors.secondaryBorder,
              borderBottomWidth: theme.border.md,
            },
            isLast && {borderBottomColor: `transparent`},
          ]}>
          <View
            style={[styles.titleContainer, {marginBottom: theme.layout.sm}]}>
            <View style={styles.numberContainer}>
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
                  colorType="light"
                  numberOfLines={1}
                  style={{color: theme.colors.primaryText}}>
                  #{orderData.id}
                </Text>
              </View>
              {orderData.presentDateSend && (
                <Icon
                  name="gift"
                  style={styles.giftIcon}
                  size={18}
                  color={theme.colors.primary}
                />
              )}
            </View>
            <Text>{orderData.sum} грн</Text>
          </View>
          {renderTextItem(
            'Покупатель',
            `${orderData.firstName || ''} ${orderData.lastName || ''}`
          )}
          {renderTextItem('Лицевой счёт', `${orderData.userId}`)}
          {renderTextItem('Номер телефона', renderPhoneNumber())}
          {renderTextItem('Дата оплаты', orderData.datePayment || 'не указана')}
          {renderTextItem(
            'ЕДРПОУ',
            orderData.contractorKey
              ? orderData.contractorKey.toString()
              : 'не указан',
            true
          )}
        </View>
      </SafeContainer>
    </TouchableHighlight>
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
  descriptionLast: {
    marginBottom: 0,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  giftIcon: {
    marginLeft: 10,
  },
  description: {
    fontWeight: 'normal',
  },
});

export default OrderCard;
