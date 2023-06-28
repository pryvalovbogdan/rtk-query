import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
   useGetAddressesQuery,
} from '../../app/services/addresses'

export const AddressesManager = () => {
  const [initRetries, setInitRetries] = useState(false)
  const [query, setQuery] = useState<number>(5);
  const { data: addresses, isLoading, error: UserError, isError } = useGetAddressesQuery(query);

  console.log('addresses', addresses)

  return (
    <div>
      <h3>Addresses</h3>
      <button onClick={() => setInitRetries(true)}>
        {isLoading ? 'retrying...' : 'Start error prone retries'}
      </button>
      <hr />
      <div className="row"></div>
    </div>
  )
}
