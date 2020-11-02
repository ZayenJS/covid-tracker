import { connect } from 'react-redux';
import { GlobalActions, inputChange } from '../../actions';
import { State } from '../../reducers';

import Field from '../../components/Field/Field';
import { Dispatch } from 'react';

interface OwnProps {
  type?: string;
  placeholder?: string;
  reducerName?: string;
  name: string;
  value?: string;
  cssClass?: string;
  autofocus?: boolean;
}

interface StateToProps {
  value?: string;
}

interface DispatchToProps {
  changeValue: (value: string) => void;
}

const mapStateToProps = (state: State & any, ownProps: OwnProps): StateToProps => {
  if (!ownProps.value) {
    return {
      value: state[ownProps.name],
    };
  }
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<GlobalActions>,
  ownProps: OwnProps,
): DispatchToProps => ({
  changeValue: (value: string) => dispatch(inputChange(ownProps.name, value)),
});

export type FieldPropsFromRedux = StateToProps & DispatchToProps & OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(Field);
