import React from 'react';
import '../main.css';
import { Route, Switch } from 'react-router-dom';
// import Home from './Home';
import Write from './Write';
import RightWrite from './right/RightWrite';
import List from './List';
import View from './View';

const Main = () => {
    return (
        <div className='Mains'>
            <div id='Mains-left'>
                <h3> Left Side </h3>
            </div>

            <div>
                <Switch>
                    <Route path='/' component={List} exact />
                </Switch>
                {/* <Route path='/' component={List} exact /> */}
                <Route path='/write' component={Write} />
                <Route path='/view/:data' component={View} />
            </div>

            <div id="Mains-right">
                <Route path='/write' component={RightWrite} />
            </div>
        </div>
    )
}

export default Main;