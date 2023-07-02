import React, { useState } from 'react';

import { useGetUsersQuery } from '../../app/services/usersApi';
import { useSubscribeToEventsQuery } from '../../app/services/wsApi';

export const CitiesManager = () => {
  const [query, setQuery] = useState<number>(5);
  const { data: cities, isLoading, error } = useGetUsersQuery(query);

  useSubscribeToEventsQuery();

  console.log('cities', cities, error);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!cities) {
    return <div>No cities :(</div>;
  }

  return (
    <div>
      <button onClick={() => setQuery(prevState => prevState + 1)}>Add city</button>
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
