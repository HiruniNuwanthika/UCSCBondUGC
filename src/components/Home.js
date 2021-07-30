import React, {useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {MyContext} from '../contexts/MyContext';
import Insert from './Insert';
import Edit from './Edit';
import View from './View';
import Reports from './Reports'
import {Redirect} from 'react-router';
import UCSClogo from '../Images/UCSClogo.png';

// Importing the Login & Register Componet
import Login from './Login'
import Register from './Register'

function Home(){

    const {rootState,logoutUser} = useContext(MyContext);
    const {isAuth,theUser,showLogin} = rootState;

    // If user Logged in
    if(isAuth)
    {
        //return<Redirect to='/view'/>;
        return(
           
            <Router>
      <div className="container">
      
      <nav className="navbar navbar-expand-lg navbar-light" style={{fontStyle:"oblique",fontFamily:"serif", backgroundColor:"#d9eafc", fontSize:"18 px"}}>
        <img src={UCSClogo} alt="logo" style={{  display: 'flex', height:'100px'}} />
        <Link to={'/'} className="navbar-brand">Details of ongoing UGC Bonds/Agreements</Link>
        
        <div className="collapse navbar-collapse"vid="navbar-SupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/insert'} className="nav-link">New Bond Agreement</Link>
            </li>
            <li className="nav-item">
              <Link to={'/view'} className="nav-link">View All Agreements</Link>
            </li>     
            <li className="nav-item">
              <Link to={'/reports'} className="nav-link">Reports</Link>
            </li>  
          
            <button className="logoutBtn" onClick={logoutUser}>Logout</button>                       
          </ul>
        </div>
      </nav>
      <p></p>

      <Switch>
        <Route exact path='/insert' component={Insert}/>
        <Route path='/edit/:id' component={Edit}/>
        <Route path='/view' component={View}/>
        <Route path='/reports' component={Reports}/>
      </Switch>
      </div>
    </Router>
    
        )
    }
    // Showing Login Or Register Page According to the condition
    else if(showLogin){
        return <Login/>;
    }
    else{
        return <Register/>;
    }
    
}

export default Home;