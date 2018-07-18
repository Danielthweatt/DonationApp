import React, { Component } from 'react';
import About from './pages/About/About';
import Home from './pages/Home';
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Donations from './pages/Donations';
import Header from './components/Header/Header'; 
import Wrapper from './components/Wrapper/Wrapper'; 
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
			customerId: null,
			id: null
		};
		this.checkForAccount = this.checkForAccount.bind(this);
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
				console.log(response.data.user);
				// To do: consolidate this and checkForAccount Route
			  	this.setState({
					loggedIn: true,
					id: response.data.user._id
			  });
			  this.checkForAccount();
			} else {
			  	this.setState({
					loggedIn: false,
					id: null
			  	});
			}
		});
	}

	checkForAccount(){
		axios.get('/user/' + this.state.id)
			.then(response => {
				if (response.data.customerId){
					this.setState({
						hasCustomerAccount: true,
						customerId: response.data.customerId
					});
				}
				else {
					this.setState({
						hasCustomerAccount: false
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
								mongoId: this.state.id,
								customerId: this.state.customerId
							}}/>} />
					<Route exact path="/login" component={Login}/>} />
					<Route exact path="/signup" component= {SignUp}/>} />
					<Route exact path="*" render= {() =>
						<Home updateUser={this.updateUser} 
							userInfo={{loggedIn: this.state.loggedIn}}/>} />
				</Switch>
			</Router>
		);
	}
}

export default App;
