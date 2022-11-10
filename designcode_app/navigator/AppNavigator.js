import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import NewPatient from "../screens/NewPatient";
import BehaviourScreen from "../screens/Behaviour";
import ExerciseScreen from "../screens/Exercise";
import BowelScreen from "../screens/Bowel";
import MedicineScreen from "../screens/Medicine";
import LoginScreen from "../screens/LoginScreen";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  Section: SectionScreen,
  AddPatient: NewPatient,
  AddBehaviour: BehaviourScreen,
  AddExercise: ExerciseScreen,
  AddBowel: BowelScreen,
  AddMedicine: MedicineScreen,
},
{
  initialRouteName: 'Login'
});

export default createAppContainer(AppNavigator);
