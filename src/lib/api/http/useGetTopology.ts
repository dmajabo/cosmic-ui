import * as React from 'react';
import { RequstActionTypes, dataFetchReducer, FETCH_INIT, DataFetchState } from './useRequestReducer';

// import { AuthDataContextType } from './useAuthDataProvider';
import history from 'utils/history';
import { Api } from './baseHttp';
import { HttpCode } from './apiResponse';
import { ITopologyQueryParam } from '../ApiModels/Topology/endpoints';

export function useGetTopologyAsync<TData>(): [DataFetchState<TData>, (groupUrl: string, orgUrl: string, orgParam?: ITopologyQueryParam) => Promise<void>] {
  const disposed = React.useRef({});

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

  const loadData = async (groupUrl: string, orgUrl: string, orgParam?: ITopologyQueryParam) => {
    dispatch({ type: FETCH_INIT });

    try {
      if (!disposed.current) {
        return;
      }

      const result = await Api.getTestTopologyAsync(groupUrl, orgUrl, orgParam);

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
        if (result.status === HttpCode.Unauthorized) {
          if (!disposed.current) {
            return;
          }
          dispatch({
            type: 'FETCH_FAILURE',
            payload: result,
            errorMessage: 'Something went wrong', // result.getMappedError(),
          });
        } else {
          if (!disposed.current) {
            return;
          }
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
