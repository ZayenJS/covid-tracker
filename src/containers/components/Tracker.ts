import { connect } from 'react-redux';
import { Dispatch } from 'react';

import Tracker from '../../components/Tracker/Tracker';

import { State } from '../../reducers';

import { CountryActions, getCountries, getGlobalData, GlobalActions } from '../../actions';
import { GlobalInfo } from '../../models';

interface StateToProps {}

interface DispatchToProps {
  getCountries: () => void;
  getGlobalData: (data?: GlobalInfo) => void;
}

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch<CountryActions | GlobalActions>) => ({
  getCountries: () => dispatch(getCountries()),
  getGlobalData: (data?: GlobalInfo) => dispatch(getGlobalData(data)),
});

export type TrackerPropsFromRedux = StateToProps & DispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
