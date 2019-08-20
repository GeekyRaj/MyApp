import React,{ Component} from 'react';
import { Text, View } from 'react-native';
import CartContext from '../context/CartContext';
class CartCount extends Component {
    state = {}
    render() {
        return (
            <View
                style={{
                    height: 35,
                    width: 35,
                    borderRadius: 20,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                    zIndex: 2000,
                }}
            >
                <CartContext.Consumer>
                    {contextValue => {
                        return (
                            <Text
                                style={{
                                    margin: 8,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                }}
                            >
                                {contextValue.state.count}
                            </Text>
                        );
                    }}
                </CartContext.Consumer>

            </View>
        );
    }
}

export default CartCount;