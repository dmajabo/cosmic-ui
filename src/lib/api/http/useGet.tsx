import * as React from 'react';
import { RequstActionTypes, dataFetchReducer, FETCH_INIT, DataFetchState } from './useRequestReducer';

// import { AuthDataContextType } from './useAuthDataProvider';
import history from 'utils/history';
import { HttpCode } from './apiResponse';
import { Api } from './baseHttp';

export function useGet<TData>(): [DataFetchState<TData>, (requestUrl: string, param?: any) => Promise<void>] {
  const disposed = React.useRef({});

  // const { onLogout } = useAuthDataContext() as AuthDataContextType;

  const [state, dispatch] = React.useReducer<React.Reducer<DataFetchState<TData>, RequstActionTypes<TData>>>(dataFetchReducer, {
    isLoading: true,
    isError: false,
    errorMessage: '',
    response: null,
  });
  React.useEffect(() => {
    return () => {
      disposed.current = null as any;
    };
  }, []);

  const loadData = async (requestUrl: string, param?: any) => {
    dispatch({ type: FETCH_INIT });
    try {
      if (!disposed.current) {
        return;
      }

      const result = await Api.getAsync(requestUrl, param);
      if (result.success) {
        if (!disposed.current) {
          return;
        }
        dispatch({ type: 'FETCH_SUCCESS', payload: result });
      } else {
        if (result.status === HttpCode.InternalServerError) {
          history.push('/serverErrorPage');
          return;
        }
        if (result.status !== HttpCode.Unauthorized) {
          if (!disposed.current) {
            return;
          }
          dispatch({
            type: 'FETCH_FAILURE',
            payload: result,
            errorMessage: result.error.message,
          });
        } else {
          if (!disposed.current) {
            return;
          }
          // user.onSetMe(null);
          // onLogout();
        }
      }
    } catch (error) {
      if (!disposed.current) {
        return;
      }
      dispatch({
        type: 'FETCH_FAILURE',
        payload: null,
        errorMessage: error as any,
      });
    }
  };

  return [state, loadData];
}
