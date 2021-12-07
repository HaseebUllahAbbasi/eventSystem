import { createStackNavigator } from 'react-navigation-stack';
import MyEvents from '../screens/MyEvents'
import OneEvent from '../screens/OneEvent';
const screens = {
    Home:{
        screen: MyEvents,
        navigationOptions: {
            title: 'My Events',
        }
    },
    OneEvent:{
        screen: OneEvent,
        navigationOptions: {
            title: 'Event',
        }
    },


};

const EventStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});
export default EventStack;