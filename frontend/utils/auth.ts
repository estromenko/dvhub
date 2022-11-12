import Cookie from "js-cookie";

import store from "../store";

export const accessTokenKey = "accessToken";
export const refreshTokenKey = "refreshToken";

export const logout = () => {
  store.setUser(undefined);

  Cookie.remove(accessTokenKey);
  Cookie.remove(refreshTokenKey);
};

export const updateTokens = async () => {
  const refreshToken = Cookie.get(refreshTokenKey);

  const response = await fetch("/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response.status === 200) {
    const data = await response.json();
    Cookie.set(accessTokenKey, data.access);
    Cookie.set(refreshTokenKey, data.refresh);
  }
};

export const isAuthorized = () => {
  const accessToken = Cookie.get(accessTokenKey);
  const refreshToken = Cookie.get(refreshTokenKey);

  return store.user && accessToken && refreshToken;
};
