import React from 'react';
import { render } from 'react-dom';
import config from '../../config/config'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import { StripeProvider } from 'react-stripe-elements';

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import HelloWorld from './components/HelloWorld/HelloWorld';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <StripeProvider apiKey={config.stripe_public_key}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route component={NotFound}/>
      </Switch>
      </StripeProvider>
    </App>
  </Router>
), document.getElementById('app'));
