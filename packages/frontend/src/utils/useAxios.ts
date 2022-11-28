import { useState, useEffect } from 'react';
import axios, { Method, RawAxiosRequestHeaders, AxiosResponse } from 'axios';

interface UseAxiosParameters<D> { url: string; method: Method; body?: D; headers?: RawAxiosRequestHeaders }

const useAxios = <RequestData, ResponseData>({ url, method, body, headers }: UseAxiosParameters<RequestData>) => {
  const [response, setResponse] = useState<ResponseData>({} as ResponseData);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios<ResponseData, AxiosResponse<ResponseData>, RequestData>(url, {
      method,
      headers,
      data: body,
      baseURL: process.env.REACT_APP_SERVER_URL,
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
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxios;