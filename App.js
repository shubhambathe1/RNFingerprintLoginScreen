import { createStackNavigator } from 'react-navigation';

import LoginScreen from './src/LoginScreen';
import ProfileScreen from './src/ProfileScreen';

const App = createStackNavigator({
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
});

export default App;