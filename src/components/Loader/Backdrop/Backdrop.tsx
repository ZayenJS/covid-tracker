import React, { FC } from 'react';
import styles from './Backdrop.module.scss';

interface BackdropProps {
  hasBeenClicked?: boolean;
}

const Backdrop: FC<BackdropProps> = ({ hasBeenClicked = false }) =>
  !hasBeenClicked ? <div className={styles.Backdrop}></div> : null;

export default Backdrop;
