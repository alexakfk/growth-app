import React from "react";
import styled from "styled-components";
import { StyleSheet, Pressable, ScrollView } from "react-native";
import {BarChart} from "react-native-chart-kit";



class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  

  render() {
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
    
    const { navigation } = this.props;
    const section = navigation.getParam("section");

    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets:
      [
        {data: [7, 8, 7, 5, 4, 9, 6]}
      ]
      }

    return (
      <ScrollView>
        <Container>
          <Name>{section.name}</Name>
          <Data>
            <BarChart
              data={data}
              chartConfig={chartConfig}
            />
          </Data>
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
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("AddBehaviour");
            }}
          >
            <Text style={styles.text}>Behaviors</Text>
          </Pressable>
          <Pressable
            style={styles.button}
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
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("AddMedicine");
            }}
          >
            <Text style={styles.text}>Medicine</Text>
          </Pressable>
        </Container>
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#4775F2",
    width: "90%",
    marginLeft: 20,
    marginTop: 5,
    top: 170,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
