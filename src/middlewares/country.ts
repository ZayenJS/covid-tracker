import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import axios from 'axios';
import moment from 'moment';

import {
  CountryActions,
  GET_COUNTRIES,
  GET_COUNTRY_ADDITIONAL_INFOS,
  GET_GLOBAL_TIMELINE,
  GET_NEWS_PAGE,
  hasError,
  saveCountries,
} from '../actions';
import {
  apiUrl,
  getTranslatedCountryNames,
  getFlagByISOCode,
  slugify,
  getTranslatedCountryName,
} from '../util';
import { selectCountryByGEO } from '../selectors';

import { Country, CountryNews, NewCases, Timeline } from '../models';
import { State } from '../reducers';

export const country = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (
  action: CountryActions,
) => {
  const state: State = store.getState();

  switch (action.type) {
    case GET_COUNTRIES:
      try {
        const { data: countries } = await axios.get(`${apiUrl}/v3/stats/worldometer/country`);

        countries.forEach(async (country: Country) => {
          Object.keys(getTranslatedCountryNames('fr')).forEach((ISO) => {
            if (ISO === country.countryCode) {
              country.country = getTranslatedCountryNames('fr')[ISO] as string;
              country.emoji = getFlagByISOCode(ISO);
              country.slug = slugify(country.country);
            }
          });
        });

        store.dispatch(saveCountries(countries));
        selectCountryByGEO({ countries, store });
      } catch (err) {
        store.dispatch(hasError(err));
      }
      break;
    case GET_GLOBAL_TIMELINE:
      try {
        const { data } = await axios.get(`${apiUrl}/historical/all?lastdays=30`);

        action.globalInfo = state.globalInfo;
        action.timeline = data;

        next(action);
      } catch (err) {
        store.dispatch(hasError(err));
      }

      break;
    case GET_COUNTRY_ADDITIONAL_INFOS:
      try {
        const { data: countryTimeline } = await axios.get(
          `${apiUrl}/v3/analytics/trend/country?countryCode=${
            action.countryCode
          }&startDate=${moment()
            .subtract(1, 'month')
            .format('YYYY-MM-DD')}&endDate=${moment().format('YYYY-MM-DD')}`,
        );

        const timeline = countryTimeline?.map(
          (timeline: {
            total_confirmed: number;
            total_deaths: number;
            total_recovered: number;
            last_updated: string;
          }): Timeline => ({
            lastUpdated: timeline.last_updated,
            totalConfirmed: timeline.total_confirmed,
            totalRecovered: timeline.total_recovered,
            totalDeaths: timeline.total_deaths,
          }),
        );

        action.timeline = timeline;
        const { data: countryNewCases } = await axios.get(
          `${apiUrl}/v3/analytics/newcases/country?countryCode=${
            action.countryCode
          }&startDate=${moment()
            .subtract(1, 'month')
            .format('YYYY-MM-DD')}&endDate=${moment().format('YYYY-MM-DD')}`,
        );

        const newCases = countryNewCases.map(
          (newCases: {
            last_updated: string;
            new_infections: number;
            new_deaths: number;
            new_recovered: number;
          }): NewCases => ({
            lastUpdated: newCases.last_updated,
            newInfections: newCases.new_infections,
            newRecovered: newCases.new_recovered,
            newDeaths: newCases.new_deaths,
          }),
        );

        action.newCases = newCases;

        const countryName = (getTranslatedCountryName(
          action.countryCode,
          'en',
        ) as string).toLowerCase();

        const { currentPageNumber, limit } = state.pagination;
        const offset = currentPageNumber * limit - limit;

        const { data: countryNews } = await axios.get(
          `${apiUrl}/news/trending?limit=${limit}&offset=${offset}&country=${countryName}`,
        );
        const countryNewsTotalPages = countryNews.total;
        const nbPages = Math.ceil(countryNewsTotalPages / limit);

        // @ts-ignore
        action.news = {
          data: countryNews.items as CountryNews[],
          totalPages: nbPages,
        };

        next(action);
      } catch (err) {
        store.dispatch(hasError(err));
      }
      break;
    case GET_NEWS_PAGE:
      const { limit } = state.pagination;

      const offset = action.pageNumber * limit - limit;

      try {
        const { data: countryNews } = await axios.get(
          `${apiUrl}/news/trending?limit=${limit}&offset=${offset}&country=${state.selectedCountry?.country}`,
        );

        const countryNewsTotalPages = countryNews.total;
        const nbPages = Math.ceil(countryNewsTotalPages / limit);

        action.news = {
          data: countryNews.items as CountryNews[],
          totalPages: nbPages,
        };
        next(action);
      } catch (err) {
        store.dispatch(hasError(err));
      }
      break;
    default:
      next(action);
  }
};
