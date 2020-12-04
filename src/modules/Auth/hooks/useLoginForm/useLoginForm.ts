import {useState, useEffect} from 'react';
import {
  useForm,
  Control,
  DeepMap,
  FieldError,
  ValidationRules,
} from 'react-hook-form';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useAuth} from '../useAuth';
import {useLoginNavigation} from '../useLoginNavigation';
import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';
import {handleInputError, ERRORS} from '../../../../utils/errorUtils';

export type LoginFormType = {
  login: string;
  password: string;
};

export type LoginFormRulesType<T> = {
  [k in keyof T]?: ValidationRules;
};

export type UseLoginFormType = {
  control: Control<LoginFormType>;
  rules: LoginFormRulesType<LoginFormType>;
  errors: DeepMap<LoginFormType, FieldError>;
  onSubmit: () => Promise<void>;
  canSubmit: boolean;
  isLoading: boolean;
};

export const useLoginForm = (): UseLoginFormType => {
  const {control, handleSubmit, errors, setError, watch, getValues} = useForm<
    LoginFormType
  >();
  const {login, isLoading} = useAuth();
  const {handleError} = useErrorHandler();
  const {navigation} = useLoginNavigation();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const rules: LoginFormRulesType<LoginFormType> = {
    login: {required: ERRORS.required},
    password: {required: ERRORS.required},
  };

  const watchAllFields = watch();

  useEffect(() => {
    const userLogin = getValues('login');
    const userPassword = getValues('password');

    if (userLogin && userPassword) setCanSubmit(true);
    else setCanSubmit(false);
  }, [watchAllFields, getValues]);

  const onSubmit = handleSubmit(
    async ({login: userLogin, password: userPassword}) => {
      try {
        await login(userLogin, userPassword);
        navigation.reset({
          index: 0,
          routes: [{name: 'ChooseEvents'}],
        });
      } catch (err) {
        ReactNativeHapticFeedback.trigger('notificationError');
        handleInputError<LoginFormType>(err, setError);
        handleError(err);
      }
    }
  );

  return {
    control,
    rules,
    errors,
    onSubmit,
    canSubmit,
    isLoading,
  };
};
