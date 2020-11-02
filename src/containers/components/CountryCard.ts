import { connect } from 'react-redux';
import { State } from '../../reducers';

import {
  CountryActions,
  selectCountry,
  resetSearch,
  getCountryAdditionalInfos,
  selectGlobalStats,
  GlobalActions,
} from '../../actions';
import { Dispatch } from 'react';
import { Country, GlobalInfo } from '../../models';
import CountryCard from '../../components/CountryCard/CountryCard';

interface StateToProps {
  readonly dates: string[];
  readonly countries: Country[];
  readonly selectedCountry?: Country;
  readonly globalInfo?: GlobalInfo;
  readonly isGlobalLoading: boolean;
  readonly isAdditionalDataLoaded: boolean;
}

interface DispatchToProps {
  selectCountry: (country: Country) => void;
  resetSearch: () => void;
  getCountryAdditionalInfos: (countryCode: string) => void;
  selectGlobalStats: () => void;
}

const mapStateToProps = (state: State): StateToProps => ({
  dates: state.dates,
  countries: state.searchResults,
  selectedCountry: state.selectedCountry,
  globalInfo: state.globalInfo,
  isGlobalLoading: state.isLoading,
  isAdditionalDataLoaded: state.isAdditionalDataLoaded,
});

const mapDispatchToProps = (
  dispatch: Dispatch<CountryActions | GlobalActions>,
): DispatchToProps => ({
  selectCountry: (country: Country) => dispatch(selectCountry(country)),
  resetSearch: () => dispatch(resetSearch()),
  getCountryAdditionalInfos: (countryCode: string) =>
    dispatch(getCountryAdditionalInfos(countryCode)),
  selectGlobalStats: () => dispatch(selectGlobalStats()),
});

export type CountryCardPropsFromRedux = StateToProps & DispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryCard);
