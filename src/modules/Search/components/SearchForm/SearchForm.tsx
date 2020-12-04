import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {useSearchForm} from '../../hooks/useSearchForm';

import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';

const SearchForm: React.FC = () => {
  const {theme} = useTheme();
  const {control, rules, errors, onSubmit, canSubmit} = useSearchForm();

  return (
    <View style={[styles.formContainer, {paddingVertical: theme.layout.md}]}>
      <View style={[styles.inputsContainer, {marginBottom: theme.layout.xl}]}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={{marginBottom: theme.layout.md}}
              placeholder="Номер заказа"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.orderId?.message}
              blurOnSubmit
              autoCompleteType="email"
              autoCorrect={false}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              returnKeyType="search"
              onSubmitEditing={onSubmit}
            />
          )}
          name="orderId"
          rules={rules.orderId}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={{marginBottom: theme.layout.md}}
              placeholder="Лицевой счёт"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.userId?.message}
              blurOnSubmit
              autoCompleteType="password"
              autoCorrect={false}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              returnKeyType="search"
              onSubmitEditing={onSubmit}
            />
          )}
          name="userId"
          rules={rules.userId}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={{marginBottom: theme.layout.md}}
              placeholder="Email пользователя"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.userEmail?.message}
              blurOnSubmit
              autoCompleteType="password"
              autoCorrect={false}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="search"
              onSubmitEditing={onSubmit}
            />
          )}
          name="userEmail"
          rules={rules.userEmail}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              placeholder="ЕДРПОУ"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.contractorKey?.message}
              blurOnSubmit
              autoCompleteType="password"
              autoCorrect={false}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              returnKeyType="search"
              onSubmitEditing={onSubmit}
            />
          )}
          name="contractorKey"
          rules={rules.contractorKey}
          defaultValue=""
        />
      </View>
      <Button title="Поиск" onPress={onSubmit} disabled={!canSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
    maxWidth: 500,
  },
  inputsContainer: {
    width: '100%',
  },
});

export default SearchForm;
