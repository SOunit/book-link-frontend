import { FC } from 'react';
import Slider from 'react-slick';
import classes from './image-slider.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SliderCard } from '..';

type Props = {};

export const ImageSlider: FC<Props> = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <Slider {...settings} className={classes['slider']}>
      <SliderCard
        icon={faBook}
        title="Find Books"
        text="What are your friends reading?"
      />
      <SliderCard
        icon={faUsers}
        title="Find Friends"
        text="Friends with common interests."
      />
      <SliderCard
        icon={faCommentAlt}
        title="Chat with Friends"
        text="Message people directly."
      />
    </Slider>
  );
};
