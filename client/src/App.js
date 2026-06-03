import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';


// tujuan auth route adalah agar ketika sudah login tidak bisa login lagi, intinya pembeda antara route sudah login dan belum
import AuthRoute from './util/AuthRoute';


import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';


// menentukan component yang diload dan routenya

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <div className='container'> */}
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />

          <Route excat path="/posts/:postId" component={SinglePost} />
        </Container>
        {/* </div> */}
      </Router>
    </AuthProvider>
  );
}

export default App;