let globalLogout: (() => void) | null = null;
export const setGlobalLogout = (fn: () => void) => {
  globalLogout = fn;
};

export const callGlobalLogout = () => {
  if (globalLogout) globalLogout();
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", token);
};

export const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
