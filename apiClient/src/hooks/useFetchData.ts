import { useEffect, useState } from "react";
import { useToken } from "./useToken";
const baseurl = "http://localhost:3000/api/v1/";

export default function useFetchData<T>(endpoint: string) {
  const { token } = useToken();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  function getData(endpoint: string) {
    setIsLoading(true);
    fetch(`${baseurl}${endpoint}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        if ("results" in res) {
          setData(res);
        } else {
          setData(res);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getData(endpoint);
  }, [endpoint]);

  return { data, isLoading, error, getData };
}
