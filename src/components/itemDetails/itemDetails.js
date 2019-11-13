import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
// import gotService from '../../services/gotService';/index.js

const ItemDetailsDiv = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 0.25rem !important;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
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
`

const BadSpan = styled.span`
  color: #fff;
`;

const Field = ({item, field, label}) => {
  return (
    <ListGroupItem>
      <span>{label}</span>
      <span>{item[field]}</span>
    </ListGroupItem>
  )
}

export {
  Field
}

function ItemDetails({getItems, message, children, itemId}) {
	const [item, updateItem] = useState({});
	const [loading, updateLoading] = useState(true);
	const [error, updateError] = useState(false);
  useEffect(() => {
    updateItem_old();
  }, [itemId])

  function onItemLoaded(i) {
    updateItem(i);
    updateLoading(false);
    updateError(false);
	}

	function onError() {
    updateLoading(false);
    updateError(true);
	}

  function updateItem_old() {
    
    if (!getItems) {
      return
    }
    
    getItems(item)
      .then(onItemLoaded)
      .catch(onError);
  }

    if(!item) {
      return <BadSpan>{message}</BadSpan>
    }
    
    const {name} = item;
    const view = (
      <>
        <h4>{name}</h4>

        <ListGroupFlush>
          {
            React.Children.map(children, (child) => React.cloneElement(child, {item}))
          }
        </ListGroupFlush>  
      </>
    )
		const errorMessage = error ? <ErrorMessage errorMsg={'error'}/> : null;
		const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? view : null;
    
    return (
      <ItemDetailsDiv>
        {errorMessage}
        {spinner}
        {content}
      </ItemDetailsDiv>
    );
}

export default ItemDetails;