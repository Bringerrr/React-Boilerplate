// @flow

import axios from "axios";
import applyConverters from "axios-case-converter";
import loadToken from "./load-token";

type Method = "POST" | "GET" | "DELETE" | "PUT";

export type Headers = { [name: string]: string };

type Request = {
  method: Method,
  url: string,
  query?: any,
  data?: any,
  headers?: Headers
};

type CallFn = <TResponse>(request: Request) => Promise<TResponse>;
type FetchFn = <TResponse>(
  url: string,
  query?: any,
  headers?: { [name: string]: string }
) => Promise<TResponse>;
type SendFn = <TResponse>(
  url: string,
  data?: any,
  query?: any,
  headers?: { [name: string]: string }
) => Promise<TResponse>;
type PrepareHeadersFn = (headers: ?Headers) => Headers;

const client = applyConverters(axios);

const prepareHeaders: PrepareHeadersFn = headers => {
  const token = loadToken();
  const tokenHeaders = token ? { token } : {};

  if (!headers) {
    return tokenHeaders;
  }

  return {
    ...headers,
    ...tokenHeaders
  };
};

const call: CallFn = request =>
  client
    .request<typeof request.data>({
      method: request.method,
      url: request.url,
      params: request.query,
      headers: prepareHeaders(request.headers),
      data: request.data
    })
    .then(response => response.data);

export const get: FetchFn = <TResponse>(url, query, headers) =>
  call<TResponse>({
    method: "GET",
    url,
    query,
    headers
  });

export const post: SendFn = <TResponse>(url, data, query) =>
  call<TResponse>({
    method: "POST",
    url,
    data,
    query
  });

export const put: SendFn = <TResponse>(url, data, query) =>
  call<TResponse>({
    method: "PUT",
    url,
    data,
    query
  });

export const del: SendFn = <TResponse>(url, data, query) =>
  call<TResponse>({
    method: "DELETE",
    url,
    data,
    query
  });
