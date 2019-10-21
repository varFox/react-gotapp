import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const CharDetailsDiv = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 0.25rem !important;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`

const SelectError = styled.div`
  color: #fff;
  text-align: center;
  font-size: 26px;
`
const ListGroupFlush = styled(ListGroup)`
  li {
    border-right: 0;
    border-left: 0;
    border-radius: 0;
    justify-content: space-between !important;
    display: flex !important;
    span:first-child {
      font-weight: bold;
    }
  }
`;

export default class CharDetails extends Component {

  gotService = new gotService();

  state = {
    char: 130,
    loading: true,
		error: false  
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharLoaded = (char) => {
    
		this.setState({
			char,
			loading: false,
			error: false
		})
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}

  updateChar = () => {
    const {charId} = this.props;
    if (!charId) {
      return
    }

    this.gotService.getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    
    const {error, loading, char} = this.state;
		const errorMessage = error ? <ErrorMessage errorMsg={'error'}/> : null;
		const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    
    return (
      <CharDetailsDiv>
        {errorMessage}
        {spinner}
        {content}
      </CharDetailsDiv>
    );
  }
}

const View = ({char}) => {
  const {name, gender, born, died, culture} = char;
  return (
    <>
      <h4>{name}</h4>
      <ListGroupFlush>
        <ListGroupItem>
          <span>Gender</span>
          <span>{gender}</span>
        </ListGroupItem>
        <ListGroupItem>
          <span>Born</span>
          <span>{born}</span>
        </ListGroupItem>
        <ListGroupItem>
          <span>Died</span>
          <span>{died}</span>
        </ListGroupItem>
        <ListGroupItem>
          <span>Culture</span>
          <span>{culture}</span>
        </ListGroupItem>
      </ListGroupFlush>
    </>
  )
}