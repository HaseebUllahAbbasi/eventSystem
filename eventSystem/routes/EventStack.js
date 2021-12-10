import { createStackNavigator } from 'react-navigation-stack';
import OneEvent from '../screens/OneEvent';

const screens = {
    Home: {
        screen: OneEvent,
        title: 'Event',
    }
}
const EventStack = createStackNavigator(screens, {

    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});
export default EventStack;