import React, { Component } from 'react';
import About from './pages/About/About';
import Home from './pages/Home';
import Donations from './pages/Donations';
import Header from './components/Header/Header'; 
import Wrapper from './components/Wrapper/Wrapper'; 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// import Home from './pages/Home';


class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/about" component= {About} />
						<Route exact path="/donations" component= {Donations} />
						<Route exact path="*" component= {Home} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
