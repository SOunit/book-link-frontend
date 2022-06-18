import { FC } from 'react';
import classes from './section-title.module.scss';

export const SectionTitle: FC = (props) => {
  return <h2 className={classes['section-title']}>{props.children}</h2>;
};
