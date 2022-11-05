import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { EXPO_CLIENT_ID } from '@env';

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

type TUser = {
  name: string;
  avatarUrl: string;
  isLoggedIn: boolean;
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

  function applyTokenInApiHeaders(token: string) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  async function getUserData() {
    try {
      const userInfoResponse = await api.get('/me');

      const { user } = userInfoResponse.data;

      setUser({
        ...user,
        isLoggedIn: true,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  const signInWithGoogle = useCallback(async (access_token: string) => {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post('/users', { access_token });

      const { token } = tokenResponse.data;

      applyTokenInApiHeaders(token);

      await getUserData();
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response, signInWithGoogle]);

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
