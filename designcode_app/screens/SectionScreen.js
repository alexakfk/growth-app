import React from "react";
import styled from "styled-components";
import { StyleSheet, Pressable, ScrollView, Dimensions } from "react-native";
import {LineChart, ProgressChart, BarChart, PieChart, ContributionGraph, StatusBar} from "react-native-chart-kit";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { data, contributionData, pieChartData, progressChartData } from '../components/Data'




class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  

  renderTabBar() {
    return <StatusBar hidden/>
  }
  
  render() {
    const chartConfigs = [
      {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        backgroundColor: '#022173',
        backgroundGradientFrom: '#022173',
        backgroundGradientTo: '#1b3fa0',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
      },
      {
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#000000',
        backgroundGradientTo: '#000000',
        color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
      }, {
        backgroundColor: '#0091EA',
        backgroundGradientFrom: '#0091EA',
        backgroundGradientTo: '#0091EA',
        color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
      },
      {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        backgroundColor: '#b90602',
        backgroundGradientFrom: '#e53935',
        backgroundGradientTo: '#ef5350',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        backgroundColor: '#ff3e03',
        backgroundGradientFrom: '#ff3e03',
        backgroundGradientTo: '#ff3e03',
        color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
      }
    ]
    
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    const width = Dimensions.get('window').width
    const height = 220

    return (
      <ScrollView>
        <Container>
          <Name>{section.name}</Name>
          <Data>
          <ScrollableTabView renderTabBar={this.renderTabBar}>
          {chartConfigs.map(chartConfig => {
            const labelStyle = {
              color: chartConfig.color(),
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 16
            }
          const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style
          }
          return (
            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfig.backgroundColor
              }}
            >
              <Text style={labelStyle}>Bezier Line Chart</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                bezier
                style={graphStyle}
              />
              <Text style={labelStyle}>Progress Chart</Text>
              <ProgressChart
                data={progressChartData}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Bar Graph</Text>
              <BarChart
                width={width}
                height={height}
                data={data}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Pie Chart</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
              <Text style={labelStyle}>Line Chart</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Contribution Graph</Text>
              <ContributionGraph
                values={contributionData}
                width={width}
                height={height}
                endDate={new Date('2016-05-01')}
                numDays={105}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </ScrollView>
          )
        })}
      </ScrollableTabView>
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
