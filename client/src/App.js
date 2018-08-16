import React, { Component } from 'react';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Donations from './pages/Donations';
import AccountSettings from './pages/AccountSettings';
import ForgotPassword from './pages/ForgotPassword';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import API from './utils/API';
import './App.css';

class App extends Component {
	state = {
		loggedIn: false,
		hasCustomerAccount: false,
		hasSubscription: false,
		email: null,
		firstName: null,
		lastName: null,
		userId: null
	};

	componentDidMount = () => {
		this.checkUser();
	}

	updateUser = (userObject) => {
		this.setState(userObject);
	}

	checkUser = () => {
		// Check to see if a user is logged in
		API.checkUser().then(response => {
			if (response.data.user) {
			  	this.setState({
					loggedIn: true,
					hasCustomerAccount: response.data.user.hasCustomerAccount,
					hasSubscription: response.data.user.hasSubscription,
					email: response.data.user.email,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					userId: response.data.user.userId
			  	});
			} else {
			  	this.setState({
					loggedIn: false,
					hasCustomerAccount: false,
					hasSubscription: false,
					email: null,
					firstName: null,
					lastName: null,
					userId: null
			  	});
			}
		});
	}

	render() {
		return (
			<div>
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
									hasSubscription: this.state.hasSubscription,
									email: this.state.email,
									firstName: this.state.firstName,
									lastName: this.state.lastName,
									userId: this.state.userId
								}}/>} />
						<Route exact path="/settings" render={() =>
							<AccountSettings updateUser={this.updateUser}
								userInfo={{
									loggedIn: this.state.loggedIn,
									hasCustomerAccount: this.state.hasCustomerAccount,
									email: this.state.email,
									firstName: this.state.firstName,
									lastName: this.state.lastName,
									userId: this.state.userId	
								}}/>}/>
						<Route exact path="/login" render={() =>
							<Login updateUser={this.updateUser} 
								userInfo={{loggedIn: this.state.loggedIn}}/>} />
						<Route exact path="/signup" render= {() =>
							<SignUp updateUser={this.updateUser} 
								userInfo={{loggedIn: this.state.loggedIn}}/>} />
						<Route exact path="/forgot" render={() =>
							<ForgotPassword updateUser={this.updateUser} 
								userInfo={{
									loggedIn: this.state.loggedIn,
									resetOrForgot: 'forgot'
								}}/>} />
						<Route path="/reset" render={() =>
							<ForgotPassword updateUser={this.updateUser} 
								userInfo={{
									loggedIn: this.state.loggedIn,
									resetOrForgot: 'reset'
								}}/>} />
						<Route exact path="*" render= {() =>
							<Home updateUser={this.updateUser} 
								userInfo={{loggedIn: this.state.loggedIn}}/>} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
