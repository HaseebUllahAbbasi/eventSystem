import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/Login';
import MyEvents from '../screens/MyEvents'
import NewAccount from '../screens/NewAccount';
import SignInScreen from '../screens/Sign';
const screens = {
    Login:{
        screen: SignInScreen,
        navigationOptions: {
            title: 'Login',
        }
    },
    NewAccount:{
        screen: NewAccount,
        navigationOptions: {
            title: 'New Account',
        }
    },
    Intro:{
        screen: LoginScreen,
        navigationOptions: {
            title: 'Intro Screen',
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