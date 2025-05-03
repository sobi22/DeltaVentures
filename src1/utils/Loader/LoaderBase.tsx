import React from 'react';
import cx from 'classnames';
import styles from './LoaderBase.module.css';
import { Typography } from '@mui/material';

export interface Props {
  children?: React.ReactChild;
  style: object;
  className?: string;
  text?: string;
}

const LoaderBase: React.FC<Props> = (props: Props) => (
  <div style={props.style} className={cx(styles.loader, props.className)} data-testid="loader">
    <div className={styles.contentWrapper}>
      <div>{props.children}</div>
      {props.text ? <Typography variant="body1">{props.text}</Typography> : null}
    </div>
  </div>
);

LoaderBase.defaultProps = {
  style: {},
};

export default LoaderBase;
