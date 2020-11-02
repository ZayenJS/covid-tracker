import { connect } from 'react-redux';
import { GlobalActions } from '../../actions';
import { State } from '../../reducers';

import GlobalInfos from '../../components/GlobalInfos/GlobalInfos';
import { Dispatch } from 'react';
import { GlobalInfo } from '../../models';

interface StateToProps {
  infos?: GlobalInfo;
}

interface DispatchToProps {}

const mapStateToProps = (state: State): StateToProps => ({
  infos: state.globalInfo,
});

const mapDispatchToProps = (dispatch: Dispatch<GlobalActions>): DispatchToProps => ({});

export type GlobalInfosPropsFromRedux = StateToProps & DispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GlobalInfos);
