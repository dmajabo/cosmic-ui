import { ApiResponses } from './apiResponces';
import { ApiResponse } from './apiResponse';

export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

interface FethcInitAction {
  type: typeof FETCH_INIT;
}
interface FethcSuccessAction<TData> {
  type: typeof FETCH_SUCCESS;
  payload: ApiResponse<TData> | ApiResponses<TData>;
}
interface FethcFailureAction<TData> {
  type: typeof FETCH_FAILURE;
  payload: ApiResponse<TData> | ApiResponses<TData> | null;
  errorMessage: string;
}

export interface DataFetchState<TData> {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  response: ApiResponse<TData> | ApiResponses<TData> | null;
}

export type RequstActionTypes<TData> = FethcInitAction | FethcFailureAction<TData> | FethcSuccessAction<TData>;

export function dataFetchReducer<TData>(state: DataFetchState<TData>, action: RequstActionTypes<TData>): DataFetchState<TData> {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        response: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage,
        response: action.payload,
      };
    default:
      throw new Error();
  }
}
