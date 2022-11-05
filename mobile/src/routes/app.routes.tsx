import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { New, Pools } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="new" component={New} />

      <Screen name="pools" component={Pools} />
    </Navigator>
  );
}
