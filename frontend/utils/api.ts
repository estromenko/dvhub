import Cookie from "js-cookie";

import { accessTokenKey, updateTokens } from "./auth";

const getCookie = (name: string) => {
  const regexp = new RegExp(`${name}=[^;]+`);
  const cookies = regexp.exec(document.cookie);
  const cookie = cookies ? cookies.toString().replace(/^[^=]+./, "") : "";

  return decodeURIComponent(cookie);
};

export const $fetch = async (url: string, init?: RequestInit): Promise<Response | undefined> => {
  const makeRequest = async () => {
    const accessToken = Cookie.get(accessTokenKey);

    return fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
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
