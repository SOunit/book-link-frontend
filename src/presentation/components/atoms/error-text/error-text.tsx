import { FC } from 'react';
import classes from './error-text.module.scss';

type Props = {
  errorMessage: string;
};

export const ErrorText: FC<Props> = ({ errorMessage }) => {
  return <p className={classes['error-message']}>{errorMessage}</p>;
};
