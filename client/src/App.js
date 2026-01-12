import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from 'semantic-ui-react';


// menentukan component yang diload dan routenya

function App() {
  return (
    <Router>
      {/* <div className='container'> */}
      <Container>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Container>
      {/* </div> */}
    </Router>
  );
}

export default App;