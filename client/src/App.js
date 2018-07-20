import React, { Component } from 'react';
import About from './pages/About/About';
import Home from './pages/Home';
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Donations from './pages/Donations';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// import Home from './pages/Home';


class App extends Component {
	constructor(){
		super();
		// To do: update state (customer account and id properties) here and in other components
		this.state = {
			loggedIn: false,
			hasCustomerAccount: false,
			id: null
		};
		this.updateUser = this.updateUser.bind(this);
		this.checkUser = this.checkUser.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount(){
		this.checkUser();
	}

	updateUser(userObject){
		this.setState(userObject);
	}

	checkUser(){
		axios.get('/user').then(response => {
			if (response.data.user) {
			  	this.setState({
					loggedIn: true,
					hasCustomerAccount: response.data.hasCustomerAccount,
					id: response.data.user._id
			  	});
			} else {
			  	this.setState({
					loggedIn: false,
					id: null
			  	});
			}
		});
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/about" render= {() =>
						<About updateUser={this.updateUser} 
							userInfo={{loggedIn: this.state.loggedIn}}/>} />
					<Route exact path="/donations" render= {() => 
						<Donations updateUser={this.updateUser} 
							userInfo={{
								loggedIn: this.state.loggedIn,
								hasCustomerAccount: this.state.hasCustomerAccount,
								mongoId: this.state.id
							}}/>} />
					<Route exact path="/login" render={() =>
						<Login updateUser={this.updateUser} 
							userInfo={{loggedIn: this.state.loggedIn}}/>} />
					<Route exact path="/signup" render= {() =>
						<SignUp updateUser={this.updateUser} 
							userInfo={{loggedIn: this.state.loggedIn}}/>} />
					<Route exact path="*" render= {() =>
						<Home updateUser={this.updateUser} 
							userInfo={{loggedIn: this.state.loggedIn}}/>} />
				</Switch>
			</Router>
		);
	}
}

export default App;
