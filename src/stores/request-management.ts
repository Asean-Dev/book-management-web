import { api } from "@/stores/api";

interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, unknown> | FormData;
  params?: Record<string, unknown>;
  responseType?: "json" | "blob";
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export const method_GET = async <T>(
  config: RequestConfig
): Promise<ApiResponse<T>> => {
  return api.get(config.url, {
    headers: config.headers,
    params: config.params,
    responseType: config.responseType,
  });
};

export const method_POST = async <T>(
  config: RequestConfig
): Promise<ApiResponse<T>> => {
  return api.post(config.url, config.data, {
    headers: config.headers,
    params: config.params,
  });
};

export const method_PUT = async <T>(
  config: RequestConfig
): Promise<ApiResponse<T>> => {
  return api.put(config.url, config.data, {
    headers: config.headers,
    params: config.params,
  });
};

export const method_DELETE = async <T>(
  config: RequestConfig
): Promise<ApiResponse<T>> => {
  return api.delete(config.url, {
    headers: config.headers,
    params: config.params,
    data: config.data,
  });
};
