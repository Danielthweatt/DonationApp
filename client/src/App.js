import React, { Component } from 'react';
import About from './components/AboutUs/AboutUs'; 
import './App.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
// import Home from './pages/Home';


class App extends Component {
	render() {
		return (
			<Wrapper>
				<Header />
			</Wrapper>
		);
	}
}

export default App;
