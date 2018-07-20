import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Input from '../../Input';

class LoginForm extends Component {
	constructor() {
        super();
        this.state = {
            email: '',
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
		this.setState({password: e.target.value});
	}

	handleSubmit(event) {
        event.preventDefault();
		const signInInfo = {
			email: this.state.email,
			password: this.state.password
		};
        axios.post('/user/signin', signInInfo).then(response => {
            if (response.status === 200) {
                this.props.updateUser({
					loggedIn: true,
					userId: response.data.id,
					email: response.data.email,
					hasCustomerAccount: response.data.hasCustomerAccount
                });
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
							<Input title="Email" name="Email" type="text" value={this.props.email} handleInput={this.handleEmailInput}/>
						</div>
						<div>
							<Input title="Password" name="Password" type="password" value={this.props.password} handleInput={this.handlePasswordInput}/>
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