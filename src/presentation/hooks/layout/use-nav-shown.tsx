import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useNavShown = () => {
  const [isNavShown, setIsNavShown] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const reg = /chats\/\.*/;
    const match = reg.test(location.pathname);
    match ? setIsNavShown(false) : setIsNavShown(true);
  }, [location.pathname]);

  return { isNavShown };
};
