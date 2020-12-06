import FormData from 'form-data';
import {config} from './config';

export const generateApiAction = (
  method: string,
  mode?: string,
  action?: string
): FormData => {
  const formData = new FormData();
  formData.append('method', method);
  if (action) {
    formData.append('action', action);
  }
  if (mode) {
    formData.append('mode', mode);
  }

  return formData;
};
