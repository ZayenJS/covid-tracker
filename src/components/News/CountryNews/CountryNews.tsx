import React, { FC } from 'react';
import moment from 'moment';

import { CountryNews as CountryNewsModel } from '../../../models';
import styles from './CountryNews.module.scss';

interface CountryNewsProps extends CountryNewsModel {}

const CountryNews: FC<CountryNewsProps> = ({
  content,
  description,
  publishedAt,
  siteName,
  title,
  url,
  urlToImage,
}) => {
  return (
    <li className={styles.CountryNews}>
      <h2 className={styles.CountryNews__Title}>{title}</h2>
      <img className={styles.CountryNews__Image} title={description} src={urlToImage} alt={title} />
      <p className={styles.CountryNews__Content}>
        {content.substring(0, 750)}
        <a
          className={styles.CountryNews__Source}
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          {' '}
          ... lire la suite sur {siteName}
        </a>
      </p>
      <p className={styles.CountryNews__Published}>
        publié le : {moment(publishedAt).format('LL')}
      </p>
    </li>
  );
};

export default CountryNews;
