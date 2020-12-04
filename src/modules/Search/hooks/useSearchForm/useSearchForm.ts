import {useState, useEffect} from 'react';
import {
  useForm,
  Control,
  DeepMap,
  FieldError,
  ValidationRules,
} from 'react-hook-form';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';
import {handleInputError} from '../../../../utils/errorUtils';
import {useSearchNavigation} from '../useSearchNavigation';

export type SearchFormType = {
  orderId: string;
  userId: string;
  userEmail: string;
  contractorKey: string;
};

export type SearchFormRulesType<T> = {
  [k in keyof T]?: ValidationRules;
};

export type UseSearchFormType = {
  control: Control<SearchFormType>;
  rules: SearchFormRulesType<SearchFormType>;
  errors: DeepMap<SearchFormType, FieldError>;
  canSubmit: boolean;
  onSubmit: () => Promise<void>;
};

export const useSearchForm = (): UseSearchFormType => {
  const {control, handleSubmit, errors, setError, getValues, watch} = useForm<
    SearchFormType
  >();
  const {handleError} = useErrorHandler();
  const {navigation} = useSearchNavigation();

  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const rules: SearchFormRulesType<SearchFormType> = {};

  const watchAllFields = watch();

  useEffect(() => {
    const orderId = getValues('orderId');
    const userId = getValues('userId');
    const userEmail = getValues('userEmail');
    const contractorKey = getValues('contractorKey');

    if (orderId || userId || userEmail || contractorKey) setCanSubmit(true);
    else setCanSubmit(false);
  }, [watchAllFields, getValues]);

  const onSubmit = handleSubmit(
    async ({orderId, userId, userEmail, contractorKey}) => {
      try {
        if (!orderId && !userId && !userEmail && !contractorKey) return;
        navigation.navigate('SearchResults', {
          filters: {
            orderId: parseInt(orderId, 10),
            userId: parseInt(userId, 10),
            userEmail,
            contractorKey: parseInt(contractorKey, 10),
          },
        });
      } catch (err) {
        ReactNativeHapticFeedback.trigger('notificationError');
        handleInputError<SearchFormType>(err, setError);
        handleError(err);
      }
    }
  );

  return {
    control,
    rules,
    errors,
    canSubmit,
    onSubmit,
  };
};
