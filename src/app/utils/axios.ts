import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestMethod } from "../types/ApiRequest";

export const axiosRequestHandler = async <T>(
  axiosInstance: AxiosInstance,
  method: RequestMethod,
  url: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T> | undefined> => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config,
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      return error.response;
    } else {
      console.error("Network or unexpected error:", error);
      return undefined;
    }
  }
};
