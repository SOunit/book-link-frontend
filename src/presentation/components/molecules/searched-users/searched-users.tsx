import { FC, Fragment } from 'react';
import { User } from '../../../../domain';
import { useHistory } from 'react-router-dom';
import classes from './searched-users.module.css';
import { Buttons, UserCard } from '..';
import { IconButton } from '../../atoms';
import {
  faInfo,
  faUserPlus,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
  users: User[];
  loginUser: User;
  onFollowClick: any;
  onFollowingClick: any;
};

export const SearchedUsers: FC<Props> = ({
  users,
  onFollowClick,
  onFollowingClick,
}) => {
  const history = useHistory();

  const detailClickHandler = (user: User) => {
    history.push(`/users/${user.id}`);
  };

  const followClickHandler = (user: User) => {
    if (user.isFollowing) {
      onFollowingClick(user);
    } else {
      onFollowClick(user);
    }
  };

  return (
    <Fragment>
      {users.map((user) => {
        const actions = (
          <Buttons>
            <IconButton
              icon={faInfo}
              onClick={() => detailClickHandler(user)}
              className={classes['action-icon']}
            />
            <IconButton
              icon={user.isFollowing ? faUserMinus : faUserPlus}
              onClick={() => followClickHandler(user)}
            />
          </Buttons>
        );

        return <UserCard key={user.id} user={user} actions={actions} />;
      })}
    </Fragment>
  );
};
