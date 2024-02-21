import React from 'react';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Buy from "./pages/Buy"
import Sell from "./pages/Sell"
import Profile from "./pages/Profile"
import { AuthProvider } from './pages/authContext';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/buy' element={<Buy />} />
          <Route exact path='/sell' element={<Sell />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;    