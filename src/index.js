import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DenseTable from './pages/login';
import DenTable from './pages/List'
import HabitTracker from './pages/Dashboard';
import KanbanBoard from './pages/DDSS';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from "./components/firebase/AuthContext";
import Habits from './pages/signup';
import GooglePage from './pages/google';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <AuthContextProvider>
      {/* <Router>

<Routes>
    <Route path = '/home' element = {<DenseTable/>}/>
    <Route path = '/' element = {<GooglePage/>}/>
  



</Routes>
</Router>  */}

<DenseTable/>


</AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
