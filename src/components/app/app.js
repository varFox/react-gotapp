import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';


import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

const BoxInBtn = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	button { 
		height: 50px;
		padding: 5px 30px;
		width: 100%;
    border-radius: 5px;
	}
`
export default class App extends Component {

	state = {
		char: true,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	viewCard = () => {
		this.setState({
			char: !this.state.char
		});
	}


  render() {

		const {char} = this.state;

		const viewChar = char ? <RandomChar/> : null;

		if (this.state.error) {
			return <ErrorMessage/>
		}

		return (
			<> 
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{size: 5, offset: 0}}>
						<BoxInBtn><button onClick={this.viewCard}>Показать рандомного персонажа</button></BoxInBtn>
							{viewChar}
						</Col>
					</Row>
					<CharacterPage/>
				</Container>
			</>
		);
	}
    
};