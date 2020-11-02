import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Flag from 'react-world-flags';

import { CountryDetailsPropsFromRedux } from '../../containers/components/CountryDetails';
import DataGraph from '../DataGraph/DataGraph';
import SelectedCountryInfos from '../CountryCard/SelectedCountryInfos/SelectedCountryInfos';
import PieChart from '../PieChart/PieChart';
import Loader from '../Loader/Loader';

import { getCriticalStats, getMortalityStats } from '../../util';
import styles from './CountryDetails.module.scss';

interface PieDataProps {
  name: string;
  // value is in %
  value: number;
}

interface CountryDetailsState {
  mortalityStats: {
    colors: string[];
    data: PieDataProps[];
  };
  criticalStats: {
    colors: string[];
    data: PieDataProps[];
  };
}

const CountryDetails: FC<CountryDetailsPropsFromRedux> = ({
  country,
  getCountryAdditionalInfos,
  isAdditionalDataLoaded,
}) => {
  const [state, setState] = useState<CountryDetailsState>({
    mortalityStats: { colors: [], data: [] },
    criticalStats: { colors: [], data: [] },
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (country) {
      const { mortalityRate, healingRate, activeRate, colors } = getMortalityStats(country);
      const { criticalRate } = getCriticalStats(country);

      setState((prevState) => ({
        ...prevState,
        mortalityStats: {
          data: [
            { name: 'Mortalité', value: mortalityRate },
            { name: 'Guérison', value: healingRate },
            { name: 'Cas actifs', value: activeRate },
          ],
          colors,
        },
        criticalStats: {
          data: [
            { name: 'Cas', value: 100 - criticalRate },
            { name: 'Cas critiques', value: criticalRate },
          ],
          colors: ['#213458', '#a215ef'],
        },
      }));

      if (!country.timeline?.length) {
        getCountryAdditionalInfos(country.countryCode);
      }
    }
  }, [country, dispatch, getCountryAdditionalInfos, history]);

  return country ? (
    <div className={styles.CountryDetails}>
      <h2>
        <Flag width="48" code={country.countryCode} />
        <span>{country.country}</span>
      </h2>
      <div
        className={styles.CountryDetails__Container1}
        style={{ display: 'flex', flexFlow: 'row wrap' }}>
        <SelectedCountryInfos
          className={styles.CountryDetails__SelectedCountry}
          selectedCountry={country}
          getCountryAdditionalInfos={getCountryAdditionalInfos}
          isAdditionalDataLoaded={isAdditionalDataLoaded}
        />
        <PieChart data={state.mortalityStats.data} colors={state.mortalityStats.colors} />
        <PieChart data={state.criticalStats.data} colors={state.criticalStats.colors} />
      </div>
      <h3>Statistiques du pays au cours des 30 derniers jours</h3>

      {isAdditionalDataLoaded ? (
        <DataGraph timeline={country.timeline} updated={+moment(country.lastUpdated).format('x')} />
      ) : (
        <Loader type="TailSpin" height={150} width={150} color={'#f12f2d'} />
      )}
    </div>
  ) : (
    <Loader backdrop={true} type="BallTriangle" height={150} width={150} color={'#f12f2d'} />
  );
};

export default CountryDetails;
