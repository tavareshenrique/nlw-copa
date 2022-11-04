import { createContext, ReactNode, useState, useEffect } from 'react';

import { EXPO_CLIENT_ID } from '@env';

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

type TUser = {
  name: string;
  avatarUrl: string;
};

export interface IAuthContextDataProps {
  user: TUser;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  function signInWithGoogle(access_token: string) {
    console.log('TOKEN DE AUTH =>', access_token);

    // const response = await fetch(
    //   `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    // );

    // const userInfo = await response.json();

    // setUser({
    //   name: userInfo.name,
    //   avatarUrl: userInfo.picture,
    // });
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
