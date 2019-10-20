import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import styled from 'styled-components';

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
		char: false
	}

	viewCard = () => {
		this.setState({
			char: !this.state.char
		});
	}

  render() {

		const {char} = this.state;

		const viewChar = char ? <RandomChar/> : null;

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
					<Row>
						<Col md='6'>
							<ItemList />
						</Col>
						<Col md='6'>
							<CharDetails />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
    
};