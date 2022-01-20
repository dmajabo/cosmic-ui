import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT_PRODUCTION;

const getHeaders = (token: string, params?: Object) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // 'Accept-Language': language,
    },
    params: params || null,
  };
};

interface IApiRes<T> {
  response: T;
  error: AxiosError;
  loading: boolean;
  onGet?: (url: string, token: string, param?: any) => void;
  onGetChainData?: (url: string[], keys: string[], token: string, param?: any) => void;
  onPost?: (url: string, _data: any, token: string, param?: any) => void;
  onPut?: (url: string, _data: any, token: string, param?: any) => void;
  onPatch?: (url: string, _data: any, token: string, param?: any) => void;
  onDelete?: (url: string, token: string, param?: any) => void;
}

export const useGet = <T = any>(): IApiRes<T> => {
  const [response, setResponse] = React.useState<T>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onGet = React.useCallback((url: string, token: string, param?: any) => {
    let isSubscribed = true;
    setloading(true);
    setError(null);
    getDataAsync(isSubscribed, url, token, param);
    return () => {
      setloading(false);
      setError(null);
      setResponse(null);
      isSubscribed = false;
    };
  }, []);

  const getDataAsync = async (isSubscribed: boolean, url: string, token: string, param?: any) => {
    const _header = getHeaders(token, param);
    await axios
      .get(url, _header)
      .then((res: AxiosResponse<T>) => {
        if (!isSubscribed) return;
        setResponse(res.data);
      })
      .catch(err => {
        if (!isSubscribed) return;
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data);
          return;
        }
        setError(err.toJSON());
      })
      .finally(() => {
        if (!isSubscribed) return;
        setloading(false);
      });
  };

  return { response, error, loading, onGet };
};

export const usePost = <T = any, R = any>(): IApiRes<R> => {
  const [response, setResponse] = React.useState<R>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onPost = React.useCallback((url: string, _data: T, token: string, param?: any) => {
    let isSubscribed = true;
    setloading(true);
    postDataAsync(isSubscribed, url, _data, token, param);
    return () => {
      setloading(false);
      setError(null);
      setResponse(null);
      isSubscribed = false;
    };
  }, []);

  const postDataAsync = async (isSubscribed: boolean, url: string, _data: T, token: string, param?: any) => {
    const _header = getHeaders(token, param);
    const data = JSON.stringify(_data);
    await axios
      .post(url, data, _header)
      .then((res: AxiosResponse<R>) => {
        if (!isSubscribed) return;
        setResponse(res.data);
      })
      .catch(err => {
        if (!isSubscribed) return;
        if (err.response && err.response.data) {
          setError(err.response.data);
          return;
        }
        setError(err.toJSON());
      })
      .finally(() => {
        if (!isSubscribed) return;
        setloading(false);
      });
  };

  return { response, error, loading, onPost };
};

export const usePut = <T = any, R = any>(): IApiRes<R> => {
  const [response, setResponse] = React.useState<R>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onPut = React.useCallback((url: string, _data: T, token: string, param?: any) => {
    let isSubscribed = true;
    setloading(true);
    putDataAsync(isSubscribed, url, _data, token, param);
    return () => {
      setloading(false);
      setError(null);
      setResponse(null);
      isSubscribed = false;
    };
  }, []);

  const putDataAsync = async (isSubscribed: boolean, url: string, _data: T, token: string, param?: any) => {
    const _header = getHeaders(token, param);
    const data = JSON.stringify(_data);
    await axios
      .put(url, data, _header)
      .then((res: AxiosResponse<R>) => {
        if (!isSubscribed) return;
        setResponse(res.data);
      })
      .catch(err => {
        if (!isSubscribed) return;
        if (err.response && err.response.data) {
          setError(err.response.data);
          return;
        }
        setError(err.toJSON());
      })
      .finally(() => {
        if (!isSubscribed) return;
        setloading(false);
      });
  };

  return { response, error, loading, onPut };
};

