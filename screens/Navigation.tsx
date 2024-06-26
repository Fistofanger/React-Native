import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SingleCardPage} from './SingleCardPage';
import {CardsPage} from './CardsPage';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CardsPage"
          component={CardsPage}
          options={{title: 'Cards'}}
        />
        <Stack.Screen
          name="SingleCardPage"
          component={SingleCardPage}
          options={{title: 'Single card'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
