import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Flag from 'react-world-flags';

import { Country } from '../../../../models';
import { slugify } from '../../../../util';

import styles from './TopTableData.module.scss';

interface TopCountryProps {
  country: Country;
  selectCountry: (country: Country) => void;
  selectedCountry?: Country;
}

const TopCountry: FC<TopCountryProps> = ({ country, selectCountry, selectedCountry }) => {
  return (
    <tr
      className={styles.TopCountry}
      onClick={() =>
        selectedCountry?.countryCode !== country.countryCode ? selectCountry(country) : ''
      }>
      <td className={styles.TopCountry__Cell}>
        <Link to={`/infos/${slugify(country.country)}`}>
          <Flag width="32" code={country.countryCode} />
          <span>{country.country}</span>
        </Link>
      </td>
      <td className={styles.TopCountry__Cell}>
        <Link to={`/infos/${slugify(country.country)}`}>{country.totalConfirmed}</Link>
      </td>
      <td className={styles.TopCountry__Cell}>
        <Link to={`/infos/${slugify(country.country)}`}>{country.activeCases}</Link>
      </td>
      <td className={styles.TopCountry__Cell}>
        <Link to={`/infos/${slugify(country.country)}`}>
          {country.totalRecovered ? country.totalRecovered : '?'}
        </Link>
      </td>
      <td className={styles.TopCountry__Cell}>
        <Link to={`/infos/${slugify(country.country)}`}>{country.totalDeaths}</Link>
      </td>
    </tr>
  );
};

export default TopCountry;
