import { keys } from '../presentation/util';
import { gapi } from 'gapi-script';

export const useAuth = () => {
  const authenticate = (): Promise<string | null> => {
    if (!gapi) {
      return new Promise(() => {});
    }

    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            clientId: keys.GOOGLE_CLIENT_ID,
            scope: 'email',
          })
          .then(() => {
            const googleAuth = gapi.auth2.getAuthInstance();

            googleAuth.signIn().then(() => {
              const loginId = googleAuth.currentUser.get().getId();
              resolve(loginId);
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  };

  const logout = (): void => {
    if (!gapi) {
      return;
    }

    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          clientId: keys.GOOGLE_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          gapi.auth2.getAuthInstance().signOut();
        })
        .catch((err) => {
          console.log('use-google-auth', err);
        });
    });
  };

  return {
    auth: authenticate,
    logout,
  };
};