export const usePatch = <T = any, R = any>(): IApiRes<R> => {
  const [response, setResponse] = React.useState<R>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onPatch = React.useCallback((url: string, _data: T, token: string, param?: any) => {
    let isSubscribed = true;
    setloading(true);
    patchDataAsync(isSubscribed, url, _data, token, param);
    return () => {
      setloading(false);
      setError(null);
      setResponse(null);
      isSubscribed = false;
    };
  }, []);

  const patchDataAsync = async (isSubscribed: boolean, url: string, _data: T, token: string, param?: any) => {
    const _header = getHeaders(token, param);
    const data = JSON.stringify(_data);
    await axios
      .patch(url, data, _header)
      .then((res: AxiosResponse<R>) => {
        if (!isSubscribed) return;
        setResponse(res.data);
      })
      .catch(err => {
        if (!isSubscribed) return;
        if (err.response && err.response.data) {
          setError(err.response.data);
          return;
        }
        setError(err.toJSON());
      })
      .finally(() => {
        if (!isSubscribed) return;
        setloading(false);
      });
  };

  return { response, error, loading, onPatch };
};

export const useDelete = <T = any>(): IApiRes<T> => {
  const [response, setResponse] = React.useState<T>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onDelete = React.useCallback((url: string, token: string, param?: any) => {
    let isSubscribed = true;
    setloading(true);
    deleteDataAsync(isSubscribed, url, token, param);
    return () => {
      setloading(false);
      setError(null);
      setResponse(null);
      isSubscribed = false;
    };
  }, []);

  const deleteDataAsync = async (isSubscribed: boolean, url: string, token: string, param?: any) => {
    const _header = getHeaders(token, param);
    await axios
      .delete(url, _header)
      .then((res: AxiosResponse) => {
        if (!isSubscribed) return;
        setResponse(res.data);
      })
      .catch(err => {
        if (!isSubscribed) return;
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data);
          return;
        }
        setError(err.toJSON());
      })
      .finally(() => {
        if (!isSubscribed) return;
        setloading(false);
      });
  };

  return { response, error, loading, onDelete };
};

export const useGetChainData = <T = any>(): IApiRes<T> => {
  const [response, setResponse] = React.useState<T>(null);
  const [error, setError] = React.useState<AxiosError>(null);
  const [loading, setloading] = React.useState<boolean>(false);

  const onGetChainData = React.useCallback(async (url: string[], keys: string[], token: string, param?: any) => {
    let isSubscribed = true;
    setloading(true);
    setError(null);
    const source = axios.CancelToken.source();
    await getDataAsync(isSubscribed, url, keys, token, param);
    return () => {
      source.cancel('Cancelling in cleanup');
      console.log('Cancelling in cleanup');
      setloading(false);
      setError(null);
      setResponse(null);
      isSubscribed = false;
    };
  }, []);

  const getDataAsync = async (isSubscribed: boolean, url: string[], keys: string[], token: string, param?: any) => {
    const _header = getHeaders(token, param);
    await axios
      .all([...keys.map((it, index) => axios.get(url[index], _header))])
      .then((res: AxiosResponse<any>[]) => {
        if (!isSubscribed) return;
        const _obj: any = {};
        keys.forEach((key, i) => {
          _obj[key] = res[i].data;
        });
        setResponse(_obj);
      })
      .catch((err: AxiosError | AxiosError[]) => {
        if (!isSubscribed) return;
        if (Array.isArray(err)) {
          const _obj: any = {};
          keys.forEach((key, i) => {
            if (err[i].response && err[i].response.data && err[i].response.data.message) {
              _obj[key] = err[i].response.data;
              return;
            }
            _obj[key] = err[i].toJSON();
          });
          setError(_obj);
          return;
        }
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data);
          return;
        }
        setError(err);
      })
      .finally(() => {
        if (!isSubscribed) return;
        setloading(false);
      });
  };

  return { response, error, loading, onGetChainData };
};
