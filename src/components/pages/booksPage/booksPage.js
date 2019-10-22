import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BooksPage extends Component {

  gotService = new gotService();

  state = {
    selectedItem: 0,
    error: false
  }

  onItemSelected = (id) => {
		this.setState({
			selectedItem: id
		})
  }
  
  componentDidCatch = () => {
		this.setState({
			error: true
		})
	}

  render() {
    if (this.state.error) {
			return <ErrorMessage/>
    }

    const itemList = (
      <ItemList 
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({name}) => name}/>
    )

    const itemDetails = (
      <ItemDetails 
        itemId={this.state.selectedItem}
        getItems={() => this.gotService.getBook(this.state.selectedItem)}
        message={`Выберите, пожалуйта, книгу`}>
        <Field field='numberOfPages' label='NumberOfPages'/>
        <Field field='publisher' label='Publisher'/>
        <Field field='released' label='Released'/>
      </ItemDetails>
    )
    
    return (
      <RowBlock left={itemList} right={itemDetails}/>
    )
  }
}