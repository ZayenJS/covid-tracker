import { Country, Pagination } from '../models';
// import countries from 'i18n-iso-countries';
import { SortingType } from '../components/Top/TopTable/TopTable';

export const getTranslatedCountryNames = (lang: string) => {
  const countriesModule = require('i18n-iso-countries');
  countriesModule.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`));

  return countriesModule.getNames(lang);
};

export const getTranslatedCountryName = (countryCode: string, lang: string) => {
  const countriesModule = require('i18n-iso-countries');
  countriesModule.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`));

  return countriesModule.getName(countryCode, lang);
};

export const apiUrl = `https://api.coronatracker.com`;

export const sortCountriesByName = (countryA: Country, countryB: Country): number => {
  // Use toUpperCase() to ignore character casing
  if (countryA.country && countryB.country) {
    const uppercasedCountryA = countryA.country.toUpperCase();
    const uppercasedCountryB = countryB.country.toUpperCase();
    let comparison = 0;
    if (uppercasedCountryA > uppercasedCountryB) {
      comparison = 1;
    } else if (uppercasedCountryA < uppercasedCountryB) {
      comparison = -1;
    }
    return comparison;
  }

  return 0;
};

type SortingOrder = 'ASC' | 'DESC';

export const sortByType = (
  countries: Country[],
  sortingOrder: SortingOrder,
  sortingType: SortingType,
) => {
  if (!countries.length) return;

  let sortedCountries;

  if (sortingOrder === 'DESC') {
    sortedCountries = countries.sort((countryA: Country, countryB: Country) => {
      return countryB[sortingType]! - countryA[sortingType]!;
    });
  } else {
    sortedCountries = countries.sort(
      (countryA: Country, countryB: Country) => countryA[sortingType]! - countryB[sortingType]!,
    );
  }

  return sortedCountries;
};

export const sortCountriesByCases = (countries: Country[], sortingOrder: SortingOrder = 'ASC') =>
  sortByType(countries, sortingOrder, 'totalConfirmed');

export const sortCountriesByActive = (countries: Country[], sortingOrder: 'ASC' | 'DESC' = 'ASC') =>
  sortByType(countries, sortingOrder, 'activeCases');

export const sortCountriesByRecovered = (
  countries: Country[],
  sortingOrder: 'ASC' | 'DESC' = 'ASC',
) => sortByType(countries, sortingOrder, 'totalRecovered');

export const sortCountriesByDeaths = (countries: Country[], sortingOrder: 'ASC' | 'DESC' = 'ASC') =>
  sortByType(countries, sortingOrder, 'totalDeaths');

export const getFlagByISOCode = (ISO: string) =>
  ISO.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));

export const slugify = (str?: string) =>
  str
    ? str
        .toLowerCase()
        .replace(/[\s']/g, '-')
        .replace(/[,~#;.]/g, '')
        .replace(/[âäà]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[îï]/g, 'i')
        .replace(/[ôö]/g, 'o')
        .replace(/[ûüù]/g, 'u')
    : '';

export const getPagination = (pagination: Pagination) => {
  const { currentPageNumber, totalPages } = pagination;

  const pagesUnder = [currentPageNumber - 3, currentPageNumber - 2, currentPageNumber - 1];
  const pagesAbove = [currentPageNumber + 1, currentPageNumber + 2, currentPageNumber + 3];
  const paginationElement: { name: string | number; pageNumber: number }[] = [];

  paginationElement.push({
    name: '|<<<',
    pageNumber: 1,
  });
  paginationElement.push({
    name: '<<',
    pageNumber: currentPageNumber - 1,
  });
  for (const p of pagesUnder) {
    if (p <= 0) {
      break;
    }
    paginationElement.push({
      name: p,
      pageNumber: p,
    });
  }
  paginationElement.push({
    name: currentPageNumber,
    pageNumber: currentPageNumber,
  });

  for (const p of pagesAbove) {
    if (totalPages && p > totalPages) {
      break;
    }
    paginationElement.push({
      name: p,
      pageNumber: p,
    });
  }

  paginationElement.push({
    name: '>>',
    pageNumber: currentPageNumber + 1,
  });
  if (totalPages) {
    paginationElement.push({
      name: '>>>|',
      pageNumber: totalPages,
    });
  }
  return paginationElement;
};

export const getMortalityStats = (country: Country) => {
  const colors = ['#F00', '#00C49F', '#ff7200', '#FF8042'];

  let mortalityRate = (country.totalDeaths * 100) / country.totalConfirmed;
  mortalityRate = +mortalityRate.toFixed(2);

  let healingRate = (country.totalRecovered * 100) / country.totalConfirmed;
  healingRate = +healingRate.toFixed(2);

  let activeRate = 100 - healingRate - mortalityRate;
  activeRate = +activeRate.toFixed(2);

  return { mortalityRate, healingRate, activeRate, colors };
};

export const getCriticalStats = (country: Country) => {
  let criticalRate = (country.totalDeaths * 100) / country.totalConfirmed;
  criticalRate = +criticalRate.toFixed(2);
  return { criticalRate };
};
