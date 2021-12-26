import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

const GoogleAuth = () => {
  const { signIn, signOut } = useActions();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const auth = useRef(null);

  const onAuthChange = useCallback(
    (isSignedIn) => {
      if (isSignedIn) {
        signIn(auth.current.currentUser.get().getId());
      } else {
        signOut();
      }
    },
    [signOut, signIn]
  );

  useEffect(() => {
    let isSubscribed = true;
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '731771929516-054g4jbs4dbr2gaqgm88ng8qdr7pl783.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          if (isSubscribed) {
            auth.current = window.gapi.auth2.getAuthInstance();
            onAuthChange(auth.current.isSignedIn.get());
            auth.current.isSignedIn.listen(onAuthChange);
          }
        });
    });
    return () => (isSubscribed = false);
  }, [onAuthChange]);

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  return (
    <div>
      {isSignedIn && (
        <button onClick={onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      )}
      {!isSignedIn && (
        <button onClick={onSignInClick} className='ui red google button'>
          <i className='google icon' /> Sign In With Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
