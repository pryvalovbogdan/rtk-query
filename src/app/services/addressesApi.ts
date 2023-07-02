import { api } from './api';

export const adressesApi = api.injectEndpoints({
  endpoints: build => ({
    getAddresses: build.query<any, void>({
      query: () => ({ url: 'https://random-data-api.com/api/address/random_address' }),
      providesTags: (result: any = []) => [
        ...[result].map(({ id }) => ({ type: 'Posts' as never, id } as const)),
        { type: 'Addresses' as const, id: 'LIST' } as never,
      ],
    }),
  }),
});

export const { useGetAddressesQuery } = adressesApi;
