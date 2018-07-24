import React, { Component } from 'react';
import About from './pages/About/About';
import Home from './pages/Home';
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Donations from './pages/Donations';
import AccountSettings from './pages/AccountSettings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';


// import Home from './pages/Home';


class App extends Component {
	constructor(){
		super();
		this.state = {
			loggedIn: false,
			hasCustomerAccount: false,
			email: null,
			firstName: null,
			lastName: null,
			userId: null
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
					hasCustomerAccount: response.data.user.hasCustomerAccount,
					email: response.data.user.email,
					firstName: response.data.user.firstName,
					lastName: response.data.user.lastName,
					userId: response.data.user.userId
			  	});
			} else {
			  	this.setState({
					loggedIn: false,
					hasCustomerAccount: false,
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
