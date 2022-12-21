import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { mainStackNavigation } from "./screens/main";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={mainStackNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
