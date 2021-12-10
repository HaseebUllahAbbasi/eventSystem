import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import EventStack from './EventStack';
const RootDrawerNavigator = createDrawerNavigator(
    {
        Home: 
        {
            screen: EventStack,
        },
    });
export default createAppContainer(RootDrawerNavigator);


