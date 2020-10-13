import React from 'react';
import '../main.css';
import { Route } from 'react-router-dom';
import Home from './Home';
import Write from './Write';
import RightWrite from './right/RightWrite';

const Main = () => {
    return (
        <div className='Mains'>
            <div id='Mains-left'>
                <h3> Left Side </h3>
            </div>

            <div>
                <Route path='/' component={Home} exact />
                <Route path='/write' component={Write} />
            </div>

            <div id="Mains-right">
                <Route path='/write' component={RightWrite} />
            </div>
        </div>
    )
}

export default Main;