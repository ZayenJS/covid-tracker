import React, { FC } from 'react';
import moment from 'moment';

import Card from '../Card/Card';

import styles from './GlobalInfos.module.scss';
import { GlobalInfo } from '../../models';

interface GlobalInfosProps {
  infos?: GlobalInfo;
}

const GlobalInfos: FC<GlobalInfosProps> = ({ infos, children }) => {
  return (
    <section className={styles.GlobalInfos}>
      <h2 className={styles.GlobalInfos__Title}>Etat global de la situation</h2>
      {infos && (
        <div className={styles.GlobalInfos__Infos}>
          <div className={styles.GlobalInfos__Infos__CardContainer}>
            <section>
              <h2>Depuis le début de la pandémie</h2>
              <div className={styles.GlobalInfos__Infos__Cards}>
                <Card
                  isLoading={false}
                  classNames={{
                    container: 'cases',
                    title: 'title',
                    number: 'number',
                  }}
                  data={{ value: infos.totalConfirmed }}
                  heading="Cas Recensés"
                />
                <Card
                  isLoading={false}
                  classNames={{
                    container: 'deaths',
                    title: 'title',
                    number: 'number',
                  }}
                  data={{ value: infos.totalDeaths }}
                  heading="Décès"
                />
              </div>
            </section>
            <section>
              <h2>Aujourd'hui</h2>

              <div className={styles.GlobalInfos__Infos__Cards}>
                <Card
                  isLoading={false}
                  classNames={{
                    container: 'cases',
                    title: 'title',
                    number: 'number',
                  }}
                  data={{ value: infos.totalNewCases }}
                  heading="Cas recensés"
                />
                <Card
                  isLoading={false}
                  classNames={{
                    container: 'deaths',
                    title: 'title',
                    number: 'number',
                  }}
                  data={{ value: infos.totalNewDeaths }}
                  heading="Décès aujourd'hui"
                />
              </div>
            </section>
          </div>
          <p>Dernière mise à jour en date du {moment(infos?.created).format('LLL')}</p>
        </div>
      )}
      {children}
    </section>
  );
};

export default GlobalInfos;
