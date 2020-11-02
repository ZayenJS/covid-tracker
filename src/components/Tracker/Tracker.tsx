import React, { FC, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { TrackerPropsFromRedux } from '../../containers/components/Tracker';

import Layout from '../Layout/Layout';
import Home from '../../containers/components/Home';
import Credits from '../Credits/Credits';
import CountryDetails from '../../containers/components/CountryDetails';

const Tracker: FC<TrackerPropsFromRedux> = ({ getCountries, getGlobalData }) => {
  useEffect(() => {
    getCountries();
    getGlobalData();
  }, [getCountries, getGlobalData]);

  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/infos/:slug" component={CountryDetails} />
          <Route path="/credits" component={Credits} />
          <Route path="/en-savoir-plus-sur-le-covid">
            <iframe
              src="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              style={{ width: '100%', minHeight: '100%', background: '#fff' }}
              title="site de l'oms"></iframe>
          </Route>
          <Route>404</Route>
        </Switch>
      </Layout>
    </>
  );
};

export default Tracker;
