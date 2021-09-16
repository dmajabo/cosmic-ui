import * as React from 'react';
import { RequstActionTypes, dataFetchReducer, DataFetchState } from './useRequestReducer';
import { HttpCode } from './apiResponse';
import { Api } from './baseHttp';

export function useDelete<TData>(): [DataFetchState<TData>, (initialUrl: string) => Promise<void>] {
  const disposed: any = React.useRef({});
  // const { language } = useLanguageContext();
  // const { onLogout } = useAuthDataContext() as AuthDataContextType;
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

  const send = async (initialUrl: string) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const result = await Api.deleteAsync(initialUrl);

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

  return [state, send];
}
