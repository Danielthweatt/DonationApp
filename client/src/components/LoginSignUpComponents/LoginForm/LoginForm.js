import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Input'; 
import { userInfo } from 'os';

class LoginForm extends Component {

	state = {
		email:"",
		password:""
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handlePasswordInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value});
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
};

export default LoginForm;