import React, { useState } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

class NewPatient extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      treatment: "",
      blood: "",
      contact: "",
      rel: "",
    }
  }

  render() {
    // Navigation
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    const user = auth().currentUser

    const onClick = () => {

      this.props.navigation.navigate("Home", {addPatient: true, fullName: this.state.name, treatment: this.state.treatment, blood: this.state.blood, contact: this.state.contact, rel: this.state.rel})
      
    }

    return (
      <ScrollView>
        <SafeAreaView>
          <Top>
            <Title>Add Patient</Title>
            <TouchableOpacity
              style={{ position: "absolute", right: 20, top: 42 }}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Ionicons name="close-circle-outline" size={40} color="#4775F2" />
            </TouchableOpacity>
          </Top>
          <Form>
            <Text style={styles.text}>Patient Name</Text>
            <TextInput placeholder="Full Name" style={styles.response} 
              value={this.state.name}
              onChangeText={name => this.setState({name})}
            />
            <Text style={styles.text}>Cause of Treament</Text>
            <TextInput
              placeholder="Cause of Treament"
              style={styles.response}
              value={this.state.treatment}
              onChangeText={treatment => this.setState({treatment})}
            />
            <Text style={styles.text}>Blood Type</Text>
            <TextInput placeholder="Blood Type" style={styles.response} 
              value={this.state.blood}
              onChangeText={blood => this.setState({blood})}
            />
            <Text style={styles.text}>Close Contact</Text>
            <TextInput placeholder="Phone Number" style={styles.response} 
              value={this.state.contact}
              onChangeText={contact => this.setState({contact})}
            />
            <Text style={styles.text}>Relationship to Patient</Text>
            <TextInput
              placeholder="Relationship"
              style={styles.response}
              value={this.state.rel}
              onChangeText={rel => this.setState({rel})}
            />
            <Text style={styles.text}>Patient Image</Text>
            <Pressable
              style={styles.button}
              onPress={onClick}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </Form>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default NewPatient;

const Title = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: bold;
  width: 200px;
  position: absolute;
  top: 50px;
  left: 20px;
`;

const Top = styled.View`
  align-items: center;
  justify-content: center;
`;

const Form = styled.View`
  top: 110px;
  left: 20px;
`;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "500",
    paddingBottom: 5,
  },

  response: {
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#4775F2",
    width: "90%",
    top: 170,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

// image: require('../assets/profile4.jpg'),
/* name: 'Luke Wooten',
main: "Alzheimer's",
relationship: "Niece",
phone: '(540) 230 3432',
blood: 'O-',
data: require('../assets/background3.jpg') */
