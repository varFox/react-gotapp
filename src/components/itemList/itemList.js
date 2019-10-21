import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';


const LGroupItem = styled(ListGroupItem)`
  cursor: pointer;
`
export default class ItemList extends Component {

  gotService = new gotService();

  state = {
    charList: null
  }

  componentDidMount() {
    this.gotService.getAllCharacters()
      .then((charList) => {
        this.setState({
          charList
        });
      });
  }

  renderItems(arr) {
    return arr.map((item) => {
      return (
        <LGroupItem 
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}>
          {item.name}
        </LGroupItem>
      )
    })
  }

  render() {

    const {charList} = this.state;

    if(!charList) {
      return <Spinner/>
    }

    const items = this.renderItems(charList);

    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }
}