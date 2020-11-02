import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { CountryCardPropsFromRedux } from '../../containers/components/CountryCard';

import CountryPicker from './CountryPicker/CountryPicker';
import SelectedCountryInfos from './SelectedCountryInfos/SelectedCountryInfos';

import styles from './CountryCard.module.scss';
import Loader from '../Loader/Loader';

const CountryCard: FC<CountryCardPropsFromRedux> = ({
  countries,
  selectCountry,
  selectedCountry,
  resetSearch,
  getCountryAdditionalInfos,
  globalInfo,
  selectGlobalStats,
  isGlobalLoading,
  isAdditionalDataLoaded,
}) => {
  const [isLocallyLoading, setIsLocallyLoading] = useState(false);

  useEffect(() => {
    !countries.length && !selectedCountry
      ? setIsLocallyLoading(() => true)
      : setIsLocallyLoading(() => false);
  }, [countries.length, selectedCountry]);

  return (
    <>
      {isLocallyLoading || isGlobalLoading ? (
        <Loader backdrop={true} type={'ThreeDots'} height={50} width={50} color={'#f12f2d'} />
      ) : null}
      {!isLocallyLoading && (
        <div className={styles.CountryCard}>
          <div className={styles.CountryCard__CountryPicker__Container}>
            <CountryPicker
              selectGlobalStats={selectGlobalStats}
              globalInfo={globalInfo}
              resetSearch={resetSearch}
              countries={countries}
              selectCountry={selectCountry}
              selectedCountry={selectedCountry}
              getCountryAdditionalInfos={getCountryAdditionalInfos}
            />
            {selectedCountry ? (
              <SelectedCountryInfos
                selectedCountry={selectedCountry}
                getCountryAdditionalInfos={getCountryAdditionalInfos}
                isAdditionalDataLoaded={isAdditionalDataLoaded}
              />
            ) : null}
          </div>
          <Link to={`/infos/${selectedCountry?.slug}`} className={styles.CountryCard__CountryLink}>
            Voir plus d'infos sur ce pays
          </Link>
        </div>
      )}
    </>
  );
};

export default CountryCard;
