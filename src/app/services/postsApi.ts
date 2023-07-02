import { api } from './api';

export const postsApi = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<Array<{ id: number; title: string; body: string }>, void>({
      query: () => ({ url: 'https://jsonplaceholder.typicode.com/posts' }),
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
