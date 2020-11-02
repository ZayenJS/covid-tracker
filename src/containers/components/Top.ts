import { connect } from 'react-redux';
import { State } from '../../reducers';

import { CountryActions, selectCountry } from '../../actions';
import { Dispatch } from 'react';
import { Country } from '../../models';
import Top from '../../components/Top/Top';

interface StateToProps {
  countries: Country[];
  selectedCountry?: Country;
}

interface DispatchToProps {
  selectCountry: (country: Country) => void;
}

const mapStateToProps = (state: State): StateToProps => ({
  countries: [...state.countryList],
  selectedCountry: state.selectedCountry,
});

const mapDispatchToProps = (dispatch: Dispatch<CountryActions>): DispatchToProps => ({
  selectCountry: (country: Country) => dispatch(selectCountry(country)),
});

export type TopPropsFromRedux = StateToProps & DispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Top);
