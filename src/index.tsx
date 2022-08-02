import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//context
import { AuthProvider } from './AuthContex';
import { Provider } from 'react-redux';

//redux toolkit
import { store as store2} from "./redux_toolkit/store"
import ListAllFormsPage from './component/clientPatientRegistration/ListAllForm';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store2}>

    <App />
    {/* <ListAllFormsPage/> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
