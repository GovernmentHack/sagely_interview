import { useState, useEffect } from "react";
import axios, { Method, RawAxiosRequestHeaders, AxiosResponse } from "axios";

interface UseAxiosParameters<D> {
  url: string;
  method: Method;
  body?: D;
  headers?: RawAxiosRequestHeaders;
  params?: any;
}

export const useAxios = <RequestData, ResponseData>({
  url,
  method,
  body,
  headers,
  params,
}: UseAxiosParameters<RequestData>) => {
  const [response, setResponse] = useState<ResponseData>({} as ResponseData);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios<ResponseData, AxiosResponse<ResponseData>, RequestData>(url, {
      method,
      headers,
      data: body,
      baseURL: process.env.REACT_APP_SERVER_URL,
      params,
    })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [body, params]);

  return { response, error, loading };
};
