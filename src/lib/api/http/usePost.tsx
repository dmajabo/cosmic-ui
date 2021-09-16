import * as React from 'react';
import { HttpCode } from './apiResponse';
import { Api } from './baseHttp';
import { RequstActionTypes, dataFetchReducer, DataFetchState } from './useRequestReducer';

export function usePost<TRequest, TData>(): [DataFetchState<TData>, (initialUrl: string, request: TRequest, userId?: string) => Promise<void>] {
  const disposed: any = React.useRef({});
  // const [url, setUrl] = React.useState(initialUrl);
  // const { onLogout } = useAuthDataContext() as AuthDataContextType;
  // const { language } = useLanguageContext();
  // const { user } = useGeneralDataContext();
  const [state, dispatch] = React.useReducer<React.Reducer<DataFetchState<TData>, RequstActionTypes<TData>>>(dataFetchReducer, {
    isLoading: false,
    isError: false,
    errorMessage: '',
    response: null,
  });

  React.useEffect(() => {
    return () => {
      disposed.current = null;
    };
  }, []);

  const send = async (initialUrl: string, request: TRequest, userId?: string) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const result = await Api.postAsync(initialUrl, request, userId || null);
      if (disposed.current) {
        if (result.success) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        } else {
          if (result.status !== HttpCode.Unauthorized) {
            dispatch({
              type: 'FETCH_FAILURE',
              payload: result,
              errorMessage: result.error.message,
            });
          } else {
            // user.onSetMe(null);
            // onLogout();
          }
        }
      }
    } catch (error) {
      if (disposed.current) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: null,
          errorMessage: error as any,
        });
      }
    }
  };

  // const postData = React.useCallback(send, [disposed.current]);

  return [state, send];
}
