import {AxiosError} from 'axios';

export const ERRORS = {
  required: 'Поле не может быть пустым.',
  loginIncorrect: 'Некорректно указан логин или пароль.',
  passwordIncorrect: 'Некорректно указан логин или пароль.',
};

export type InputErrorDataType = {
  inputName: string;
  message: string;
};

export type InputErrorInputType = {
  code: string;
  message?: string;
  data: InputErrorDataType[];
};

export class InputError extends Error {
  code: string;
  data: InputErrorDataType[];

  constructor({code, message, data}: InputErrorInputType) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export class NoDataError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export const isInputError = (err: unknown): err is InputError => {
  if (err instanceof InputError) return true;
  return false;
};

export const isNoDataError = (err: unknown): err is NoDataError => {
  if (err instanceof NoDataError) return true;
  return false;
};

export const isAxiosError = (err: unknown): err is AxiosError => {
  if ((err as AxiosError).response) return true;
  return false;
};

export const isInputNameCorrect = <T>(
  value: unknown
): value is Extract<keyof T, string> => {
  if ((value as Extract<keyof T, string>).length) return true;
  return false;
};

export const handleInputError = <T extends {[P in keyof T]: string}>(
  err: Error,
  setError: (
    inputName: Extract<keyof T, string>,
    err: {message: string}
  ) => void
): void => {
  if (isInputError(err))
    err.data.forEach((el) => {
      if (isInputNameCorrect<T>(el.inputName))
        setError(el.inputName, {message: el.message});
    });
};

export const handleNoDataError = (
  err: Error,
  setIsNoData: (s: boolean) => void
): void => {
  if (isNoDataError(err)) setIsNoData(true);
};
