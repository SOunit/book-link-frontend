import { FC } from 'react';
import { Image } from './image';
import classes from './image-container.module.css';

type ImageContainerProps = {
  src: string;
  alt: string;
};

export const ImageContainer: FC<ImageContainerProps> = (props) => {
  return (
    <div className={classes['image-container']}>
      <Image src={props.src} alt={props.alt} />
    </div>
  );
};
