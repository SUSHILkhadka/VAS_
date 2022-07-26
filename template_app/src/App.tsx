import React from 'react';
import { Button } from 'antd';
import './App.css';
import FormPage from './component/LoginForm';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import About from './component/About';
import HomePage from './component/HomePage';
import { AuthProvider } from './AuthContex';



const App = () => (
<>
  <Router>
  <div className="App">
    <div >

      <Link className='navbar' to="/loginpage">LoginPage</Link>
      <Link className='navbar' to="/about">About</Link>

  <AuthProvider>
<Routes>
    <Route  path='/loginpage' element={< FormPage />}></Route>
    <Route  path='/about' element={< About />}></Route>
    <Route path="/homepage" element={<HomePage />}></Route>
</Routes>
    </AuthProvider>

    </div>
  </div>
  </Router>
  </>
);
export default App;
