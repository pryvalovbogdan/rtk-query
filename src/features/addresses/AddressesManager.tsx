import React, { useState } from 'react';

import { useGetAddressesQuery } from '../../app/services/addressesApi';

export const AddressesManager = () => {
  const [initRetries, setInitRetries] = useState(false);
  const { data: addresses, isLoading } = useGetAddressesQuery();

  console.log('addresses', addresses);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h3>Addresses</h3>
      <button onClick={() => setInitRetries(true)}>{isLoading ? 'retrying...' : 'Start error prone retries'}</button>
      <hr />
      <div className='row'></div>
    </div>
  );
};
