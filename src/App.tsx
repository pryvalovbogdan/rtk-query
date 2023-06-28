import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import  { AddressesManager } from './features/addresses/AddressesManager';
import CitiesManager from './features/cities/CItiesManager';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <div>
            <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
              <img src={viteLogo} className='logo' alt='Vite logo' />
            </a>
            <a href='https://react.dev' target='_blank' rel='noreferrer'>
              <img src={reactLogo} className='logo react' alt='React logo' />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to='/addresses'>AddressesManager</Link>
            <Link to='/cities'>Cities</Link>
          </div>
          <Routes>
            <Route path='/' element={<div />} />
            <Route path='/cities' element={<CitiesManager />} />
            <Route path='/addresses/*' element={<AddressesManager />} />
          </Routes>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
