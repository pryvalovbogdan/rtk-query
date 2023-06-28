import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetUsersQuery } from '../../app/services/users';
import { useSubscribeToEventsQuery } from '../../app/services/wsApi';

export const CitiesManager = () => {
  const { data: cities, isLoading, error, isError } = useGetUsersQuery(5);

  useSubscribeToEventsQuery();

  console.log('data: cities, isLoading', cities, isLoading, error, isError);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!cities) {
    return <div>No cities :(</div>;
  }

  return (
    <div>
      {cities.map(item => <div key={item.id}>
        <div>City: {item.address.city}</div>
        <div>Country: {item.address.country}</div>
      </div>)}
    </div>
  );
};

export default CitiesManager;
