import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: build => ({
    getUsers: build.query<any, number>({
      query: size => `https://random-data-api.com/api/users/random_user?size=${size}`,
      providesTags: (_result, _err, id) => [{ type: 'Posts', id }],
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData },
      ) {
        console.log('getState', getState());
      },
      transformErrorResponse: (response: { status: string | number }, meta, arg) => response,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

export const {
  endpoints: { getUsers },
} = usersApi;

export default usersApi;
