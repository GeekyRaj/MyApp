import React, { Component } from 'react';
import CartContext from './CartContext.js';
import API from '../components/API.js';

export default class CartProvider extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      email: null,
      name: null
    };
    this.getUpdate();
    this.getCount();
  }

  getCount() {
    const method = 'GET';
    const url = 'users/getUserData';
    return API(url,method,null)
      .then(responseJson => {
        if(responseJson.status == 200){
          console.log('COUNT : '+responseJson.data.total_carts)
          this.setState({
            count: ''+responseJson.data.total_carts
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  PlusCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  MinusCount = () => {
    this.setState({
      count: this.state.count - 1
    });
  };

  getUpdate = () => {
    const method = 'GET';
    const url = 'users/getUserData';
    return API(url,method,null)
      .then(responseJson => {
        if(responseJson.status == 200){
        this.setState({
          email: responseJson.data.user_data.email,
          name:'' +responseJson.data.user_data.first_name +
            ' ' +responseJson.data.user_data.last_name
        });
        console.log('Context - \nName: '+this.state.name+'\nEmail: '+this.state.email);
      }
      else{ console.log('Context Not fetched')}
    })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          state: this.state,
          onPlus: this.PlusCount,
          onMinus: this.MinusCount,
          getUpdate: this.getUpdate,
          getCount: this.getCount
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}