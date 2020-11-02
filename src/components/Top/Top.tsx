import React, { FC } from 'react';

import { TopPropsFromRedux } from '../../containers/components/Top';

import TopTable from './TopTable/TopTable';

import styles from './Top.module.scss';

const Top: FC<TopPropsFromRedux> = ({ countries, selectCountry, selectedCountry }) => {
  return (
    <section className={styles.Top}>
      <h2>Top des pays</h2>
      <TopTable
        countries={countries}
        selectCountry={selectCountry}
        selectedCountry={selectedCountry}
      />
    </section>
  );
};

export default Top;
