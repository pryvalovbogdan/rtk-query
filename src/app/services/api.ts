import { createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

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


const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
    async ({ url, method = 'GET', data, params }) => {

      console.log('vase url', url, baseUrl)
      try {
        const result = await axios({ url: baseUrl + url, method, data, params })
        return { data: result.data }
      } catch (axiosError) {
        let err = axiosError as AxiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'api',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQuery,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */

  /** An array of string tag type names. Specifying tag types is optional, but you should define them so that they can be used for caching and invalidation.
   *   When defining a tag type, you will be able to provide them with providesTags and invalidate them with invalidatesTags when configuring endpoints.
   */
  tagTypes: [],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => 'test',
  }),
});
