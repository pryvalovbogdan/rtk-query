// App.tsx
import React, { useEffect } from 'react';

import { useAppDispatch } from '../../app/store';
import { api } from '../../app/services/api';
import { useGetPostsQuery } from '../../app/services/postsAPI';
import { actionGetUsers } from '../../app/actions';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading } = useGetPostsQuery();
  // posts are read-only
  const handleAddPost = () => {
    dispatch(
      api.util.updateQueryData('getPosts' as never, undefined as never, (draftPosts = [] as never) => {
        return [...draftPosts, { id: Date.now(), title: 'New Post', body: 'This is a new post.' }];
      }),
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
