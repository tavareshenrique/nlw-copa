import { useContext } from 'react';

import { AuthContext, IAuthContextDataProps } from '../context/AuthContext';

export function useAuth(): IAuthContextDataProps {
  const context = useContext(AuthContext);

  return context;
}
