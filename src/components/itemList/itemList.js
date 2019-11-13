import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import Spinner from '../spinner';


const LGroupItem = styled(ListGroupItem)`
  cursor: pointer;
`

function ItemList({getData, onItemSelected, renderItem}) {

  const [itemList, updateList] = useState([]);

  useEffect(() => {
    getData()
      .then((data) => {
        updateList(data)
      })
  }, [])

  function renderItems(arr) {
    
    return arr.map((item) => {
      const {id} = item;
      const label = renderItem(item);

      return (
        <LGroupItem 
          key={id}
          onClick={() => onItemSelected(id)}>
          {label}
        </LGroupItem>
      )
    })
  }

  if(!itemList) {
    return <Spinner/>
  }

  const items = renderItems(itemList);

  return (
    <ListGroup>
      {items}
    </ListGroup>
  );
}

export default ItemList;