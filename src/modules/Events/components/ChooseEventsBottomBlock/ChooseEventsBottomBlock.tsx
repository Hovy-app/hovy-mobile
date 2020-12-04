import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {useChooseEventsNavigation} from '../../hooks/useChooseEventsNavigation';

import Button from '../../../../components/ui/Button';

export type ChooseEventsFormProps = ViewProps & {
  disabled?: boolean;
  isLoading?: boolean;
  selectedItemsSize?: number;
  onSubmit?: () => void;
  displayBackButton?: boolean;
};

const ChooseEventsForm: React.FC<ChooseEventsFormProps> = ({
  disabled,
  isLoading,
  selectedItemsSize,
  onSubmit,
  displayBackButton,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();
  const {navigation} = useChooseEventsNavigation();

  return (
    <View
      style={[styles.container, {paddingTop: theme.layout.md}, style]}
      {...restProps}>
      <Button
        title={
          selectedItemsSize ? `Далее (${selectedItemsSize})` : 'Выберите ивент'
        }
        disabled={disabled}
        isLoading={isLoading}
        iconRight={selectedItemsSize ? 'chevron-right' : undefined}
        onPress={onSubmit}
      />
      {displayBackButton && (
        <Button
          title="Отмена"
          type="clear"
          onPress={navigation.goBack}
          style={{marginTop: theme.layout.sm}}
          titleStyle={{color: theme.colors.primaryText}}
        />
      )}
    </View>
  );
};

ChooseEventsForm.defaultProps = {
  disabled: true,
  isLoading: false,
  selectedItemsSize: 0,
  displayBackButton: false,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default ChooseEventsForm;
