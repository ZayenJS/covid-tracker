import React, { CSSProperties, FC, useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';

import Card from '../../Card/Card';

import { Country, NewCases } from '../../../models';
import { getCountryAdditionalInfos } from '../../../actions';

import styles from './SelectedCountryInfos.module.scss';

interface SelectedCountryInfosProps {
  style?: CSSProperties;
  className?: string;
  selectedCountry: Country;
  getCountryAdditionalInfos: (countryCode: string) => void;
  readonly isAdditionalDataLoaded: boolean;
}

const SelectedCountryInfos: FC<SelectedCountryInfosProps> = ({
  style,
  className = '',
  selectedCountry,
  isAdditionalDataLoaded,
}) => {
  const [newCases, setNewCases] = useState<NewCases[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdditionalDataLoaded) {
      setIsLoading(true);
      getCountryAdditionalInfos(selectedCountry.countryCode);
    } else {
      if (selectedCountry.newCases?.length) {
        setNewCases(selectedCountry.newCases);
        setIsLoading(false);
      }
    }
  }, [isAdditionalDataLoaded, selectedCountry]);

  return (
    <>
      {selectedCountry?.totalConfirmed &&
      selectedCountry.totalRecovered &&
      selectedCountry.totalDeaths ? (
        <section
          style={{ ...style }}
          className={[styles.SelectedCountryInfos, className].join(' ')}>
          <div className={styles.SelectedCountryInfos__Details}>
            <Card
              classNames={{
                container: 'cases',
                title: 'title',
                number: 'number',
                newValue: 'add',
              }}
              data={{
                value: selectedCountry?.totalConfirmed,
                newValue: newCases[newCases.length - 1]?.newInfections,
              }}
              heading="Cas recensés"
              isLoading={isLoading}
            />
            <Card
              classNames={{
                container: 'recovered',
                title: 'title',
                number: 'number',
                newValue: 'add',
              }}
              data={{
                value: selectedCountry.totalRecovered,
                newValue: newCases[newCases.length - 1]?.newRecovered,
              }}
              heading="Rétablis"
              isLoading={isLoading}
            />
            <Card
              classNames={{
                container: 'deaths',
                title: 'title',
                number: 'number',
                newValue: 'add',
              }}
              data={{
                value: selectedCountry.totalDeaths,
                newValue: newCases[newCases.length - 1]?.newDeaths,
              }}
              heading="Décès"
              isLoading={isLoading}
            />
          </div>
        </section>
      ) : (
        <Loader type="BallTriangle" color="#f12f2d" height={100} width={100} />
      )}
      {/* <Loader type="Audio" color="#fff" height={100} width={100} />
      <Loader type="Bars" color="#fff" height={100} width={100} />
      <Loader type="Circles" color="#fff" height={100} width={100} />
      <Loader type="Grid" color="#fff" height={100} width={100} />
      <Loader type="Hearts" color="#fff" height={100} width={100} />
      <Loader type="MutatingDots" color="#fff" height={100} width={100} />
      <Loader type="None" color="#fff" height={100} width={100} />
      <Loader type="NotSpecified" color="#fff" height={100} width={100} />
      <Loader type="Oval" color="#fff" height={100} width={100} />
      <Loader type="Plane" color="#fff" height={100} width={100} />
      <Loader type="Puff" color="#fff" height={100} width={100} />
      <Loader type="RevolvingDot" color="#fff" height={100} width={100} />
      <Loader type="Rings" color="#fff" height={100} width={100} />
      <Loader type="TailSpin" color="#fff" height={100} width={100} />
      <Loader type="ThreeDots" color="#fff" height={100} width={100} />
      <Loader type="Triangle" color="#fff" height={100} width={100} />
      <Loader type="Watch" color="#fff" height={100} width={100} /> */}
    </>
  );
};

export default SelectedCountryInfos;
