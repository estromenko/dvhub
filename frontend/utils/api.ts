import Cookie from "js-cookie";

import { accessTokenKey, updateTokens } from "./auth";

export const $fetch = async (
  url: string,
  init?: RequestInit,
): Promise<Response | undefined> => {
  const makeRequest = async () => {
    const accessToken = Cookie.get(accessTokenKey);

    return fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  };

  const response = await makeRequest();

  if (response.status === 401) {
    await updateTokens();
    return makeRequest();
  }

  return response;
};
