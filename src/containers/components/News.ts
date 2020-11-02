import { Dispatch } from 'react';
import { connect } from 'react-redux';

import News from '../../components/News/News';
import { CountryActions, getNewsPage } from '../../actions';
import { State } from '../../reducers';
import { CountryNews, Pagination } from '../../models';

interface StateToProps {
  countryNews?: CountryNews[];
  pagination: Pagination;
}

interface DispatchToProps {
  getNewsPage: (pageNumber: number) => void;
}

const mapStateToProps = (state: State): StateToProps => ({
  countryNews: state?.selectedCountry?.news ?? undefined,
  pagination: state.pagination,
});

const mapDispatchToProps = (dispatch: Dispatch<CountryActions>): DispatchToProps => ({
  getNewsPage: (pageNumber: number) => dispatch(getNewsPage(pageNumber)),
});

export type NewsPropsFromRedux = StateToProps & DispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(News);
