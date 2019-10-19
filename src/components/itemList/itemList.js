import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';


const LGroupItem = styled(ListGroupItem)`
  cursor: pointer;
`
export default class ItemList extends Component {

  render() {
    return (
      <ListGroup>
        <LGroupItem>
          John Snow
        </LGroupItem>
        <LGroupItem>
          Brandon Stark
        </LGroupItem>
        <LGroupItem>
          Geremy
        </LGroupItem>
      </ListGroup>
    );
  }
}