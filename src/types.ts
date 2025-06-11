import { UrlString } from "./util.types";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
  };
};

export type RefreshTokenResponse = {
  access: string;
};

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type ApiListResponse<T> = {
  status: string;
  message: string;
  data: {
    count: number;
    next: UrlString | null;
    previous: UrlString | null;
    results: T[];
  };
};
