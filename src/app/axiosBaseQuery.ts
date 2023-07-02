import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json, text/javascript, */*; q=0.01';

axios.interceptors.response.use(
  response => (response && response.data ? response.data : response),
  error => {
    // Redirect when user is not authorised
    if (error.response.status === 401) {
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }> =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });

      // Always need to pass result as "data" prop otherwise response will be undefiled
      return { data: result };
    } catch (axiosError) {
      let err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
