import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/virus.svg';

import styles from './Brand.module.scss';

interface BrandProps {
  path: string;
  name: string;
}

const Brand: FC<BrandProps> = ({ path, name }) => {
  return (
    <div className={styles.Brand}>
      <Link className={styles.Brand__Name} to={path}>
        <img src={logo} alt="coronavirus" />
        <h1>{name}</h1>
      </Link>
    </div>
  );
};

export default Brand;
