import React, { FC } from 'react';
import Spinner from 'react-loader-spinner';
import Backdrop from './Backdrop/Backdrop';

import styles from './Loader.module.scss';

type SpinnerType =
  | 'Audio'
  | 'BallTriangle'
  | 'Bars'
  | 'Circles'
  | 'Grid'
  | 'Hearts'
  | 'Oval'
  | 'Puff'
  | 'Rings'
  | 'TailSpin'
  | 'ThreeDots'
  | 'Watch'
  | 'RevolvingDot'
  | 'Triangle'
  | 'Plane'
  | 'MutatingDots'
  | 'None'
  | 'NotSpecified'
  | undefined;

interface LoaderProps {
  type?: SpinnerType;
  height?: number;
  width?: number;
  color?: string;
  visible?: boolean;
  timeout?: number;
  key?: any;
  backdrop?: boolean;
}

const Loader: FC<LoaderProps> = ({
  color,
  height,
  key,
  timeout,
  type,
  visible,
  width,
  backdrop = false,
}) => (
  <>
    {backdrop ? <Backdrop /> : null}
    <div className={backdrop ? styles.Loader : ''}>
      <Spinner
        type={type}
        height={height}
        width={width}
        key={key}
        timeout={timeout}
        visible={visible}
        color={color}
      />
    </div>
  </>
);

export default Loader;
