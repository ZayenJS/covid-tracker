import React, { FC } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './Layout.module.scss'

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.Layout}>
      <Header />
      <main>{children}</main>
      <Footer />
      </div>
    </>
  );
};

export default Layout;
