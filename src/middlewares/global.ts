import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import axios from 'axios';

import { apiUrl, slugify } from '../util';

import { GET_GLOBAL_DATA, GlobalActions, hasError } from '../actions';
import { GlobalInfo } from '../models';

export const global = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (
  action: GlobalActions,
) => {
  switch (action.type) {
    case GET_GLOBAL_DATA:
      try {
        const globalData = await axios.get(`${apiUrl}/v3/stats/worldometer/global`);
        action.data = { ...action.data, ...globalData.data } as GlobalInfo;

        const globalTrend = await axios.get(
          `${apiUrl}/v3/stats/worldometer/totalTrendingCases?limit=30`,
        );

        action.data = { ...action.data, timeline: globalTrend.data.reverse() } as GlobalInfo;
        action.data.emoji = '🌐';
        action.data.country = 'Global';
        action.data.slug = slugify('Global');

        next(action);
      } catch (err) {
        store.dispatch(hasError(err));
      }
      break;
    default:
      next(action);
  }
};
