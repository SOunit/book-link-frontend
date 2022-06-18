import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FC, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticate } from '../../../../application';
import classes from './google-auth.module.css';

type Props = {
  className?: string;
};

export const GoogleAuth: FC<Props> = ({ className }) => {
  const { authenticate } = useAuthenticate();
  const history = useHistory();

  const clickHandler = () => {
    authenticate();
    history.push('/');
  };

  return (
    <Fragment>
      <button
        className={`${classes['google-button']} ${className}`}
        onClick={clickHandler}>
        <FontAwesomeIcon
          className={classes['google-button__icon']}
          icon={faUserCheck}
        />
        <p>Sign in with Google</p>
      </button>
    </Fragment>
  );
};
