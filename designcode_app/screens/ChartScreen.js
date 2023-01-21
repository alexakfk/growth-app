import React from "react";
import styled from "styled-components";
import { StyleSheet, Pressable, ScrollView, Dimensions, Text, Button } from "react-native";
import {LineChart, ProgressChart, BarChart, PieChart, ContributionGraph, StatusBar} from "react-native-chart-kit";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';





 
class ChartScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
      super(props)
      this.state = {
          data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
              data: [
                40, 50
              ],
            }]
          },

        
        };
      }

      

    render() {
      const user = auth().currentUser
      
      // Mock data object used for Contribution Graph
    
      const contributionData = [
        { date: '2016-01-02', count: 1 },
        { date: '2016-01-03', count: 2 },
        { date: '2016-01-04', count: 3 },
        { date: '2016-01-05', count: 4 },
        { date: '2016-01-06', count: 5 },
        { date: '2016-01-30', count: 2 },
        { date: '2016-01-31', count: 3 },
        { date: '2016-03-01', count: 2 },
        { date: '2016-04-02', count: 4 },
        { date: '2016-03-05', count: 2 },
        { date: '2016-02-30', count: 4 }
      ]
    
      // Mock data object for Pie Chart
    
      const pieChartData = [
        { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
      ]
    
    
      // Mock data object for Progress
    
      const progressChartData = [0.4, 0.6, 0.8]

    const chartConfigs = [
      {
        tabLabel: "Behaviors",
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        tabLabel: "Sleep",
        backgroundColor: '#022173',
        backgroundGradientFrom: '#022173',
        backgroundGradientTo: '#1b3fa0',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        tabLabel: "Bowel",
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
      },
      {
        tabLabel: "Medication",
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }
    ]
    
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    const width = Dimensions.get('window').width
    const height = 220

    return (
          <ScrollableTabView  
            style={{paddingTop: '15%'}}
            initialPage={0}
          >

          {chartConfigs.map(chartConfig => {
            const labelStyle = {
              color: chartConfig.color(),
              textAlign: 'center',
              fontSize: 16
            }
          const graphStyle = {
            ...chartConfig.style
          }
          return (
            <Text
            tabLabel = {chartConfig.tabLabel}>
            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfig.backgroundColor
              }}
            >
            <Button
                title="Back"
                onPress={() => {
                this.props.navigation.navigate("Section");
                }}
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
              <Text style={labelStyle}>Line Chart</Text>
              <LineChart
                data={this.state.data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Bar Graph</Text>
              <BarChart
                width={width}
                height={height}
                data={this.state.data}
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
              
            </ScrollView>
            </Text>
          )
        })}
      </ScrollableTabView>
         
    );
  }
}

export default ChartScreen;

