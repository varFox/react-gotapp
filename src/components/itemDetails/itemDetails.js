import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';

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

export default class ItemDetails extends Component {

  gotService = new gotService();

  state = {
    item: null,
    loading: true,
		error: false  
  }

  componentDidMount = () => {
    this.updateItem();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    
		this.setState({
			item,
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

  updateItem = () => {
    const {getItems} = this.props;
    
    if (!getItems) {
      return
    }
    

    getItems(this.state.item)
      .then(this.onItemLoaded)
      .catch(this.onError);
  }

  render() {
    if(!this.state.item) {
      return <BadSpan>{this.props.message}</BadSpan>
    }
    
    const {error, loading, item} = this.state;
    const {name} = item;
    const view = (
      <>
        <h4>{name}</h4>

        <ListGroupFlush>
          {
            React.Children.map(this.props.children, (child) => {
              
              return React.cloneElement(child, {item})
            })
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
}