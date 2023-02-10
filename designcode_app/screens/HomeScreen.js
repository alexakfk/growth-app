import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Pressable,
  Linking
} from "react-native";
import styled from "styled-components";
import Patients from "../components/Patients";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";


function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}




class HomeScreen extends React.Component {
  
  
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
  super(props)
  this.state = {
      scale: new Animated.Value(1),
      patients: [],
    
    };
  }


  componentDidMount() {
   
    const user = auth().currentUser
    patientsArray = [];

    firestore()
    .collection('users')
    .doc(user.uid)
    .collection('patients')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
      patientsArray.push({
        ...documentSnapshot.data()
      })
      })
      console.log(patientsArray)
      this.setState({patients: patientsArray})
    })
    
    console.log(this.state.patients)

    
  }


  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "OPEN_MENU") {
      Animated.spring(this.state.scale, {
        toValue: 0.9,
      }).start();
    }

    if (this.props.action == "CLOSE_MENU") {
      Animated.spring(this.state.scale, {
        toValue: 1,
      }).start();
    }
  };
  


  render() {
    
    const user = auth().currentUser
    const { navigation } = this.props;

    if (navigation.getParam('addPatient', false)) {

      this.setState({patients:[
        ...this.state.patients, 
        {
        name: navigation.getParam('fullName', 'null'),
        main: navigation.getParam('treatment', 'null'),
        relationship: navigation.getParam('rel', 'null'),
        contact: navigation.getParam('contact', 'null'),
        blood: navigation.getParam('blood', 'null'), 
        image: navigation.getParam('image', 'null'),
        }
      ]})
    
      firestore().collection('users').doc(user.uid).collection('patients').add(
        {
          name: navigation.getParam('fullName', 'null'),
          main: navigation.getParam('treatment', 'null'),
          relationship: navigation.getParam('rel', 'null'),
          contact: navigation.getParam('contact', 'null'),
          blood: navigation.getParam('blood', 'null'),
          image: navigation.getParam('image', 'null'),
        }
        )
      
      navigation.setParams({addPatient: false})

       

      console.log(this.state.patients)
      
    }

    const openAlzheimers = async () => {
      const url = 'https://www.alz.org/'
      const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
      if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
      } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }

    const openTeepaSnow = async () => {
      const url = 'https://teepasnow.com/'
      const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
      if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
      } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }


    return (
      
      <RootView>

        <Menu navigation = {this.props.navigation}/>
        <AnimatedContainer style={{ transform: [{ scale: this.state.scale }] }}>
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar source={{uri:user.photoURL}} />
                </TouchableOpacity>
                <Title>Welcome back, </Title>
                <Name>{user.displayName}</Name>
                <TouchableOpacity
                  style={ { position: "absolute", right: 30, top: 0 }}
                  onPress={() => {
                    this.props.navigation.navigate("AddPatient");
                    
                  }}
                >
                  <Ionicons name="add-circle" size={40} color="#4775F2" />
                </TouchableOpacity>
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 0,
                  paddingLeft: 12,
                  paddingTop: 10,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              ></ScrollView>
              <Subtitle>Patients</Subtitle>
              
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 10, paddingLeft: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {this.state.patients.map((patient, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.navigate("Section", {
                        section: patient,
                      });
                    }}
                  >
                    
                    <Patients image={patient.image} name={patient.name} />
                    
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <Subtitle>News</Subtitle>
              <ScrollView style={{ paddingBottom: 30, paddingLeft: 10 }}>    
                  <Pressable onPress = {openAlzheimers}>
                  <Card
                    image= {require("../assets/background1.jpg")}
                    title= "Alzheimer's Association"
                    author= "The progression and stages of dementia"
                  />
                  </Pressable>
                  <Pressable onPress = {openTeepaSnow}>
                  <Card
                    image= {require("../assets/background5.jpg")}
                    title= "Teepa Snow"
                    author= "Positive Approach to Care"
                  />
                  </Pressable>
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const cards = [
  {
    image: require("../assets/background1.jpg"),
    title: "Alzheimer's Society",
    author: "The progression and stages of dementia",
  },
  {
    image: require("../assets/background5.jpg"),
    title: "Teepa Snow",
    author: "Positive Approach to Care",
  },
];

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;


