import { useEffect, useState } from "react";
import { $fetch } from "utils/api";

export enum ErrorReason {
  Unauthorized,
  NotFound,
}

export class FetchError extends Error {
  constructor(public reason: ErrorReason) {
    super();
  }
}

const fetchWithError = async (url: string) => {
  const response = await $fetch(url);

  if (response?.status === 401) {
    throw new FetchError(ErrorReason.Unauthorized);
  }

  if (response?.status === 404) {
    throw new FetchError(ErrorReason.NotFound);
  }

  return response?.json();
};

const useFetch = <T>(url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError>();
  const [data, setData] = useState<T>();

  useEffect(() => {
    fetchWithError(url)
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
