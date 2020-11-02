import React, { FC } from 'react';
import { PaginationElement } from '../../../models';

interface PaginationItemProps {
  item: PaginationElement;
  className: string;
  onPageClick?: (numberPage: number) => void;
}

const PaginationItem: FC<PaginationItemProps> = ({ item, className, onPageClick }) => {
  return (
    <li
      onClick={(event) => (onPageClick ? onPageClick(item.pageNumber) : '')}
      className={className}>
      {item.name}
    </li>
  );
};

export default PaginationItem;
