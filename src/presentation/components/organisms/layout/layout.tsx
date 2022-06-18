import { Fragment, useState } from 'react';
import MainNavigation from './main-navigation';
import SideNavigation from './side-navigation';
import FooterNav from './footer-nav';
import { Backdrop } from '../../molecules';
import classes from './layout.module.css';
import { useAuthStorage } from '../../../../services';

export const Layout: React.FC = (props) => {
  const authStorage = useAuthStorage();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const sideMenuToggleHandler = () => {
    setIsSideMenuOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <Fragment>
      <MainNavigation onSideMenuToggle={sideMenuToggleHandler} />
      {isSideMenuOpen && <Backdrop onSideMenuToggle={sideMenuToggleHandler} />}
      <SideNavigation
        onSideMenuToggle={sideMenuToggleHandler}
        className={isSideMenuOpen ? classes['side-navigation--active'] : ''}
      />
      <main className={classes.main}>{props.children}</main>
      {authStorage.isLoggedIn && <FooterNav />}
    </Fragment>
  );
};
