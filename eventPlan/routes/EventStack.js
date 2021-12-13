import { createStackNavigator } from 'react-navigation-stack';
import CreateNote from '../screens/createNote';
import CreateTask from '../screens/createTasks';
import EventGuest from '../screens/EventGuest';
import EventTasks from '../screens/eventTasks';
import EventTeam from '../screens/EventTeam';
import HomeScreen from '../screens/HomeScreen';
import MyEvents from '../screens/MyEvents'
import MyRequests from '../screens/MyRequests';
import NotesEvent from '../screens/NotesEvent';
import OneEvent from '../screens/OneEvent';
import Profile from '../screens/Profile';
import SendRequest from '../screens/SendRequest';
import Sign from '../screens/Sign'
import Header from '../shared/header';

const screens = {
    Login: {
        screen: Sign,
        navigationOptions: ({ navigation }) => 
        {
            return {
                headerTitle: () => <Header title='Login' navigation={navigation} />
            }
        },
    },
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            title:'Home'
        }
    },
    OneEvent: {
        screen: OneEvent,
        navigationOptions: {
            title: 'Event',
        }
    },
    eventTask: {
        screen: EventTasks,
        navigationOptions: {
            title: 'Event Task',
        }
    },
    eventNotes: {
        screen: NotesEvent,
        navigationOptions: {
            title: 'Event Notes',
        }
    },
    eventTeam: {
        screen: EventTeam,
        navigationOptions: {
            title: 'Event Team',
        }
    },
    sendRequest: {
        screen: SendRequest,
        navigationOptions: {
            title: 'Send Request',
        }
    },
    memberProfile : 
    {
        screen: Profile,
        navigationOptions:{
            title: "Profile"
        }
    },
    myRequests : 
    {
        screen: MyRequests,
        navigationOptions:{
            title: "My Requests"
        }
    },
    newTask : 
    {
        screen: CreateTask,
        navigationOptions:{
            title: "Tasks"
        }
    },
    newNote : 
    {
        screen: CreateNote,
        navigationOptions:{
            title: "Notes"
        }
    },
    eventGuest : 
    {
        screen: EventGuest,
        navigationOptions:{
            title: "Event Guests"
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