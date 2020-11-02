import { MiddlewareAPI } from 'redux';
import countryIso from 'country-iso';
import { getCountryAdditionalInfos, selectCountry } from '../actions';
import { Country } from '../models';
import { getCountryISO2 } from '../util/convertCountryISO';

interface ISelectCountryByGEO {
  countries: Country[];
  store: MiddlewareAPI;
}

export const selectCountryByGEO = (config: ISelectCountryByGEO) => {
  const { countries, store } = config;
  let latitude, longitude;
  window.navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      latitude = coords.latitude;
      longitude = coords.longitude;

      let ISOFromCoords = getCountryISO2(countryIso.get(latitude, longitude).pop());

      countries.forEach((country: Country) => {
        if (country.countryCode === ISOFromCoords) {
          store.dispatch(selectCountry(country));
          if (!country.timeline?.length) {
            store.dispatch(getCountryAdditionalInfos(country.countryCode));
          }
        }
      });
    },
    () => {
      store.dispatch(selectCountry(countries[0]));
    },
  );
};

export const getCountryFromSlug = (countries: Country[], slug: string) =>
  countries.find((country: Country) => country.slug === slug);
