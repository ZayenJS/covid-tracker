import React, { FC } from 'react';
import moment from 'moment';

import { HomePropsFromRedux } from '../../containers/components/Home';

import GlobalInfos from '../GlobalInfos/GlobalInfos';
import CountryCard from '../../containers/components/CountryCard';
import Top from '../../containers/components/Top';

import styles from './Home.module.scss';
import DataGraph from '../DataGraph/DataGraph';
import News from '../../containers/components/News';

const Home: FC<HomePropsFromRedux> = ({ globalInfos, dates }) => {
  return (
    <div className={styles.Home}>
      <GlobalInfos infos={globalInfos}>
        {globalInfos?.totalConfirmed && globalInfos.totalRecovered && globalInfos.totalDeaths ? (
          <DataGraph
            updated={+moment(globalInfos.created).format('x')}
            timeline={globalInfos.timeline}
            global={true}
          />
        ) : null}
      </GlobalInfos>
      <div className={styles.Home__CountryInfos}>
        <section>
          <div>
            <h2>Etat local de la situation</h2>
            <CountryCard />
          </div>
          <News />
        </section>
        <Top />
      </div>
    </div>
  );
};

export default Home;
