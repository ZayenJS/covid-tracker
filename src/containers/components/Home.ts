import { connect } from 'react-redux';
import { GlobalActions } from '../../actions';
import { State } from '../../reducers';

import Home from '../../components/Home/Home';
import { Dispatch } from 'react';
import { GlobalInfo } from '../../models';

interface StateToProps {
  globalInfos?: GlobalInfo;
  dates: string[];
}

interface DispatchToProps {}

const mapStateToProps = (state: State): StateToProps => ({
  globalInfos: state.globalInfo,
  dates: state.dates,
});

const mapDispatchToProps = (dispatch: Dispatch<GlobalActions>): DispatchToProps => ({});

export type HomePropsFromRedux = StateToProps & DispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
