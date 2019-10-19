import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

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

  render() {
    return (
      <CharDetailsDiv>
        <h4>John Snow</h4>
        <ListGroupFlush>
          <ListGroupItem>
            <span>Gender</span>
            <span>male</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Born</span>
            <span>1783</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Died</span>
            <span>1820</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Culture</span>
            <span>First</span>
          </ListGroupItem>
        </ListGroupFlush>
      </CharDetailsDiv>
    );
  }
}