import React, {useState, useEffect} from 'react';
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

function RandomChar() {

	const gService = new gotService();

	const [char, updateChar] = useState({});
	const [loading, updateLoading] = useState(true);
	const [errorMsg, updateErrorMsg] = useState('');
	const [error, updateError] = useState(false);

	useEffect(() => {
		updateCharCard();
		let timeId = setInterval(() => updateCharCard(), 5000);

		return () => {
			clearInterval(timeId);
		}
	}, [])

	function onCharLoaded(c) {
		
		updateChar(c);
		updateLoading(false);
		updateErrorMsg('');
		updateError(false);
	}

	function onError(err) {
		updateLoading(false);
		updateErrorMsg(err.message.slice(-3));
		updateError(true);
	}

	function updateCharCard() {
		const id = Math.floor(Math.random()*140 + 25);
		
		gService.getCharacter(id)
			.then(onCharLoaded)
			.catch(onError);
	}
	
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

export default RandomChar;