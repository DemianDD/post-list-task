import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'; 
import { Home } from './views/Home';
import './custom.css';
import { PostProvider } from './contexts/data_context';

const App: React.FC = () => (
  <BrowserRouter>
    <PostProvider>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </PostProvider>
  </BrowserRouter>
);

export default App;