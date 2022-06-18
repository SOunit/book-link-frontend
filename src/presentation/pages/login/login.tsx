import { FC } from 'react';
import { ImageSlider } from '../../components/molecules';
import { DemoAuth, GoogleAuth } from '../../components/organisms';
import classes from './login.module.css';

export const Login: FC = () => {
  return (
    <section className={classes.login}>
      <div className={classes['slider-wrapper']}>
        <ImageSlider />
      </div>
      <GoogleAuth className={classes['google-auth-button']} />
      <DemoAuth className={classes['demo-auth-button']} />
    </section>
  );
};
