import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import styled from "styled-components";
import Patients from "../components/Patients";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import auth from '@react-native-firebase/auth';

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

  state = {
    scale: new Animated.Value(1),
  };

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
    const user = auth().currentUser;
    return (
      
      <RootView>
        <Menu />
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
                {patients.map((patient, index) => (
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
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    image={card.image}
                    title={card.title}
                    author={card.author}
                  />
                ))}
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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

const patients = [
  {
    image: require("../assets/profile1.jpg"),
    name: "Henley Kim",
    main: "Dementia",
    relationship: "Daughter",
    phone: "(808) 220 4468",
    blood: "A+",
    data: require("../assets/dataMock.jpeg"),
  },
  {
    image: require("../assets/profile2.jpg"),
    name: "Michael Johnson",
    main: "Alzheimer's",
    relationship: "Wife",
    phone: "(404) 674 2234",
    blood: "B-",
    data: require("../assets/background4.jpg"),
  },
  {
    image: require("../assets/profile3.jpg"),
    name: "Jaimee Mason",
    main: "Parkinson's",
    relationship: "Son",
    phone: "(503) 223 2211",
    blood: "A-",
    data: require("../assets/background2.jpg"),
  },
  {
    image: require("../assets/profile4.jpg"),
    name: "Luke Wooten",
    main: "Alzheimer's",
    relationship: "Niece",
    phone: "(540) 230 3432",
    blood: "O-",
    data: require("../assets/background3.jpg"),
  },
];

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
