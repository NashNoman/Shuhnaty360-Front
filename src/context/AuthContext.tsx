// src/auth/AuthContext.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../../Api";
import { loginUser } from "../api/auth.api";
import { useUserQuery } from "../api/users.api";
import { LoginCredentials, LoginResponse } from "../types";
import {
  getAccessToken,
  getRefreshToken,
  getUserId,
  removeSessionsData,
  setAccessToken,
  setGlobalLogout,
  setRefreshToken,
  setUserId,
} from "../utils/authUtils";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  user: Users | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: LoginResponse }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: Users | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
        userId: action.payload.user.id,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const accessToken = getAccessToken();

const initialState: AuthState = {
  accessToken: accessToken,
  refreshToken: getRefreshToken(),
  userId: getUserId(),
  user: null,
  isAuthenticated: !!accessToken,
  isLoading: false,
  error: null,
};

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  user: Users | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  login: (data: LoginCredentials) => void;
  logout: () => void;
  loginIsLoading: boolean;
  loginError: any;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setUserId(data.user.id.toString());
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      dispatch({
        type: "SET_ERROR",
        payload: error.details || error.message,
      });
      console.error("Login failed:", error);
    },
  });

  const userQuery = useUserQuery(state.userId as number);

  useEffect(() => {
    if (userQuery.data?.data && state.userId) {
      dispatch({
        type: "SET_USER",
        payload: userQuery.data.data,
      });
    } else {
      dispatch({
        type: "SET_USER",
        payload: null,
      });
    }
  }, [state.userId, userQuery.data?.data]);

  const handleLogout = useCallback(() => {
    removeSessionsData();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    queryClient.clear();
  }, [navigate, queryClient]);

  useEffect(() => {
    setGlobalLogout(handleLogout);
  }, [handleLogout]);

  useEffect(() => {
    if (!state.userId) {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authContextValue = useMemo(() => {
    return {
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      userId: state.userId,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading || loginMutation.isPending,
      error: state.error || loginMutation.error,
      login: loginMutation.mutate,
      logout: handleLogout,
      loginIsLoading: loginMutation.isPending,
      loginError: loginMutation.error,
    };
  }, [state, loginMutation, handleLogout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
