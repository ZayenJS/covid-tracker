import React from 'react';
import Brand from '../Brand/Brand';
import Nav from '../Nav/Nav';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.Header}>
      <Brand path="/" name="Covid Tracker" />
      <Nav />
    </div>
  );
};

export default Header;
