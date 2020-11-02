import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Field from '../../../../containers/components/Field';
import CountryItem from './CountryItem/CountryItem';

import { Country, GlobalInfo } from '../../../../models';
import { sortCountriesByName } from '../../../../util';

import styles from './CountryList.module.scss';

interface CountryListProps {
  countries: Country[];
  click: (country: Country | null, globalInfo?: GlobalInfo) => void;
}

const CountryList: FC<CountryListProps> = ({ click, countries }) => {
  return (
    <ul className={styles.CountryList} id="country-picker__country__list">
      <li className={styles.CountryList__Country__Search}>
        <Field autofocus name="searchedCountry" placeholder="Pays à rechercher" type="search" />
      </li>
      {countries.sort(sortCountriesByName).map((country: Country) => (
        <CountryItem key={uuidv4()} country={country} click={click} />
      ))}
    </ul>
  );
};

export default CountryList;
