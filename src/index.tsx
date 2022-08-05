import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './AppRouter';
import reportWebVitals from './reportWebVitals';

//redux toolkit
import { store as store2 } from './redux_toolkit/stores/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store2}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
