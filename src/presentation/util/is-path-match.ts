import { homeRootPathList } from '../constants';

export const isPathMatch = (pathname: string) => {
  let isMatch = false;
  homeRootPathList.forEach((homeRootPath) => {
    const check = pathname.includes(homeRootPath);
    if (check) {
      isMatch = true;
    }
  });

  return isMatch;
};
