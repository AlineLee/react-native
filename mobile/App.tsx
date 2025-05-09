/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Home} from './src/screens/Home';
import {AddLottery} from './src/screens/AddLotteries';
import {ToastProvider} from 'react-native-toast-notifications';
import RegisterModal from './src/components/RegisterModal';
import {NativeModules} from 'react-native';

const queryClient = new QueryClient();

const RootStack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  const {Notification} = NativeModules;

  useEffect(() => {
    Notification.requestPermissions();
  }, [Notification]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Group>
              <RootStack.Group>
                <RootStack.Screen
                  name="Home"
                  component={Home}
                  options={{title: ''}}
                />
                <RootStack.Screen
                  name="AddLottery"
                  component={AddLottery}
                  options={{title: 'New Lottery'}}
                />
              </RootStack.Group>
              <RootStack.Group screenOptions={{presentation: 'modal'}}>
                <RootStack.Screen
                  name="RegisterModal"
                  component={RegisterModal}
                  options={{title: ''}}
                />
              </RootStack.Group>
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
