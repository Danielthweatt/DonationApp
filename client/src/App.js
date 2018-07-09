import React, { Component } from 'react';
import About from './components/AboutUs/AboutUs';
import Header from './components/Header/Header'; 
import Wrapper from './components/Wrapper/Wrapper';  
import './App.css';

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
