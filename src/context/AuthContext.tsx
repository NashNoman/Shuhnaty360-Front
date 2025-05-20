// src/auth/AuthContext.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { LoginCredentials, LoginResponse } from "../types";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAccessToken,
  setGlobalLogout,
  setRefreshToken,
} from "../utils/authUtils";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: LoginResponse }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
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
  isAuthenticated: !!accessToken,
  isLoading: false,
  error: null,
};

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  login: (data: LoginCredentials) => void;
  logout: () => void;
  loginIsLoading: boolean;
  loginError: any;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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

  const handleLogout = () => {
    removeTokens();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    queryClient.clear();
  };

  useEffect(() => {
    setGlobalLogout(handleLogout);
  }, []);

  const authContextValue = useMemo(
    () => ({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading || loginMutation.isPending,
      error: state.error || loginMutation.error,
      login: loginMutation.mutate,
      logout: handleLogout,
      loginIsLoading: loginMutation.isPending,
      loginError: loginMutation.error,
    }),
    [state, loginMutation]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
