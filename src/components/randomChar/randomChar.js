import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
	border-radius: 0.25rem !important;
	h4 {
    margin-bottom: 20px;
    text-align: center;
	}
	li {
		border-right: 0;
    border-left: 0;
		border-radius: 0;
		display: flex;
		justify-content: space-between !important;
		span:first-child {
			font-weight: bold;
		}
	}
`

export default class RandomChar extends Component {

	gotService = new gotService();
	state = {
		char: {},
		loading: true,
		errorMsg: '',
		error: false    
	}

	componentDidMount () {
		this.updateChar();
		this.timeId = setInterval(this.updateChar, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.timeId);
	}

	onCharLoaded = (char) => {

		this.setState({
			char,
			loading: false,
			error: false,
			errorMsg: ''
		})
	}

	onError = (err) => {
		this.setState({
			error: true,
			errorMsg: err.message.slice(-3),
			loading: false
		})
	}

	updateChar = () => {
		const id = Math.floor(Math.random()*140 + 25);
			
		this.gotService.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render(){
		const { char, loading, error, errorMsg } = this.state;
		const errorMessage = error ? <ErrorMessage errorMsg={errorMsg}/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? <View char={char}/> : null;
		return (
			<RandomBlock>
				{errorMessage}
				{spinner}
				{content}
			</RandomBlock>
		);
	}
}

const View = ({char}) => {
	
	const {name, gender, born, died, culture} = char;

	return (
		<>
			<h4>Random Character: {name}</h4>
			<ListGroup>
				<ListGroupItem>
					<span>Gender </span>
					<span>{gender}</span>
				</ListGroupItem>
				<ListGroupItem>
					<span>Born </span>
					<span>{born}</span>
				</ListGroupItem>
				<ListGroupItem>
					<span>Died </span>
					<span>{died}</span>
				</ListGroupItem>
				<ListGroupItem>
					<span>Culture </span>
					<span>{culture}</span>
				</ListGroupItem>
			</ListGroup>
		</>
	)
} 