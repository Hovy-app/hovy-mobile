import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Controller} from 'react-hook-form';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {useLoginForm} from '../../hooks/useLoginForm';

import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';

const LoginForm: React.FC = () => {
  const {theme} = useTheme();
  const {
    control,
    rules,
    errors,
    onSubmit,
    canSubmit,
    isLoading,
  } = useLoginForm();

  return (
    <View style={styles.formContainer}>
      <View style={[styles.inputsContainer, {marginBottom: theme.layout.xl}]}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              containerStyle={{marginBottom: theme.layout.md}}
              placeholder="Логин"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.login?.message}
              blurOnSubmit
              autoCompleteType="email"
              autoCorrect={false}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={onSubmit}
              textContentType="emailAddress"
            />
          )}
          name="login"
          rules={rules.login}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              placeholder="Пароль"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              blurOnSubmit
              autoCompleteType="password"
              autoCorrect={false}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={onSubmit}
              textContentType="password"
            />
          )}
          name="password"
          rules={rules.password}
          defaultValue=""
        />
      </View>
      <Button
        title="Войти"
        onPress={onSubmit}
        isLoading={isLoading}
        disabled={!canSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    maxWidth: 500,
    width: '100%',
    alignItems: 'center',
  },
  inputsContainer: {
    width: '100%',
  },
});

export default LoginForm;
