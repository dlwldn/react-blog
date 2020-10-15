import React from 'react';
// import './App.css';
// import { Route, Link, Switch } from 'react-router-dom';

// import Home from './components/Home';
// import Test from './components/Test';
import Header from './components/Header';
import Main from './components/Main';

const App = () => {
  return (
    <div >
      <Header />
      <Main />

      {/* <Route exact path="/" component={Home} />
      <Switch >
        <Route path="/test/:data" component={Test} />
        <Route path="/test" component={Test} />
      </Switch>

      <ul>
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to="/test" >Test</Link>
        </li>
      </ul> */}
    </div>
  );
}

export default App;
