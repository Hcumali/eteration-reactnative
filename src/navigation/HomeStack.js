import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail, Create } from "../screens";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  )
}

export default HomeStack