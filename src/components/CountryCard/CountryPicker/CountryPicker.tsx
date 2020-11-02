import React, { useState, FC, useEffect } from 'react';
import { Country, GlobalInfo } from '../../../models';

import styles from './CountryPicker.module.scss';

import SelectedCountry from './SelectedCountry/SelectedCountry';
import CountryList from './CountryList/CountryList';

interface CountryPickerProps {
  countries: Country[];
  selectedCountry?: Country;
  globalInfo: GlobalInfo | undefined;
  selectCountry: (country: Country) => void;
  resetSearch: () => void;
  getCountryAdditionalInfos: (countryCode: string) => void;
  selectGlobalStats: (globalInfo: GlobalInfo) => void;
}

const CountryPicker: FC<CountryPickerProps> = ({
  countries,
  selectCountry,
  selectedCountry,
  resetSearch,
  getCountryAdditionalInfos,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const clickAway = (event: MouseEvent) => {
      if (
        isVisible &&
        event.target !== document.querySelector('.country-list__item') &&
        event.target !== document.querySelector('[name=searchedCountry]')
      ) {
        setIsVisible(false);
        resetSearch();
      }
    };
    window.addEventListener('click', clickAway);

    return () => {
      window.removeEventListener('click', clickAway);
    };
  }, [isVisible, resetSearch]);

  const toggleCountryPicker = () => {
    setIsVisible(() => !isVisible);
  };

  const clickHandler = (country: Country | null) => {
    if (country) {
      const countryCode = country.countryCode;

      selectCountry(country);
      if (!country.newCases?.length) getCountryAdditionalInfos(countryCode);
      setIsVisible(false);
    }
  };

  return (
    <>
      <div className={styles.CountryPicker}>
        <SelectedCountry click={toggleCountryPicker} selectedCountry={selectedCountry} />

        {isVisible && <CountryList click={clickHandler} countries={countries} />}
      </div>
    </>
  );
};

export default CountryPicker;
