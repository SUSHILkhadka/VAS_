import React from 'react';
import { Button } from 'antd';
import './App.css';
import FormPage from './component/LoginForm';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import About from './component/About';
import HomePage from './component/HomePage';

// const  handleSubmit=(event: any)=>{
//   event.preventDefault();
//   console.log(event)

// }

const App = () => (
<>
  <Router>
  <div className="App">
    <div >

      <Link className='navbar' to="/loginpage">LoginPage</Link>
      <Link className='navbar' to="/about">About</Link>

<Routes>
{/* <Route  path='/' element={< App />}></Route> */}
    <Route  path='/loginpage' element={< FormPage />}></Route>
    <Route  path='/about' element={< About />}></Route>
    <Route path="/homepage" element={<HomePage />}></Route>
</Routes>

    </div>
  </div>
  </Router>
  </>
);
export default App;
