import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Forgetpw from './src/pages/Forgetpw';
import Table from './src/pages/Table';
import Chairs from './src/pages/Chairs';
import Cupboards from './src/pages/Cupboards';
import MyAccount from './src/pages/MyAccount';
import MyCart from './src/pages/MyCart';
import MyOrders from './src/pages/MyOrders';
import Sofas from './src/pages/Sofas';
import StoreLocator from './src/pages/StoreLocator';

import MenuDrawer from './src/components/MenuDrawer';


const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH*0.83,
  contentComponent: ({navigation}) => {
    return(<MenuDrawer navigation={navigation}/>)
  }
}
/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
//import { Container, Header, Content, Left } from 'native-base';

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        <Button title="Sign Up" onPress={() => alert('button pressed')} />
      </View>
    );
  }
}

class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

class LogOut extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LogOut</Text>
      </View>
    );
  }
}

class Settings extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }
}


/*const DashboardTabNavigator = createBottomTabNavigator(
  {
    Feed,
    Profile,
    Settings
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);*/
const DashboardStackNavigator = createStackNavigator(
  {
    //RouteConfig Param
    DashboardTabNavigator: DashboardScreen,
  },
  {
    //NavigatorConfig param
    //initialRouteName: "NeoSoft",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 16 , color: '#ffffff'}}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
        headerRight: (
          <Icon
            style={{ paddingRight: 16 , color: '#ffffff'}}
            //onPress={() => navigation.openDrawer()}
            name="md-search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: '#e91c1a',
        },
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStackNavigator },
  MyCart: { screen: MyCart},
  Table: { screen: Table },
  Sofas: { screen: Sofas },
  Chairs: { screen: Chairs },
  Cupboards: { screen: Cupboards },
  MyAccount: { screen: MyAccount },
  StoreLocator: { screen: StoreLocator},
  MyOrders: { screen: MyOrders },
  LogOut: { screen: LogOut}
},
DrawerConfig
);

//Navigator for switching between pages starting from Login page
const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: Login },
  Dashboard: { screen: AppDrawerNavigator },
  Signup: { screen: Signup },
  Forgetpw: { screen: Forgetpw }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
