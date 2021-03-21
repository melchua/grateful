import React, { useState } from 'react';

const CurrentUserContext = React.createContext([{}, () => {}]);

type PropType = {
  // eslint-disable-next-line
  children: JSX.Element;
};

const CurrentUserProvider = ({ children }: PropType) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
