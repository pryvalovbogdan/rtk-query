import React from 'react';

import { useAppDispatch } from '../../app/store';
import { api } from '../../app/services/api';
import { useGetPostsQuery } from '../../app/services/postsApi';
import { actionGetUsers } from '../../app/actions';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading } = useGetPostsQuery(null);
  // posts are read-only

  // To mutate query manually use dispatch api.util.updateQueryData
  const handleAddPost = () => {
    dispatch(
      api.util.updateQueryData(
        'getPosts' as never,
        // For fetchBaseQuery use undefined for axiosBaseQuery use null
        null as never,
        (draftPosts: Array<{ id: number; title: string; body: string }> = []) => {
          return [...draftPosts, { id: Date.now(), title: 'New Post', body: 'This is a new post.' }];
        },
      ),
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => dispatch(actionGetUsers(''))}>Add Post</button>
      <ul>
        {posts &&
          [...posts]?.reverse().map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Posts;
