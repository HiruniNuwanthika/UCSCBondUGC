import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyContextProvider from './contexts/MyContext';
import Home from './components/Home';




function App() {

  return (

        <MyContextProvider>
        <Home/>
    </MyContextProvider>

    
    
  );
}

export default App;
