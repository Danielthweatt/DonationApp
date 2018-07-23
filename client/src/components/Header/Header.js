import React, { Component } from 'react'; 
import axios from 'axios';
import './Header.css'; 
import Wrapper from '../Wrapper';
// import Button from '@material/react-button/dist'; // /index.js is implied
import { Link } from 'react-router-dom';


class Header extends Component {

	constructor() {
        super();
		this.logout = this.logout.bind(this);
		this.state = {
			navHamClicked: false
		}
    }

	logout = () => {
		axios.post('/user/signout').then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.props.updateUser({
					loggedIn: false,
					hasCustomerAccount: false,
					email: null,
					userId: null
				});
			}
		}).catch(err => {
				console.log(`Logout error: ${err}`);
		});
	}

	handleNavHamClick = () => {
		this.setState(prevState => ({
			navHamClicked: !prevState.navHamClicked
		  }));
	}

	render() {
		return (
			<nav className={this.props.page !== "home"? "navbar navbar-expand-lg navbar-gradient" : "navbar navbar-expand-lg"}>
				<Wrapper>
				<a className="navbar-brand" href="/">Love Foundation</a>
				<button className={this.state.navHamClicked ? "navbar-toggler change" : "navbar-toggler"} onClick={this.handleNavHamClick} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					{/* <span className="navbar-toggler-icon"></span> */}
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className={this.props.page !== "home"? "nav-item" : "nav-item active"}>
							<Link to="/" className="nav-link" >Home <span className="sr-only">(current)</span></Link>
						</li>
						<li className={this.props.page !== "about"? "nav-item" : "nav-item active"}>
							<Link to="/about" className="nav-link">About</Link>
						</li>
						<li className={this.props.page !== "donations"? "nav-item" : "nav-item active"}>
							<Link to="/donations" className="nav-link">Donations</Link>
						</li>
						{this.props.userInfo.loggedIn ? (
							<li className={this.props.page !== "settings"? "nav-item" : "nav-item active"}>
								<Link to="/settings" className="nav-link" href="/settings">Settings</Link>
							</li>
						) : ( 
							<div></div>
						)}
						<li className={this.props.page !== "login"? "nav-item" : "nav-item active"}>
							{this.props.userInfo.loggedIn ? (	
								<button className="nav-link disabled" onClick={this.logout}>Logout</button>
							) : (
								<Link to="/login" className="nav-link">Login</Link>
							)}
						</li>
					</ul>
				</div>
				
				</ Wrapper>
			</nav>
		);
	}
}

export default Header; 