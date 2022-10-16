import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail } from "../screens";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}

export default HomeStack