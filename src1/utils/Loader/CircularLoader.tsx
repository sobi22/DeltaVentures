import React from 'react';
import LoaderBase, { Props as LoaderBaseProps } from './LoaderBase';
import { CircularProgress, CircularProgressProps } from '@mui/material';

export interface Props extends LoaderBaseProps {
  loaderProps?: CircularProgressProps;
}

const CircularLoader: React.FC<Props> = ({ loaderProps = {}, ...props }: Props) => {
  return (
    <LoaderBase {...props}>
      <CircularProgress {...loaderProps} />
    </LoaderBase>
  );
};

CircularLoader.defaultProps = {
  style: {},
};

export default CircularLoader;
