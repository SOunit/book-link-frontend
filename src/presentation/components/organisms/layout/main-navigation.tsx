import { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavShown } from '../../../hooks';
import { isPathMatch } from '../../../util';
import classes from './main-navigation.module.scss';
import { useAuthStorage } from '../../../../services';

type MainNavigationProps = {
  onSideMenuToggle: () => void;
};

const MainNavigation: React.FC<MainNavigationProps> = (props) => {
  const authStorage = useAuthStorage();
  const { isNavShown } = useNavShown();
  const { pathname } = useLocation();

  const headerNav = (
    <nav className={classes['main-header__nav']}>
      <ul className={classes['main-header__nav-items']}>
        <li className={classes['main-header__nav-item']}>
          <NavLink
            to="/search"
            className={`${classes['main-header__nav-link']} ${
              pathname === '/' && classes['main-header__nav-link--active']
            }`}
            activeClassName={classes['main-header__nav-link--active']}>
            Search
          </NavLink>
        </li>
        <li className={classes['main-header__nav-item']}>
          <NavLink
            to="/chats"
            className={classes['main-header__nav-link']}
            activeClassName={classes['main-header__nav-link--active']}>
            Chats
          </NavLink>
        </li>
        <li className={classes['main-header__nav-item']}>
          <NavLink
            to="/home"
            className={`${classes['main-header__nav-link']} ${
              isPathMatch(pathname) && classes['main-header__nav-link--active']
            }`}
            activeClassName={classes['main-header__nav-link--active']}>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );

  const sideNavButton = (
    <div
      className={classes['side-nav-button']}
      onClick={props.onSideMenuToggle}>
      <div className={classes['side-nav-button__bar']}></div>
      <div className={classes['side-nav-button__bar']}></div>
      <div className={classes['side-nav-button__bar']}></div>
    </div>
  );

  return (
    <header className={classes['main-header']}>
      {isNavShown && (
        <Fragment>
          <h1 className={classes['main-header__title']}>
            <NavLink to="/" className={classes['main-header__title-link']}>
              BookLink
            </NavLink>
          </h1>
          {authStorage.isLoggedIn && headerNav}
          {authStorage.isLoggedIn && sideNavButton}
        </Fragment>
      )}
    </header>
  );
};

export default MainNavigation;
