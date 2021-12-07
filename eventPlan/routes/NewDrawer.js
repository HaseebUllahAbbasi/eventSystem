import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import EventStack from './EventStack';
import WelcomeStack from './WelcomeStack';

const RootDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen:EventStack,
        },
        Welcome: {
            screen: WelcomeStack,
        }
    });

export default createAppContainer(RootDrawerNavigator);


