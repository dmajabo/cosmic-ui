import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_ENDPOINT_DEVELOPMENT : process.env.REACT_APP_API_ENDPOINT_PRODUCTION;

const getHeaders = (params?: Object, token?: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : '',
      // 'Accept-Language': language,
    },
    params: params || null,
  };
};

interface IApiRes<T> {
  response: T;
  error: AxiosError;
  loading: boolean;
  onGet?: (url: string, param?: any, token?: string) => void;
  onPost?: (url: string, _data: any, param?: any, token?: string) => void;
  onDelete?: (url: string, param?: any, token?: string) => void;
}

export const useGet = <T = any>(): IApiRes<T> => {
  const [response, setResponse] = React.useState<T>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onGet = React.useCallback((url: string, param?: any, token?: string) => {
    setloading(true);
    setError(null);
    getDataAsync(url, param, token);
  }, []);

  const getDataAsync = async (url: string, param?: any, token?: string) => {
    const _header = getHeaders(param, token);
    await axios
      .get(url, _header)
      .then((res: AxiosResponse<T>) => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err.toJSON());
      })
      .finally(() => {
        setloading(false);
      });
  };

  return { response, error, loading, onGet };
};

export const usePost = <T = any>(): IApiRes<T> => {
  const [response, setResponse] = React.useState<T>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onPost = React.useCallback((url: string, param?: any, token?: string) => {
    setloading(true);
    postDataAsync(url, param, token);
  }, []);

  const postDataAsync = async (url: string, _data: any, param?: any, token?: string) => {
    const _header = getHeaders(param, token);
    const data = JSON.stringify(_data);
    await axios
      .post(url, data, _header)
      .then((res: AxiosResponse<T>) => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err.toJSON());
      })
      .finally(() => {
        setloading(false);
      });
  };

  return { response, error, loading, onPost };
};

export const useDelete = <T = any>(): IApiRes<T> => {
  const [response, setResponse] = React.useState<T>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onDelete = React.useCallback((url: string, param?: any, token?: string) => {
    setloading(true);
    deleteDataAsync(url, param, token);
  }, []);

  const deleteDataAsync = async (url: string, param?: any, token?: string) => {
    const _header = getHeaders(param, token);
    await axios
      .delete(url, _header)
      .then((res: AxiosResponse) => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err.toJSON());
      })
      .finally(() => {
        setloading(false);
      });
  };

  return { response, error, loading, onDelete };
};
