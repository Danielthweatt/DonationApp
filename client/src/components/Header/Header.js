import React, { Component } from 'react'; 
import axios from 'axios';
import './Header.css'; 
// import Button from '@material/react-button/dist'; // /index.js is implied

class Header extends Component {
	constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

	logout = () => {
		axios.post('/user/signout').then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.props.updateUser({
					loggedIn: false,
					hasCustomerAccount: false,
					id: null
				});
			}
		}).catch(err => {
				console.log(`Logout error: ${err}`);
		});
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="/">Navbar</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/about">About</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/donations">Donations</a>
						</li>
						<li className="nav-item">
							{this.props.userInfo.loggedIn ? (
								<button className="nav-link disabled" onClick={this.logout}>Logout</button>
							) : (
								<a className="nav-link disabled" href="/login">Login</a>
							)}
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header; 