import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Nav.module.scss';

interface NavProps {}

const Nav: FC<NavProps> = () => {
  return (
    <ul className={styles.Nav}>
      <li className={styles.Nav__Item}>
        <Link className={styles.Nav__Item__Link} to="/">
          Accueil
        </Link>
      </li>
      <li>
        <Link to="/en-savoir-plus-sur-le-covid">En savoir plus sur le COVID</Link>
      </li>
    </ul>
  );
};

export default Nav;
