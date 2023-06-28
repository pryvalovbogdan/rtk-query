import { api } from './api'

export const adressesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAddresses: build.query<any, void>({
      query: () => ({url: 'https://random-data-api.com/api/address/random_address'}),
      providesTags: (result = []) => [
        ...[result].map(({id}) => ({type: 'Posts', id} as const)),
        {type: 'Posts' as const, id: 'LIST'},
      ],
    }),
  })
})

export const {
  useGetAddressesQuery,
} = adressesApi
