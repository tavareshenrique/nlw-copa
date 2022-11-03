import { createContext, ReactNode } from 'react';

type TUser = {
  name: string;
  avatarUrl: string;
};

export interface IAuthContextDataProps {
  user: TUser;
  signIn: () => Promise<void>;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  async function signIn() {
    console.log('Vamos Logar');
  }

  return (
    <AuthContext.Provider
      value={{
        user: {
          name: 'John Doe',
          avatarUrl: 'https://github.com/tavareshenrique.png',
        },
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
