import { NavLink, useLocation } from 'react-router-dom';
import { isPathMatch } from '../../../util';
import classes from './side-navigation.module.scss';

type Props = { onSideMenuToggle: () => void; className: string };

const SideNavigation: React.FC<Props> = ({ onSideMenuToggle, className }) => {
  const { pathname } = useLocation();

  return (
    <div className={`${classes['side-navigation']} ${className}`}>
      <nav className={classes['side-navigation__nav']}>
        <ul className={classes['side-navigation__items']}>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to="/search"
              className={`${classes['side-navigation__link']} ${
                '/' === pathname && classes['side-navigation__link--active']
              }`}
              activeClassName={classes['side-navigation__link--active']}
              onClick={onSideMenuToggle}>
              Search
            </NavLink>
          </li>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to="/chats"
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={onSideMenuToggle}>
              Chats
            </NavLink>
          </li>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to="/home"
              className={`${classes['side-navigation__link']} ${
                isPathMatch(pathname) &&
                classes['side-navigation__link--active']
              }`}
              activeClassName={classes['side-navigation__link--active']}
              onClick={onSideMenuToggle}>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
