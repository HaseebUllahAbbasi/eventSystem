import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/Login';
import MyEvents from '../screens/MyEvents'
import NewAccount from '../screens/NewAccount';
import SignInScreen from '../screens/Sign';
import Header from '../shared/header';

const screens = {
    Intro:{
        screen: LoginScreen,
       navigationOptions: ({ navigation }) => {
            return {
              headerTitle: () => <Header title='Login' navigation={navigation} />
            }
          },
    },
    Login:{
        screen: SignInScreen,
        navigationOptions: {
            title: 'Login Screen',
        }
        },
    NewAccount:{
        screen: NewAccount,
        navigationOptions: {
            title: 'New Account',
        }
    },
    
    

};

const WelcomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});
export default WelcomeStack;