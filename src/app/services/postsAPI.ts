import { api } from './api';

export const postsAPI = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<Array<{ id: number; title: string; body: string }>, void>({
      query: () => 'https://jsonplaceholder.typicode.com/posts',
    }),
  }),
});

export const { useGetPostsQuery } = postsAPI;
