# rtk-query

Redux Toolkit Query Usage Example

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)
![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&style=flat)
![RTK Query](https://img.shields.io/badge/-RTK%20Query-764ABC?logo=redux&logoColor=white&style=flat)
![Redux Saga](https://img.shields.io/badge/-Redux%20Saga-89D96D?logo=redux-saga&logoColor=white&style=flat)


## Installation:

```bash
npm install
```

## Usage:
Client:
```bash
npm run dev
```
Server:
```bash
npm run server
```

## Behavior:

For adding websocket/socket.io you can use `api.injectEndpoints` with empty data for `queryFn`:

[WsApi File Example](src/app/services/wsApi.ts)
```javascript
export const wsApi = api.injectEndpoints({
  endpoints: build => ({
	subscribeToEvents: build.query<any, void>({
	queryFn: () => ({ data: [] }),
	async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved, getState, getCacheEntry }) {
	  const socket = io('http://localhost:8000');

	  socket.on('disconnect', reason => {
        console.log('reason', reason);
      });

      socket.on('connect', function () {
        console.log('connected!');

        socket.on('message', function (message) {
          console.log('message!', message);
          console.log('getState socket', getState(), getCacheEntry());

          actionTypeHandle(message, dispatch);
    /** You can dispath action directly to reducer slice or to saga **/
          dispatch(actionSetUsers(message.data));
          dispatch(actionGetUsers(message));
        });
	  });

      await cacheEntryRemoved;
      socket.close();
      },
    }),
  }),
});
```


For updating reducer state after rtk query was fullfilled you can add `extraReducers` to your slise with  `endpoint.matchFulfilled,`:

[UserApi File Example](src/app/services/usersApi.ts)

[Reducer Example](src/app/reducer.ts)
```javascript
extraReducers: builder => {
  builder.addMatcher(getUsers.matchFulfilled, (state: IStoreState, action) => {
    state.users = action.payload;
  });
},
```

For updating cached query data manually from component or saga use `api.util.updateQueryData`:

[Component File Example](src/features/posts/Posts.tsx)

[Saga Example](src/app/controllers/usersSaga.ts)
```javascript
const handleAddPost = () => {
  dispatch(
    api.util.updateQueryData('getPosts', undefined, (draftPosts = []) => {
      return [...draftPosts, { id: Date.now(), title: 'New Post', body: 'This is a new post.' }];
    }),
  );
};
```

For updating cached query pagination/changing query use `useState` and paste state as query:

[Component File Example](src/features/cities/CItiesManager.tsx)

```javascript
const [query, setQuery] = useState<number>(5);
const { data: cities, isLoading } = useGetUsersQuery(query);

<button onClick={() => setQuery(prevState => prevState + 1)}>Add city</button>
```


For adding custom `Axios` with default headers and interceptors base query example:

[Axios base query example](src/app/axiosBaseQuery.ts)


## If you want to support

Give a ⭐️ to project if you like it!


