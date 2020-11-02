import { connect } from 'react-redux';
import { State } from '../../reducers';

import { CountryActions, getCountryAdditionalInfos, GlobalActions } from '../../actions';
import { Dispatch } from 'react';
import { Country } from '../../models';
import CountryDetails from '../../components/CountryDetails/CountryDetails';
import { RouteComponentProps } from 'react-router-dom';
import { getCountryFromSlug } from '../../selectors';

interface StateToProps {
  readonly country?: Country;
  readonly dates: string[];
  readonly isAdditionalDataLoaded: boolean;
}

interface ownProps extends RouteComponentProps {
  match: {
    isExact: boolean;
    path: string;
    url: string;
    params: { slug: string };
  };
}

interface DispatchToProps {
  getCountryAdditionalInfos: (countryCode: string, data?: any[]) => void;
}

const mapStateToProps = (state: State, ownProps: ownProps): StateToProps => ({
  country: getCountryFromSlug(state.countryList, ownProps.match.params.slug),
  dates: state.dates,
  isAdditionalDataLoaded: state.isAdditionalDataLoaded,
});

const mapDispatchToProps = (
  dispatch: Dispatch<CountryActions | GlobalActions>,
): DispatchToProps => ({
  getCountryAdditionalInfos: (countryCode: string, data?: any[]) =>
    dispatch(getCountryAdditionalInfos(countryCode, data)),
});

export type CountryDetailsPropsFromRedux = StateToProps & DispatchToProps & ownProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails);
