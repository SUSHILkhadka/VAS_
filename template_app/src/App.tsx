import React from 'react';
import { Button } from 'antd';
import './App.css';
import FormPage from './component/form';

// const  handleSubmit=(event: any)=>{
//   event.preventDefault();
//   console.log(event)

// }

const App = () => (

  <div className="App">
    <div className='App-header'>
    <FormPage/>
    </div>
  </div>
);
export default App;
