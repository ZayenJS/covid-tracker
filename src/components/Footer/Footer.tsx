import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className={styles.Footer}>
      <span className={styles.Footer__Item}>
        Developpé avec
        <span role="img" aria-label="emoji" className={styles.Footer__Emoji}>
          😷
        </span>
        par
        <a
          className={styles.Footer__GithubLink}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ZayenJS">
          ZayenJS
        </a>
      </span>
      -
      <span className={styles.Footer__Item}>
        <Link to="/credits">Credits</Link>
      </span>
    </footer>
  );
};

export default Footer;
