import React, { FC } from 'react';
import Flag from 'react-world-flags';

import { Country } from '../../../../models';

import styles from './SelectedCountry.module.scss';

interface SelectedCountryProps {
  selectedCountry?: Country;
  click: () => void;
}

const SelectedCountry: FC<SelectedCountryProps> = ({ click, selectedCountry }) => (
  <span id="country-picker__selected-country" className={styles.SelectedCountry} onClick={click}>
    <Flag width="32" code={selectedCountry?.countryCode} />
    <span>{selectedCountry?.country}</span>
    <span>&#9660;</span>
  </span>
);

export default SelectedCountry;
