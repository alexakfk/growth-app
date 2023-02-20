import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import NewPatient from "../screens/NewPatient";
import BehaviourScreen from "../screens/Behaviour";
import SleepScreen from "../screens/Sleep";
import BowelScreen from "../screens/Bowel";
import MedicineScreen from "../screens/Medicine";
import LoginScreen from "../screens/LoginScreen";
import ChartScreen from "../screens/ChartScreen";
import HealthScreen from "../screens/HealthScreen"

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  Section: SectionScreen,
  Chart: ChartScreen,
  AddPatient: NewPatient,
  AddBehaviour: BehaviourScreen,
  AddSleep: SleepScreen,
  AddBowel: BowelScreen,
  AddMedicine: MedicineScreen,
  Health: HealthScreen,
},
{
  initialRouteName: 'Login'
});

export default createAppContainer(AppNavigator);
