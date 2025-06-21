export type Status = {
  message: string;
  hasError: boolean;
  loading: boolean;
};

export const STATUS_LOADED: Status = {
  message: "",
  hasError: false,
  loading: false
};

export const STATUS_LOADING: Status = {
  message: "",
  hasError: false,
  loading: true
};

export const STATUS_ERROR: Status = {
  message: "",
  hasError: true,
  loading: false
};

export type ResultWithStatus<T> = {
  data: T;
  status: Status;
};

export const getResultWithStatus = <T>(defaultResult: T): ResultWithStatus<T>  => {
  return {
    data: defaultResult,
    status: STATUS_LOADED
  }
};

