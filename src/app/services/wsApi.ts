import { api } from './api';
import { io } from 'socket.io-client';
import { actionSetUsers } from '../reducer';
import { actionGetUsers } from '../actions';

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
            console.log('getState', getState(), getCacheEntry());

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

export const { useSubscribeToEventsQuery } = wsApi;
