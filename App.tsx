import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Tabs } from './src/navigation/Tabs';

const App = () => {
    return (
        <NavigationContainer>
            {/* <Navigator /> */}
            <Tabs />
        </NavigationContainer>
    )
}

export default App;