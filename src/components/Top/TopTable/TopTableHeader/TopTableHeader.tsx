import React, { FC, MouseEvent } from 'react';
import { IIsAsc, SortingType } from '../TopTable';

import styles from './TopTableHeader.module.scss';

interface TopTableHeaderProps {
  onHeaderClick: (sortingType: SortingType, event: MouseEvent<HTMLTableHeaderCellElement>) => void;
  isAsc: IIsAsc;
}

const TopTableHeader: FC<TopTableHeaderProps> = ({ onHeaderClick, isAsc }) => {
  const arrows = {
    up: '▲',
    down: '▼',
  };

  return (
    <thead className={styles.TopTableHeader}>
      <tr className={styles.TopTableHeader__Row}>
        <th className={[styles.TopTableHeader__Cell, 'cell--header'].join(' ')}>Pays</th>
        <th
          className={[
            styles.TopTableHeader__Cell,
            isAsc.cases !== null ? styles.TopTableHeader__Cell__Highlighted : '',
          ].join(' ')}
          onClick={(event: MouseEvent<HTMLTableHeaderCellElement>) =>
            onHeaderClick('totalConfirmed', event)
          }>
          Cas {isAsc.cases ? arrows.up : arrows.down}
        </th>
        <th
          className={[
            styles.TopTableHeader__Cell,
            isAsc.active !== null ? styles.TopTableHeader__Cell__Highlighted : '',
          ].join(' ')}
          onClick={(event: MouseEvent<HTMLTableHeaderCellElement>) =>
            onHeaderClick('activeCases', event)
          }>
          Malades {isAsc.active ? arrows.up : arrows.down}
        </th>
        <th
          className={[
            styles.TopTableHeader__Cell,
            isAsc.recovered !== null ? styles.TopTableHeader__Cell__Highlighted : '',
          ].join(' ')}
          onClick={(event: MouseEvent<HTMLTableHeaderCellElement>) =>
            onHeaderClick('totalRecovered', event)
          }>
          Rétablis {isAsc.recovered ? arrows.up : arrows.down}
        </th>
        <th
          className={[
            styles.TopTableHeader__Cell,
            isAsc.deaths !== null ? styles.TopTableHeader__Cell__Highlighted : '',
          ].join(' ')}
          onClick={(event: MouseEvent<HTMLTableHeaderCellElement>) =>
            onHeaderClick('totalDeaths', event)
          }>
          Morts {isAsc.deaths ? arrows.up : arrows.down}
        </th>
      </tr>
    </thead>
  );
};

export default TopTableHeader;
