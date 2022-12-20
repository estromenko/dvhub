import Cookie from "js-cookie";

import store from "../store";

export const accessTokenKey = "accessToken";
export const refreshTokenKey = "refreshToken";

export const logout = () => {
  store.setUser(undefined);

  Cookie.remove(accessTokenKey);
  Cookie.remove(refreshTokenKey);
};

export const setAccessToken = (accessToken: string) => {
  Cookie.set(accessTokenKey, accessToken, {
    expires: new Date().getDate() + 5 * 60000, // 5 minutes
  });
};

export const setRefreshToken = (refreshToken: string) => {
  Cookie.set(refreshTokenKey, refreshToken, {
    expires: 1, // 1 day
  });
};

export const updateTokens = async () => {
  const refreshToken = Cookie.get(refreshTokenKey);

  const response = await fetch("/api/auth/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response.status === 200) {
    const data = await response.json();
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
  }
};

export const isAuthorized = () => {
  const accessToken = Cookie.get(accessTokenKey);
  const refreshToken = Cookie.get(refreshTokenKey);

  return store.user && accessToken && refreshToken;
};
