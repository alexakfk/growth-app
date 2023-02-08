import React from "react";
import styled from "styled-components";
import { StyleSheet, Pressable, ScrollView, Dimensions, Text, Button, View } from "react-native";
import { LineChart, ProgressChart, BarChart, PieChart, ContributionGraph, StatusBar } from "react-native-chart-kit";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import update from 'immutability-helper'







class ChartScreen extends React.Component {

  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props)
    this.state = {
      restlessDur: [0, 0, 0, 0, 0, 0, 0],
      refusalDur: [0, 0, 0, 0, 0, 0, 0],
      yellDur: [0, 0, 0, 0, 0, 0, 0],
      wanderingDur: [0, 0, 0, 0, 0, 0, 0],
      hallucinationsDur: [0, 0, 0, 0, 0, 0, 0],
      sleepDur: [0, 0, 0, 0, 0, 0, 0],
      stoolTim: [0, 0, 0, 0, 0, 0, 0],
      urineTim: [0, 0, 0, 0, 0, 0, 0],
      medicineArray: [], //all unique selected medicines
      medicineAmountArray: [], // all selected amounts
      medicineUnitArray: [], // all selected units
      medicineAmountRepeatCounter: [], // count of repeated unique medicine amounts
      medicineCurrentWeekArray: [], // all current weeks of medicines
    }
  }


  componentDidMount() {
    const Month = (new Date().getMonth() + 1)
    const Day = new Date().getDate()
    const Year = (new Date().getFullYear())
    const dayOfTheWeek = new Date().getDay()
    const user = auth().currentUser
    let weekArray = []
    let currentWeek = null
    let weekArray2 = []
    let currentWeek2 = null
    let weekArray3 = []
    let currentWeek3 = null
    let weekArray4 = []
    let currentWeek4 = null
    let weekArray5 = []
    let currentWeek5 = null
    let sleepDurationWeekArray = []
    let sleepDurationCurrentWeek = null
    let stoolTimesWeekArray = []
    let stoolTimesCurrentWeek = null
    let urineTimesWeekArray = []
    let urineTimesCurrentWeek = null
    medicineWeekArray = []
    uniqueMedicineArray = []
    
    

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Medicine')
      .where('data', '==', 'true')
      .orderBy('selectedMedicine', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          this.setState({medicineArray: [...this.state.medicineArray, documentSnapshot.data().selectedMedicine]})
        })


        uniqueMedicineArray = [...new Set(this.state.medicineArray)]
        this.setState({medicineArray: uniqueMedicineArray})

        for (i = 0; i < this.state.medicineArray.length; i++) { // get medicine Amount Array here
          medicineWeekArray = []
          let z = 0
          firestore()
            .collection('users')
            .doc(user.uid)
            .collection('Medicine')
            .where('data', '==', 'true')
            .where('selectedMedicine', '==', this.state.medicineArray[i])
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                z++
                this.setState({medicineAmountArray: [...this.state.medicineAmountArray, documentSnapshot.data().amountConsumed]}) // all amounts for all medicines
                this.setState({medicineUnitArray: [...this.state.medicineUnitArray, documentSnapshot.data().unit]}) // all units for all medicines
                medicineWeekArray = [...medicineWeekArray, documentSnapshot.data().week]
              })

              this.setState({medicineCurrentWeekArray: [...this.state.medicineCurrentWeekArray, medicineWeekArray[(medicineWeekArray.length - 1)]]})
              this.setState({medicineAmountRepeatCounter: [...this.state.medicineAmountRepeatCounter, z]}) // number of times amounts repeat on same medicine
              console.log(this.state.medicineArray)
              console.log(this.state.medicineAmountArray)
              console.log(this.state.medicineUnitArray)
              console.log(medicineWeekArray)
              console.log(this.state.medicineCurrentWeekArray)
              console.log(this.state.medicineAmountRepeatCounter)
            }
            )
        }
        


      }
      )


    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .where('selectedOption2', '==', 'Restlessness')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          weekArray = [...weekArray, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        currentWeek = weekArray[(weekArray.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Behaviors')
          .where('week', '==', currentWeek) //order by date, where week = the week of last data in array
          .where('selectedOption2', '==', 'Restlessness')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ restlessDur: update(this.state.restlessDur, { [i]: { $set: documentSnapshot.data().restlessnessDuration } }) })
                }
              }
            })
          })
      }
      )

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .where('selectedOption2', '==', 'Refusal')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          weekArray2 = [...weekArray2, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        currentWeek2 = weekArray2[(weekArray2.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Behaviors')
          .where('week', '==', currentWeek2) //order by date, where week = the week of last data in array
          .where('selectedOption2', '==', 'Refusal')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ refusalDur: update(this.state.refusalDur, { [i]: { $set: documentSnapshot.data().refusalDuration } }) })
                }
              }
            })
          })
      }
      )

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .where('selectedOption2', '==', 'Yelling')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          weekArray3 = [...weekArray3, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        currentWeek3 = weekArray3[(weekArray3.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Behaviors')
          .where('week', '==', currentWeek3) //order by date, where week = the week of last data in array
          .where('selectedOption2', '==', 'Yelling')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ yellDur: update(this.state.yellDur, { [i]: { $set: documentSnapshot.data().yellingDuration } }) })
                }
              }
            })
          })
      }
      )

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .where('selectedOption2', '==', 'Wandering')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          weekArray4 = [...weekArray4, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        currentWeek4 = weekArray4[(weekArray4.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Behaviors')
          .where('week', '==', currentWeek4) //order by date, where week = the week of last data in array
          .where('selectedOption2', '==', 'Wandering')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ wanderingDur: update(this.state.wanderingDur, { [i]: { $set: documentSnapshot.data().wanderingDuration } }) })
                }
              }
            })
          })
      }
      )

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .where('selectedOption2', '==', 'Hallucinations')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          weekArray5 = [...weekArray5, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        currentWeek5 = weekArray5[(weekArray5.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Behaviors')
          .where('week', '==', currentWeek5) //order by date, where week = the week of last data in array
          .where('selectedOption2', '==', 'Hallucinations')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ hallucinationsDur: update(this.state.hallucinationsDur, { [i]: { $set: documentSnapshot.data().hallucinationsDuration } }) })
                }
              }
            })
          })
      }
      )

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Sleep')
      .where('data', '==', 'true')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          sleepDurationWeekArray = [...sleepDurationWeekArray, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        sleepDurationCurrentWeek = sleepDurationWeekArray[(sleepDurationWeekArray.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Sleep')
          .where('week', '==', sleepDurationCurrentWeek) //order by date, where week = the week of last data in array
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ sleepDur: update(this.state.sleepDur, { [i]: { $set: documentSnapshot.data().duration } }) })
                }
              }
            })
          })
      }
      )

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Bowel')
      .where('data', '==', 'true')
      .where('selectedOption', '==', 'Stool')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          stoolTimesWeekArray = [...stoolTimesWeekArray, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        stoolTimesCurrentWeek = stoolTimesWeekArray[(stoolTimesWeekArray.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Bowel')
          .where('week', '==', stoolTimesCurrentWeek) //order by date, where week = the week of last data in array
          .where('selectedOption', '==', 'Stool')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ stoolTim: update(this.state.stoolTim, { [i]: { $set: documentSnapshot.data().stoolTimes } }) })
                }
              }
            })
          })
      }
      )

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Bowel')
      .where('data', '==', 'true')
      .where('selectedOption', '==', 'Urine')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          urineTimesWeekArray = [...urineTimesWeekArray, documentSnapshot.data().week] //go through all documents, put each week number in an array
        })
        urineTimesCurrentWeek = urineTimesWeekArray[(urineTimesWeekArray.length - 1)] //go through all data in array, get the week of last data in array

        firestore() //do another firestore() get()
          .collection('users')
          .doc(user.uid)
          .collection('Bowel')
          .where('week', '==', urineTimesCurrentWeek) //order by date, where week = the week of last data in array
          .where('selectedOption', '==', 'Urine')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                if (documentSnapshot.data().dayOfTheWeek == i) {
                  this.setState({ urineTim: update(this.state.urineTim, { [i]: { $set: documentSnapshot.data().urineTimes } }) })
                }
              }
            })
          })
      }
      )


  }



  render() {
    let restlessnessDuration = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.restlessDur }]
    }
    let refusalDuration = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.refusalDur }]
    }
    let yellingDuration = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.yellDur }]
    }
    let wanderingDuration = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.wanderingDur }]
    }
    let hallucinationsDuration = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.hallucinationsDur }]
    }
    let sleepDuration = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.sleepDur }]
    }
    let stoolTimes = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.stoolTim }]
    }
    let urineTimes = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{ data: this.state.urineTim }]
    }

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

    const chartConfig = [
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
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        tabLabel: "Bowel",
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {
          borderRadius: 16
        }
      },
      {
        tabLabel: "Medication",
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
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
        style={{ paddingTop: '15%' }}
        initialPage={0}
      >
        <Text //CHARTS FOR BEHAVIORS SCREEN
          tabLabel={chartConfig[0].tabLabel}
        >
          <ScrollView
            key={Math.random()}
            style={{
              backgroundColor: chartConfig[0].backgroundColor
            }}
          >
            <Button
              title="Back"
              onPress={() => {
                this.props.navigation.navigate("Section");
              }}
            />
            <ScrollableTabView
              initialPage={0}
              style={{ backgroundColor: 'white' }}
            >
              <View tabLabel='Restlessness'>
                <BarChart
                  width={width}
                  height={height}
                  data={restlessnessDuration}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <LineChart
                  data={restlessnessDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[0]}
                  accessor="population"
                  style={chartConfig[0].style}
                />
              </View>
              <View tabLabel='Refusal'>
                <BarChart
                  width={width}
                  height={height}
                  data={refusalDuration}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <LineChart
                  data={refusalDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[0]}
                  accessor="population"
                  style={chartConfig[0].style}
                />
              </View>
              <View tabLabel='Yelling'>
                <BarChart
                  width={width}
                  height={height}
                  data={yellingDuration}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <LineChart
                  data={yellingDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[0]}
                  accessor="population"
                  style={chartConfig[0].style}
                />
              </View>
              <View tabLabel='Wandering'>
                <BarChart
                  width={width}
                  height={height}
                  data={wanderingDuration}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <LineChart
                  data={wanderingDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[0]}
                  accessor="population"
                  style={chartConfig[0].style}
                />
              </View>
              <View tabLabel='Hallucinations'>
                <BarChart
                  width={width}
                  height={height}
                  data={hallucinationsDuration}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <LineChart
                  data={hallucinationsDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[0]}
                  style={chartConfig[0].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[0]}
                  accessor="population"
                  style={chartConfig[0].style}
                />
              </View>
            </ScrollableTabView>
          </ScrollView>
        </Text>

        <Text //CHARTS FOR SLEEP SCREEN
          tabLabel={chartConfig[1].tabLabel}
        >
          <ScrollView
            key={Math.random()}
            style={{
              backgroundColor: chartConfig[1].backgroundColor
            }}
          >
            <Button
              title="Back"
              onPress={() => {
                this.props.navigation.navigate("Section");
              }}
            />

            <BarChart
              width={width}
              height={height}
              data={sleepDuration}
              chartConfig={chartConfig[1]}
              style={chartConfig[1].style}
            />
            <ContributionGraph
              values={contributionData}
              width={width}
              height={height}
              endDate={new Date('2016-05-01')}
              numDays={105}
              chartConfig={chartConfig[1]}
              style={chartConfig[1].style}
            />
            <LineChart
              data={sleepDuration}
              width={width}
              height={height}
              chartConfig={chartConfig[1]}
              style={chartConfig[1].style}
            />
            <PieChart
              data={pieChartData}
              height={height}
              width={width}
              chartConfig={chartConfig[1]}
              accessor="population"
              style={chartConfig[1].style}
            />
          </ScrollView>
        </Text>

        <Text //CHARTS FOR BOWEL SCREEN
          tabLabel={chartConfig[2].tabLabel}
        >
          <ScrollView
            key={Math.random()}
            style={{
              backgroundColor: chartConfig[2].backgroundColor
            }}
          >
            <Button
              title="Back"
              onPress={() => {
                this.props.navigation.navigate("Section");
              }}
            />
            <ScrollableTabView
              initialPage={0}
              style={{ backgroundColor: 'white' }}
            >
              <View tabLabel='Stool'>
                <BarChart
                  width={width}
                  height={height}
                  data={stoolTimes}
                  chartConfig={chartConfig[2]}
                  style={chartConfig[2].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[2]}
                  style={chartConfig[2].style}
                />
                <LineChart
                  data={stoolTimes}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[2]}
                  style={chartConfig[2].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[2]}
                  accessor="population"
                  style={chartConfig[2].style}
                />
              </View>
              <View tabLabel='Urine'>
                <BarChart
                  width={width}
                  height={height}
                  data={urineTimes}
                  chartConfig={chartConfig[2]}
                  style={chartConfig[2].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[2]}
                  style={chartConfig[2].style}
                />
                <LineChart
                  data={urineTimes}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[2]}
                  style={chartConfig[2].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[2]}
                  accessor="population"
                  style={chartConfig[2].style}
                />
              </View>
            </ScrollableTabView>
          </ScrollView>
        </Text>

        <Text //CHARTS FOR MEDICATION SCREEN
          tabLabel={chartConfig[3].tabLabel}
        >
          <ScrollView
            key={Math.random()}
            style={{
              backgroundColor: chartConfig[3].backgroundColor
            }}
          >
            <Button
              title="Back"
              onPress={() => {
                this.props.navigation.navigate("Section");
              }}
            />
            <ScrollableTabView
              initialPage={0}
              style={{ backgroundColor: 'white' }}
            >
              <View tabLabel='Restlessness'>
                <BarChart
                  width={width}
                  height={height}
                  data={restlessnessDuration}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <LineChart
                  data={restlessnessDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[3]}
                  accessor="population"
                  style={chartConfig[3].style}
                />
              </View>
              <View tabLabel='Refusal'>
                <BarChart
                  width={width}
                  height={height}
                  data={refusalDuration}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <LineChart
                  data={refusalDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[3]}
                  accessor="population"
                  style={chartConfig[3].style}
                />
              </View>
              <View tabLabel='Yelling'>
                <BarChart
                  width={width}
                  height={height}
                  data={yellingDuration}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <LineChart
                  data={yellingDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[3]}
                  accessor="population"
                  style={chartConfig[3].style}
                />
              </View>
              <View tabLabel='Wandering'>
                <BarChart
                  width={width}
                  height={height}
                  data={wanderingDuration}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <LineChart
                  data={wanderingDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[3]}
                  accessor="population"
                  style={chartConfig[3].style}
                />
              </View>
              <View tabLabel='Hallucinations'>
                <BarChart
                  width={width}
                  height={height}
                  data={hallucinationsDuration}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <ContributionGraph
                  values={contributionData}
                  width={width}
                  height={height}
                  endDate={new Date('2016-05-01')}
                  numDays={105}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <LineChart
                  data={hallucinationsDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[3]}
                  style={chartConfig[3].style}
                />
                <PieChart
                  data={pieChartData}
                  height={height}
                  width={width}
                  chartConfig={chartConfig[3]}
                  accessor="population"
                  style={chartConfig[3].style}
                />
              </View>
            </ScrollableTabView>
          </ScrollView>
        </Text>

      </ScrollableTabView>

    );
  }
}


export default ChartScreen;

