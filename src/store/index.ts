import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';
import { country, global } from '../middlewares';

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

const composeEnhancers = composeWithDevTools({ trace: true });
const enhancers = composeEnhancers(applyMiddleware(country, global));

const store = createStore(rootReducer, enhancers);

export default store;
