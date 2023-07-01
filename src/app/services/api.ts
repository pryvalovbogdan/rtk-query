import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  // prepareHeaders: (headers, { getState }) => {
  //   // By default, if we have a token in the store, let's use that for authenticated requests
  //   const token = (getState() as RootState).auth.token
  //   if (token) {
  //     headers.set('authentication', `Bearer ${token}`)
  //   }
  //   return headers
  // },
});

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
