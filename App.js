import React, { Component } from 'react';
import { View, Text,Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Forgetpw from './src/pages/Forgetpw';
import MyAccount from './src/pages/MyAccount';
import MyCart from './src/pages/MyCart';
import MyOrders from './src/pages/MyOrders';
import StoreLocator from './src/pages/StoreLocator';
import DashboardScreen from './src/pages/DashboardScreen';
import ProductList from './src/pages/ProductList';
import ProductDetail from './src/pages/ProductDetail';
import Resetpw from './src/pages/Resetpw';
import Orderid from './src/pages/Orderid';
import AddressList from './src/pages/AddressList';
import AddAddress from './src/pages/AddAddress';
import EditProfile from './src/pages/EditProfile';

import MenuDrawer from './src/components/MenuDrawer';
import CartProvider from './src/context/CartProvider';


const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  edgeWidth: 0,
  drawerWidth: WIDTH*0.83,
  contentComponent: ({navigation}) => {
    return(<MenuDrawer navigation={navigation}/>)
    
  },
}
const defaultConfig = {
  defaultNavigationOptions: ({ navigation }) => {  
    return {  
      headerLeft: (  
        <Icon  
            style={{ paddingLeft: 16,  color: '#ffffff' }}  
            onPress={() => navigation.openDrawer()}  
            name="md-menu"  
            size={35}  
        />  
    ),
    headerStyle: {
      backgroundColor: '#e91c1a',
    },
    };  
  }
}
/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the  tab)
 */

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  //createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import SplashScreen from './src/components/SplashScreen';

class App extends Component {
  render() {
    return(
      <CartProvider>
          <AppContainer />
      </CartProvider>
    );
  }
}
export default App;



class LogOut extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LogOut</Text>
        {this.props.navigation.navigate(Login)}
      </View>
    );
  }
}



/*-------------------------STACK NAVIGATOR FOR ALL DRAWER OPTIONS----------------------*/
const StackMyCart = createStackNavigator(
  {
    //RouteConfig Param
    MyCart: MyCart,
    AddressList: AddressList,
    AddAddress: AddAddress,
  },
    //Configuration options
    defaultConfig
);

const StackMyAccount = createStackNavigator(
  {
    MyAccount: MyAccount,
    EditProfile: EditProfile,
    Resetpw: Resetpw,
  },
    defaultConfig
);

const StackMyOrders = createStackNavigator(
  {
    MyOrders: MyOrders,
    Orderid: Orderid,
  },
    defaultConfig
);

const StackStoreLocator = createStackNavigator(
  {
    StoreLocator: StoreLocator,
  },
    defaultConfig
);

const ProductListStack = createStackNavigator(
  {
    ProductList: ProductList,
    ProductDetail: ProductDetail,
  },
    defaultConfig,
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardScreen,
    ProductList: ProductList,
    ProductDetail: ProductDetail,
  },
  defaultConfig
);

DashboardStackNavigator.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode
  };
};

/*-----------------DRAWER NAVIGATION CALLED BY SWITCH NAVIGATOR-----------------*/
const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStackNavigator},
  MyCart: { screen: StackMyCart},
  ProductList: {screen: ProductListStack},
  MyAccount: { screen: StackMyAccount },
  StoreLocator: { screen: StackStoreLocator},
  MyOrders: { screen: StackMyOrders },
  LogOut: { screen: Login}  
},
  DrawerConfig,
);


/*-----------Navigator for switching between pages starting from Login page---------*/
const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: Login},   //actual Screen: Login
  Dashboard: { screen: AppDrawerNavigator },
  Signup: { screen: Signup },
  Forgetpw: { screen: Forgetpw }
});

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppSwitchNavigator,
  Dashboard: AppDrawerNavigator ,
});

const AppContainer = createAppContainer(InitialNavigator);
