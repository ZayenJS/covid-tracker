import {
  CountryActions,
  INPUT_CHANGE,
  RESET_SEARCH,
  SAVE_COUNTRIES,
  SELECT_COUNTRY,
  GET_GLOBAL_DATA,
  GlobalActions,
  IS_LOADING,
  GET_COUNTRY_ADDITIONAL_INFOS,
  GET_NEWS_PAGE,
} from '../actions';

import { Country, GlobalInfo, Pagination } from '../models';

import { sortCountriesByName } from '../util';

export interface State {
  readonly countryList: Country[];
  readonly selectedCountry?: Country;
  readonly isAdditionalDataLoaded: boolean;
  readonly dates: string[];
  readonly searchResults: Country[];
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly globalInfo?: GlobalInfo;
  readonly pagination: Pagination;
}

const INITIAL_STATE: State = {
  countryList: [],
  selectedCountry: undefined,
  isAdditionalDataLoaded: false,
  dates: [],
  searchResults: [],
  isLoading: false,
  hasError: false,
  pagination: {
    currentPageNumber: 1,
    limit: 6,
    totalPages: 0,
  },
};

const reducer = (state: State = INITIAL_STATE, action: CountryActions | GlobalActions): State => {
  switch (action.type) {
    case SAVE_COUNTRIES:
      return {
        ...state,
        countryList: action.countries.sort(sortCountriesByName) || [],
        searchResults: action.countries.sort(sortCountriesByName) || [],
      };
    case SELECT_COUNTRY:
      return {
        ...state,
        searchResults: state.countryList,
        selectedCountry: action.country,
        isAdditionalDataLoaded: false,
        pagination: {
          ...state.pagination,
          currentPageNumber: 1,
        },
      };
    case GET_COUNTRY_ADDITIONAL_INFOS:
      const foundCountry = state.countryList.find(
        (country: Country) => country.countryCode === action.countryCode,
      );

      if (foundCountry) {
        foundCountry.timeline = action.timeline;
        foundCountry.newCases = action.newCases;
        foundCountry.news = action.news?.data;
      }

      return {
        ...state,
        countryList: state.countryList.map((country: Country) =>
          country.countryCode === foundCountry?.countryCode ? foundCountry : country,
        ),
        selectedCountry: foundCountry,
        isAdditionalDataLoaded: true,
        pagination: {
          ...state.pagination,
          totalPages: action.news?.totalPages ?? 0,
        },
      };
    case INPUT_CHANGE:
      const regex = new RegExp(`${action.value.toLowerCase()}`, 'g');

      return {
        ...state,
        searchResults: state.countryList.filter((country: Country) =>
          country.country?.toLowerCase().match(regex),
        ),
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchResults: state.countryList,
      };
    case IS_LOADING:
      return { ...state, isLoading: action.value };
    case GET_GLOBAL_DATA:
      return {
        ...state,
        globalInfo: action.data,
      };
    case GET_NEWS_PAGE:
      let selectedCountry;

      if (state.selectedCountry && action.news) {
        selectedCountry = {
          ...state.selectedCountry,
          news: action.news.data,
        };
      }
      return {
        ...state,
        selectedCountry,
        pagination: {
          ...state.pagination,
          totalPages: action.news?.totalPages ?? 0,
          currentPageNumber: action.pageNumber,
        },
      };
    default:
      return state;
  }
};

export default reducer;
