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
		this.state = {
			loggedIn: false,
			hasCustomerAccount: false,
			customerId: null,
			id: null
		};
		this.checkUser = this.checkUser.bind(this);
		this.checkForAccount = this.checkForAccount.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	componentDidMount(){
		this.checkUser();
	}

	updateUser(userObject){
		//console.log('updating user in app state');
		this.setState(userObject);
		//console.log(this.state.id);
	}

	checkUser(){
		axios.get('/user').then(response => {
			console.log('Get user response: ');
			console.log(response.data);
			if (response.data.user) {
			  console.log('Get User: There is a user saved in the server session: ');
			  this.setState({
					loggedIn: true,
					id: response.data.user._id
			  });
			  this.checkForAccount();
			} else {
			  console.log('Get user: no user');
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
				console.log('good good good gogogodoodgo')
				this.setState({
					hasCustomerAccount: true,
					customerId: response.data.customerId
				})
			}
			else {
				this.setState({
					hasCustomerAccount: false
				})
			}
		})
	}

	render() {
		return (
			<Router>
				<div>
					<p>Join the party {this.state.id}!</p>
					<Switch>
						<Route exact path="/about" component= {About} />
						<Route exact path="/donations" render= {() => 
							<Donations userInfo={{
								loggedIn: this.state.loggedIn,
								hasCustomerAccount: this.state.hasCustomerAccount,
								mongoId: this.state.id,
								customerId: this.state.customerId
							}}/>} />
						<Route exact path="/login" render={() =>
            				<Login updateUser={this.updateUser}/>} />
						<Route exact path="/signup" component= {SignUp} />
						<Route exact path="*" component= {Home} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
