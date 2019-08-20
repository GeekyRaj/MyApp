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
  }

  getUpdate = () => {
    const method = 'GET';
    const url = 'users/getUserData';
    return API(url,method,null)
      .then(responseJson => {
        if(responseJson.status == 200){
        this.setState({
          email: responseJson.data.user_data.email,
          name:'' +responseJson.data.user_data.first_name +
            ' ' +responseJson.data.user_data.last_name,
            count: responseJson.data.total_carts
        });
        console.log('Context - \nName: '+this.state.name+'\nEmail: '+this.state.email+'\nCount: '+this.state.count);
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
          getUpdate: this.getUpdate,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}