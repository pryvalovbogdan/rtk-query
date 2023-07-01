import './App.css';
import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import { AddressesManager } from './features/addresses/AddressesManager';
import CitiesManager from './features/cities/CItiesManager';
import Posts from './features/posts/Posts';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <h1>RTK query websocket/saga example</h1>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to='/'>Main</Link>
            <Link to='/addresses'>AddressesManager</Link>
            <Link to='/cities'>Cities</Link>
          </div>
          <Routes>
            <Route path='/' element={<Posts />} />
            <Route path='/cities' element={<CitiesManager />} />
            <Route path='/addresses/*' element={<AddressesManager />} />
          </Routes>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
