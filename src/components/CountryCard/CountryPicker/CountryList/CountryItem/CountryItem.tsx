import React, { FC } from 'react';
import Flag from 'react-world-flags';

import { Country } from '../../../../../models';

import styles from './CountryItem.module.scss';

interface CountryProps {
  country?: Country;
  click: (country: Country | null) => void;
}

const CountryItem: FC<CountryProps> = ({ country, click }) => {
  return country ? (
    <li
      className={['country-list__item', styles.CountryItem].join(' ')}
      key={country.country}
      onClick={() => click(country)}>
      <Flag width="32" code={country.countryCode} />
      {country.country}
    </li>
  ) : null;
};

export default CountryItem;
