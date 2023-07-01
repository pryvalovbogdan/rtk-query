import React from 'react';

import { useGetUsersQuery } from '../../app/services/usersApi';
import { useSubscribeToEventsQuery } from '../../app/services/wsApi';

export const CitiesManager = () => {
  const { data: cities, isLoading } = useGetUsersQuery(5);

  useSubscribeToEventsQuery();

  console.log('cities', cities);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!cities) {
    return <div>No cities :(</div>;
  }

  return (
    <div>
      {cities.map(item => (
        <div key={item.id}>
          <div>City: {item.address.city}</div>
          <div>Country: {item.address.country}</div>
        </div>
      ))}
    </div>
  );
};

export default CitiesManager;
