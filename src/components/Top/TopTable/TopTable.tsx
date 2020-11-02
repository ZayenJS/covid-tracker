import React, { FC, MouseEvent, useEffect, useState } from 'react';

import { Country } from '../../../models';
import { sortByType } from '../../../util';

import TopTableData from './TopTableData/TopTableData';
import TopTableHeader from './TopTableHeader/TopTableHeader';

import styles from './TopTable.module.scss';

interface TopTableProps {
  countries: Country[];
  selectCountry: (country: Country) => void;
  selectedCountry?: Country;
}

export interface IIsAsc {
  cases: boolean | null;
  active: boolean | null;
  recovered: boolean | null;
  deaths: boolean | null;
}

export type SortingType = 'totalConfirmed' | 'activeCases' | 'totalRecovered' | 'totalDeaths';

const TopTable: FC<TopTableProps> = ({ countries, selectCountry, selectedCountry }) => {
  const [sortedCountries, setSortedCountries] = useState<{ isAsc: boolean; countries?: Country[] }>(
    {
      countries: [],
      isAsc: false,
    },
  );

  const [lastSortingType, setLastSortingType] = useState('');

  const [isAsc, setIsAsc] = useState<IIsAsc>({
    cases: false,
    active: null,
    recovered: null,
    deaths: null,
  });

  useEffect(() => {
    if (countries.length) {
      setSortedCountries(() => ({
        countries: sortByType(countries, 'DESC', 'totalConfirmed'),
        isAsc: false,
      }));
      setIsAsc(() => ({
        cases: false,
        active: null,
        recovered: null,
        deaths: null,
      }));
    }
  }, [countries]);

  const sortTop = (sortingType: SortingType, event: MouseEvent<HTMLTableHeaderCellElement>) => {
    setLastSortingType(() => sortingType);

    if (lastSortingType !== sortingType) {
      setSortedCountries(() => ({ countries: sortedCountries.countries, isAsc: false }));
    }

    setIsAsc(() => ({
      cases: sortingType === 'totalConfirmed' ? !sortedCountries.isAsc : null,
      active: sortingType === 'activeCases' ? !sortedCountries.isAsc : null,
      recovered: sortingType === 'totalRecovered' ? !sortedCountries.isAsc : null,
      deaths: sortingType === 'totalDeaths' ? !sortedCountries.isAsc : null,
    }));

    setSortedCountries(() => ({
      countries: sortByType(countries, sortedCountries.isAsc ? 'DESC' : 'ASC', sortingType),
      isAsc: !sortedCountries.isAsc,
    }));
  };

  return (
    <table className={styles.TopTable}>
      <TopTableHeader onHeaderClick={sortTop} isAsc={isAsc} />
      <tbody>
        {sortedCountries.countries?.map(
          (country: Country, index: number) =>
            index < 15 && (
              <TopTableData
                key={country.country}
                country={country}
                selectCountry={selectCountry}
                selectedCountry={selectedCountry}
              />
            ),
        )}
      </tbody>
    </table>
  );
};

export default TopTable;
