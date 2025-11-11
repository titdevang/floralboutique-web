import Axios, { AxiosRequestConfig } from "axios";
import { axiosRequestHandler } from "./axios";
import { RequestMethod } from "../types/ApiRequest";
import Cookies from "js-cookie";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api',
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiRequest = async <T>(
  method: RequestMethod,
  url: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
) => {
  const isPdfRequest = config?.headers?.Accept === "application/pdf";
  const axiosConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
      ...(method === "GET" ? { "edge-cache": true } : {}),
    },
    ...(isPdfRequest ? { responseType: "blob" as const } : {}),
  };

  return await axiosRequestHandler<T>(
    axiosInstance,
    method,
    url,
    data,
    axiosConfig
  );
};
