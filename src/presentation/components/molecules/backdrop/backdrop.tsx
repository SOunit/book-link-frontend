import classes from './backdrop.module.css';

export const Backdrop: React.FC<{ onSideMenuToggle: () => void }> = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onSideMenuToggle}></div>
  );
};
