import { FC } from 'react';
import { Buttons } from '../../molecules';
import { useHistory } from 'react-router-dom';
import { Button } from '../../atoms';
import { useAuthenticate } from '../../../../application';

type Props = {
  className: string;
};

export const DemoAuth: FC<Props> = ({ className }) => {
  const { demoAuth } = useAuthenticate();
  const history = useHistory();

  const playButtonClickHandler = () => {
    demoAuth();
    history.push('/');
  };

  return (
    <Buttons className={className}>
      <Button title="Play around" onClick={playButtonClickHandler} />
    </Buttons>
  );
};
