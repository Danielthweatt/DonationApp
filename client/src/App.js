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
			id: null
		};
		this.checkUser = this.checkUser.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	componentDidMount(){
		this.checkUser();
	}

	updateUser(userObject){
		console.log('updating user in app state');
		this.setState(userObject);
		console.log(this.state.id);
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
			} else {
			  console.log('Get user: no user');
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
				<div>
					<p>Join the party {this.state.id}!</p>
					<Switch>
						<Route exact path="/about" component= {About} />
						<Route exact path="/donations" component= {Donations} />
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
