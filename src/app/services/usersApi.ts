import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: build => ({
    getUsers: build.query<any, number>({
      query: size => ({ url: `https://random-data-api.com/api/users/random_user?size=${size}` }),
      providesTags: [{ type: 'Users' as never }],
      async onQueryStarted(arg, { getState }) {
        console.log('getState', getState());
      },
      transformErrorResponse: (response: { status: string | number }) => response,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

export const {
  endpoints: { getUsers },
} = usersApi;

export default usersApi;
