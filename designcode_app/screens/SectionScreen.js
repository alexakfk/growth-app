import React from "react";
import styled from "styled-components";
import { StyleSheet, Pressable, ScrollView, Dimensions, Button, View, TouchableOpacity } from "react-native";
import { LineChart, ProgressChart, BarChart, PieChart, ContributionGraph, StatusBar } from "react-native-chart-kit";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/AntDesign'; //heart
import { Ionicons } from "@expo/vector-icons";



class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    const width = Dimensions.get('window').width
    const height = 220

    return (

      <ScrollView>
        <Container>
          <View>
            <Name>{section.name}</Name>
            <TouchableOpacity style={{ position: "absolute", right: 30, top: 70 }}
              onPress={() => {
                this.props.navigation.navigate("Notification");
              }}
            >
              <Ionicons name="heart" size={40} color='red' />
            </TouchableOpacity>
          </View>
          <Close>
            <Text>Personal Information:</Text>
            <Info>
              <Bold>Cause of Treament: </Bold> {section.main}
            </Info>
            <Info>
              <Bold>Close Contact: </Bold> {section.relationship}{" "}
              {section.phone}
            </Info>
            <Info>
              <Bold>Blood Type: </Bold> {section.blood}
            </Info>
          </Close>
        </Container>
        <View style={{
          flexDirection: 'row',
        }}>
          <Pressable
            style={styles.button1}
            onPress={() => {
              this.props.navigation.navigate("AddMedicine");
            }}
          >
            <Text style={styles.text}>Medicine</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("AddBehaviour");
            }}
          >
            <Text style={styles.text}>Behaviors</Text>
          </Pressable>
        </View>
        <View style={{
          flexDirection: 'row',
        }}>
          <Pressable
            style={styles.button1}
            onPress={() => {
              this.props.navigation.navigate("AddSleep");
            }}
          >

            <Text style={styles.text}>Sleep</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("AddBowel");
            }}
          >
            <Text style={styles.text}>Bowel Movement</Text>
          </Pressable>
        </View>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
            paddingHorizontal: 12,
            borderRadius: 4,
            backgroundColor: "#1C8EF0",
            width: '90%',
            marginLeft: 20,
            marginTop: 10,
            top: 170,
            fontWeight: 'bold',
            borderWidth: 1,
            borderColor: 'black'
          }}
          onPress={() => {
            this.props.navigation.navigate("Chart");
          }}
        >

          <Text style={styles.text}>Chart</Text>
        </Pressable>

      </ScrollView>
    );
  }
}

export default SectionScreen;

const Container = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: bold;
  width: 200px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Data = styled.View`
  height: 250px;
  justify-content: center;
  align-items: center;
  top: 100px;
  left: 30px;
  margin-bottom: 0px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  top: 130px;
  left: 20px;
`;

const Close = styled.View`
  height: 155px;
  width: 90%;
  top: 150px;
  left: 20px;
  background-color: rgba(0, 109, 119, 0.1);

`;

const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  color: black;
`;

const Info = styled.Text`
  font-size: 14px;
  color: black;
  padding: 10px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    textAlign: 'center',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#1C8EF0",
    width: "40%",
    marginLeft: 5,
    marginRight: 20,
    marginTop: 10,
    top: 170,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
  },
  button1: {
    textAlign: 'center',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#1C8EF0",
    width: "40%",
    marginLeft: 20,
    marginRight: 5,
    marginTop: 10,
    top: 170,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
