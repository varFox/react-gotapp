import React, {Component} from 'react';
import img from './error.jpg';
import styled from 'styled-components';

const Image = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`

export default class ErrorMessage extends Component {

  render() {
    const errorMsg = this.props.errorMsg;
    return (
      <Image>
        <img src={img} alt='error'></img>
        <span>Ошибка {errorMsg} </span>
      </Image>
    )
  }
}
