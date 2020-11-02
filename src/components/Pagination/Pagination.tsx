import React, { FC } from 'react';
import { Pagination as PaginationModel, PaginationElement } from '../../models';
import styles from './Pagination.module.scss';
import PaginationItem from './PaginationItem/PaginationItem';

interface PaginationProps {
  items: PaginationElement[];
  pagination: PaginationModel;
  onPageClick: (numberPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ items, pagination, onPageClick }) => {
  return (
    <ul className={styles.Pagination}>
      {items.map((item) =>
        item.pageNumber <= 0 ||
        (item.name === '|<<<' && pagination.currentPageNumber === 1) ||
        item.pageNumber > pagination.totalPages ||
        (item.name === '>>>|' && pagination.currentPageNumber === pagination.totalPages) ? (
          <PaginationItem
            key={item.name}
            item={item}
            className={styles.Pagination__Item__Disabled}
          />
        ) : (
          <PaginationItem
            key={item.name}
            item={item}
            className={
              pagination.currentPageNumber === item.pageNumber &&
              pagination.currentPageNumber === item.name
                ? styles.Pagination__Item__Active
                : styles.Pagination__Item
            }
            onPageClick={onPageClick}
          />
        ),
      )}
    </ul>
  );
};

export default Pagination;
