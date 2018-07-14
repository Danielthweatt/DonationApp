import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Input from '../../Input'; 
import { userInfo } from 'os';

class LoginForm extends Component {
	constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);  
    }


	handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handlePasswordInput = e => {
		//console.log(e.target.value)
		this.setState({password: e.target.value});
	}

	handleSubmit(event) {
        event.preventDefault();
		console.log('HandleSubmit');
		const signInInfo = {
			email: this.state.email,
			password: this.state.password
		};
        axios.post('/user/signin', signInInfo).then(response => {
            console.log('Login response: ');
            console.log(response);
            if (response.status === 200) {
                // // update App.js state
                // this.props.updateUser({
                //     loggedIn: true,
                //     id: response.data._id
                // })
                // update the state to redirect to home
                this.setState({
                    redirectTo: '/'
                });
            }
        }).catch(error => {
            console.log('Login error: ');
            console.log(error);    
        })
    }

	render() {
		if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
			return (
				<div>
					<form>
						<div>
							<label>Email:</label>
							<Input title = "Name" name="email" handleInput={this.handleEmailInput}/>
						</div>
						<div>
							<label>Password:</label>
							<Input title = "Name" type="password" name="password" handleInput={this.handlePasswordInput}/>
						</div>
						<div>
							<input type="submit" onClick={this.handleSubmit}/>
						</div>
					</form>
					<a href="/signup">Sign Up</a>
				</div>
			)
		}
	}
};

export default LoginForm;