import { Country, CountryNews, NewCases, Timeline } from '../models';
import {
  GetGlobalTimelineAction,
  InputChangeAction,
  ResetSearchAction,
  SelectGlobalStatsAction,
} from './global';

export const SELECT_COUNTRY = 'SELECT_COUNTRY';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const SAVE_COUNTRIES = 'SAVE_COUNTRIES';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const GET_COUNTRY_TIMELINE = 'GET_COUNTRY_TIMELINE';
export const GET_COUNTRY_NEW_CASES = 'GET_COUNTRY_NEW_CASES';
export const GET_COUNTRY_ADDITIONAL_INFOS = 'GET_COUNTRY_ADDITIONAL_INFOS';
export const GET_NEWS_PAGE = 'GET_NEWS_PAGE';

export interface SelectCountryAction {
  type: typeof SELECT_COUNTRY;
  country: Country;
}

export interface GetCountriesAction {
  type: typeof GET_COUNTRIES;
}

export interface SaveCountriesAction {
  type: typeof SAVE_COUNTRIES;
  countries: Country[];
}

export interface GetCountryAdditionalInfos {
  type: typeof GET_COUNTRY_ADDITIONAL_INFOS;
  countryCode: string;
  timeline?: Timeline[];
  data?: any[];
  news?: {
    data: CountryNews[];
    totalPages: number;
  };
  newCases?: NewCases[];
}

export interface GetCountryTimelineAction {
  type: typeof GET_COUNTRY_TIMELINE;
  countryCode: string;
  timeline?: Timeline[];
  data?: any[];
}

export interface GetCountryNewCasesAction {
  type: typeof GET_COUNTRY_NEW_CASES;
  countryCode: string;
  newCases?: NewCases[];
}

export interface GetNewsPageAction {
  type: typeof GET_NEWS_PAGE;
  pageNumber: number;
  news?: {
    data: CountryNews[];
    totalPages: number;
  };
}

export const selectCountry = (country: Country): SelectCountryAction => ({
  type: SELECT_COUNTRY,
  country,
});
export const getCountries = (): GetCountriesAction => ({ type: GET_COUNTRIES });
export const saveCountries = (countries: Country[]): SaveCountriesAction => ({
  type: SAVE_COUNTRIES,
  countries,
});
export const getCountryAdditionalInfos = (
  countryCode: string,
  data?: any[],
): GetCountryAdditionalInfos => ({ type: GET_COUNTRY_ADDITIONAL_INFOS, countryCode, data });

export const getCountryTimeline = (
  countryCode: string,
  data?: any[],
): GetCountryTimelineAction => ({
  type: GET_COUNTRY_TIMELINE,
  countryCode,
  data,
});
export const getCountryNewCases = (countryCode: string): GetCountryNewCasesAction => ({
  type: GET_COUNTRY_NEW_CASES,
  countryCode,
});
export const getNewsPage = (
  pageNumber: number,
  news?: {
    data: CountryNews[];
    totalPages: number;
  },
): GetNewsPageAction => ({
  type: GET_NEWS_PAGE,
  pageNumber,
  news,
});

export type CountryActions =
  | SelectCountryAction
  | GetCountriesAction
  | SaveCountriesAction
  | GetCountryTimelineAction
  | InputChangeAction
  | ResetSearchAction
  | SelectGlobalStatsAction
  | GetGlobalTimelineAction
  | GetCountryNewCasesAction
  | GetCountryAdditionalInfos
  | GetNewsPageAction;
