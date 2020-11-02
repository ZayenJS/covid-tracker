import React, { FC, useEffect, useState } from 'react';

import { CountryNews as CountryNewsModel } from '../../models';
import CountryNews from './CountryNews/CountryNews';
import { NewsPropsFromRedux } from '../../containers/components/News';

import styles from './News.module.scss';
import Loader from '../Loader/Loader';
import { getPagination } from '../../util';
import Pagination from '../Pagination/Pagination';

const News: FC<NewsPropsFromRedux> = ({ countryNews, pagination, getNewsPage }) => {
  const [paginationElements, setPaginationElements] = useState(getPagination(pagination));

  useEffect(() => {
    const newPagination = getPagination(pagination);
    setPaginationElements(newPagination);
  }, [pagination]);

  return (
    <section className={styles.News}>
      <h1 className={styles.News__Title}>News</h1>
      {countryNews && paginationElements.length ? (
        <div>
          <ul className={styles.News__List}>
            {countryNews.map((news: CountryNewsModel) => (
              <CountryNews key={news.nid} {...news} />
            ))}
          </ul>
          <Pagination
            onPageClick={getNewsPage}
            items={paginationElements}
            pagination={pagination}
          />
        </div>
      ) : (
        <Loader type="BallTriangle" />
      )}
    </section>
  );
};

export default News;
