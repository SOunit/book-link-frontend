import { FC } from 'react';
import classes from './image.module.css';

type ImageProps = {
  src: string;
  alt: string;
};

export const Image: FC<ImageProps> = (props) => {
  return <img src={props.src} alt={props.alt} className={classes.image} />;
};
