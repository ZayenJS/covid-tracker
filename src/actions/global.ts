import { GlobalInfo, Timeline } from '../models';

export const IS_LOADING = 'IS_LOADING';
export const HAS_ERROR = 'HAS_ERROR';
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const RESET_SEARCH = 'RESET_SEARCH';
export const GET_GLOBAL_DATA = 'GET_GLOBAL_DATA';
export const SELECT_GLOBAL_STATS = 'SELECT_GLOBAL_STATS';
export const GET_GLOBAL_TIMELINE = 'GET_GLOBAL_TIMELINE';

export interface IsLoadingAction {
  type: typeof IS_LOADING;
  value: boolean;
}

export interface HasErrorAction {
  type: typeof HAS_ERROR;
  message: string;
}

export interface InputChangeAction {
  type: typeof INPUT_CHANGE;
  name: string;
  value: string;
  reducerName?: string;
}

export interface ResetSearchAction {
  type: typeof RESET_SEARCH;
}

export interface GetGlobalDataAction {
  type: typeof GET_GLOBAL_DATA;
  data?: GlobalInfo;
}

export interface SelectGlobalStatsAction {
  type: typeof SELECT_GLOBAL_STATS;
}

export interface GetGlobalTimelineAction {
  type: typeof GET_GLOBAL_TIMELINE;
  globalInfo?: GlobalInfo;
  timeline?: Timeline;
}

export const isLoading = (value: boolean): IsLoadingAction => ({
  type: IS_LOADING,
  value,
});

export const hasError = (message: string): HasErrorAction => ({
  type: HAS_ERROR,
  message,
});

export const inputChange = (
  name: string,
  value: string,
  reducerName?: string,
): InputChangeAction => ({
  type: INPUT_CHANGE,
  name,
  value,
  reducerName,
});

export const resetSearch = (): ResetSearchAction => ({ type: RESET_SEARCH });

export const getGlobalData = (data?: GlobalInfo): GetGlobalDataAction => ({
  type: GET_GLOBAL_DATA,
  data,
});

export const selectGlobalStats = (): SelectGlobalStatsAction => ({ type: SELECT_GLOBAL_STATS });

export type GlobalActions =
  | IsLoadingAction
  | HasErrorAction
  | InputChangeAction
  | ResetSearchAction
  | SelectGlobalStatsAction
  | GetGlobalDataAction;
