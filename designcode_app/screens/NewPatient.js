import React from "react";
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

class NewPatient extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    // Navigation
    const { navigation } = this.props;
    const section = navigation.getParam("section");

    // Form Variables
    const name = "";
    const treatment = "";
    const blood = "";
    const contact = "";
    const rel = "";
    const image = "";

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
            <TextInput placeholder="Full Name" style={styles.response} />
            <Text style={styles.text}>Cause of Treament</Text>
            <TextInput
              placeholder="Cause of Treament"
              style={styles.response}
            />
            <Text style={styles.text}>Blood Type</Text>
            <TextInput placeholder="Blood Type" style={styles.response} />
            <Text style={styles.text}>Close Contact</Text>
            <TextInput placeholder="Phone Number" style={styles.response} />
            <Text style={styles.text}>Relationship to Patient</Text>
            <TextInput
              placeholder="Mother, Sister, Father, etc."
              style={styles.response}
            />
            <Text style={styles.text}>Patient Image</Text>
            <Pressable
              style={styles.button}
              onPress={() => Alert.alert("Patient Added!")}
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
