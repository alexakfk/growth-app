import React from "react";
import styled from "styled-components";
import { StyleSheet, Pressable, ScrollView, Dimensions, Text, Button, View, Linking } from "react-native";
import { LineChart, ProgressChart, BarChart, PieChart, ContributionGraph, StatusBar } from "react-native-chart-kit";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import update from 'immutability-helper'
import Icon from 'react-native-vector-icons/Entypo'


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
      medicineArray: [], //all unique selected medicine
      medicineAmountArray: [0, 0, 0, 0, 0, 0, 0],
      medicineUnitArray: [], // all selected units
      medicineAmountRepeatCounter: [], // count of repeated unique medicine amounts
      medicineCurrentWeek: null, // all current weeks of medicines
      medicineAmountDataset: [
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
        },
      ], //data for charts
      restlessDurM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // data for monthly charts
      refusalDurM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      yellDurM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      wanderingDurM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hallucinationsDurM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sleepDurM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stoolTimM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      urineTimM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      medicineAmountArrayM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      medicineCurrentWeekM: null, // all current weeks of medicines
      medicineAmountDatasetM: [
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
        {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        },
      ],
      medicineAmountArrayY: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //data for charts
      medicineAmountDatasetY: [],
      medicineYearArray: [],
      restlessDurY: [], // data for monthly charts
      refusalDurY: [],
      yellDurY: [],
      wanderingDurY: [],
      hallucinationsDurY: [],
      behaviorYearArray: [],
      sleepYearArray: [],
      sleepDurY: [],
      bowelYearArray: [],
      urineTimY: [],
      stoolTimY: [],
      medicationYearArray: []

    }
  }


  componentDidMount() {
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
    let r = null
    let t = null

    let restlessDurationMonth = 0
    let refusalDurationMonth = 0
    let yellingDurationMonth = 0
    let wanderingDurationMonth = 0
    let hallucinationsDurationMonth = 0
    let sleepDurationMonth = 0
    let stoolTimesMonth = 0
    let urineTimesMonth = 0
    let medicineAmountMonth = 0
    let selectedMedicine = null

    let restlessDurationYear = 0
    let refusalDurationYear = 0
    let yellingDurationYear = 0
    let wanderingDurationYear = 0
    let hallucinationsDurationYear = 0
    let sleepDurationYear = 0
    let urineTimesYear = 0
    let stoolTimesYear = 0
    let medicineAmountYear = 0











    firestore() // Week Behavior Data
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

    for (i = 0; i < 12; i++) {
      firestore() // Monthly Behavior Data
        .collection('users')
        .doc(user.uid)
        .collection('Behaviors')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('selectedOption2', '==', 'Restlessness')
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            restlessDurationMonth = restlessDurationMonth + documentSnapshot.data().restlessnessDuration
            this.setState({ restlessDurM: update(this.state.restlessDurM, { [documentSnapshot.data().month]: { $set: restlessDurationMonth } }) })
          })


        })

      firestore() // Monthly Behavior Data
        .collection('users')
        .doc(user.uid)
        .collection('Behaviors')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('selectedOption2', '==', 'Refusal')
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            refusalDurationMonth = refusalDurationMonth + documentSnapshot.data().refusalDuration
            this.setState({ refusalDurM: update(this.state.refusalDurM, { [documentSnapshot.data().month]: { $set: refusalDurationMonth } }) })
          })



        })

      firestore() // Monthly Behavior Data
        .collection('users')
        .doc(user.uid)
        .collection('Behaviors')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('selectedOption2', '==', 'Yelling')
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            yellingDurationMonth = yellingDurationMonth + documentSnapshot.data().yellingDuration
            this.setState({ yellDurM: update(this.state.yellDurM, { [documentSnapshot.data().month]: { $set: yellingDurationMonth } }) })

          })
        })

      firestore() // Monthly Behavior Data
        .collection('users')
        .doc(user.uid)
        .collection('Behaviors')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('selectedOption2', '==', 'Wandering')
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            wanderingDurationMonth = wanderingDurationMonth + documentSnapshot.data().wanderingDuration
            this.setState({ wanderingDurM: update(this.state.wanderingDurM, { [documentSnapshot.data().month]: { $set: wanderingDurationMonth } }) })

          })


        })

      firestore() // Monthly Behavior Data
        .collection('users')
        .doc(user.uid)
        .collection('Behaviors')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('selectedOption2', '==', 'Hallucinations')
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            hallucinationsDurationMonth = hallucinationsDurationMonth + documentSnapshot.data().hallucinationsDuration
            this.setState({ hallucinationsDurM: update(this.state.hallucinationsDurM, { [documentSnapshot.data().month]: { $set: hallucinationsDurationMonth } }) })

          })


        })
      restlessDurationMonth = 0
      refusalDurationMonth = 0
      yellingDurationMonth = 0
      wanderingDurationMonth = 0
      hallucinationsDurationMonth = 0
    }

    firestore() // Yearly Behavior Data
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          this.setState({ behaviorYearArray: [...this.state.behaviorYearArray, documentSnapshot.data().year] })
        })
        this.setState({ behaviorYearArray: [...new Set(this.state.behaviorYearArray)] })
        console.log(this.state.behaviorYearArray)

        for (i = 0; i < this.state.behaviorYearArray.length; i++) {
          firestore() // Yearly Behavior Data
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('year', '==', this.state.behaviorYearArray[i]) //order by date, where year is this year
            .where('selectedOption2', '==', 'Restlessness')
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                restlessDurationYear = restlessDurationYear + documentSnapshot.data().restlessnessDuration
                console.log(restlessDurationYear)


                this.setState({ restlessDurY: update(this.state.restlessDurY, { [this.state.behaviorYearArray.indexOf(documentSnapshot.data().year)]: { $set: restlessDurationYear } }) })
                console.log(this.state.restlessDurY)


              })

              restlessDurationYear = 0

            })

          firestore() // Yearly Behavior Data
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('year', '==', this.state.behaviorYearArray[i]) //order by date, where year is this year
            .where('selectedOption2', '==', 'Refusal')
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                refusalDurationYear = refusalDurationYear + documentSnapshot.data().refusalDuration
                console.log(refusalDurationYear)


                this.setState({ refusalDurY: update(this.state.refusalDurY, { [this.state.behaviorYearArray.indexOf(documentSnapshot.data().year)]: { $set: refusalDurationYear } }) })
                console.log(this.state.refusalDurY)



              })

              refusalDurationYear = 0

            })

          firestore() // Yearly Behavior Data
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('year', '==', this.state.behaviorYearArray[i]) //order by date, where year is this year
            .where('selectedOption2', '==', 'Yelling')
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                yellingDurationYear = yellingDurationYear + documentSnapshot.data().yellingDuration
                console.log(yellingDurationYear)


                this.setState({ yellDurY: update(this.state.yellDurY, { [this.state.behaviorYearArray.indexOf(documentSnapshot.data().year)]: { $set: yellingDurationYear } }) })
                console.log(this.state.yellDurY)


              })

              yellingDurationYear = 0

            })

          firestore() // Yearly Behavior Data
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('year', '==', this.state.behaviorYearArray[i]) //order by date, where year is this year
            .where('selectedOption2', '==', 'Wandering')
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                wanderingDurationYear = wanderingDurationYear + documentSnapshot.data().wanderingDuration
                console.log(wanderingDurationYear)


                this.setState({ wanderingDurY: update(this.state.wanderingDurY, { [this.state.behaviorYearArray.indexOf(documentSnapshot.data().year)]: { $set: wanderingDurationYear } }) })
                console.log(this.state.wanderingDurY)


              })

              wanderingDurationYear = 0

            })

          firestore() // Yearly Behavior Data
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('year', '==', this.state.behaviorYearArray[i]) //order by date, where year is this year
            .where('selectedOption2', '==', 'Hallucinations')
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                hallucinationsDurationYear = hallucinationsDurationYear + documentSnapshot.data().hallucinationsDuration
                console.log(hallucinationsDurationYear)


                this.setState({ hallucinationsDurY: update(this.state.hallucinationsDurY, { [this.state.behaviorYearArray.indexOf(documentSnapshot.data().year)]: { $set: hallucinationsDurationYear } }) })
                console.log(this.state.hallucinationsDurY)


              })

              hallucinationsDurationYear = 0

            })

        }

      })



    firestore() // Weekly sleep data for charts
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


    for (i = 0; i < 12; i++) {
      firestore() // Monthly Sleep Data
        .collection('users')
        .doc(user.uid)
        .collection('Sleep')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            sleepDurationMonth = sleepDurationMonth + documentSnapshot.data().duration
            this.setState({ sleepDurM: update(this.state.sleepDurM, { [documentSnapshot.data().month]: { $set: sleepDurationMonth } }) })
          })



        })
    }

    firestore() // Yearly Sleep Data
      .collection('users')
      .doc(user.uid)
      .collection('Sleep')
      .where('data', '==', 'true')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          this.setState({ sleepYearArray: [...this.state.sleepYearArray, documentSnapshot.data().year] })
        })
        this.setState({ sleepYearArray: [...new Set(this.state.sleepYearArray)] })
        console.log(this.state.sleepYearArray)

        for (i = 0; i < this.state.sleepYearArray.length; i++) {
          firestore() // Yearly Sleep Data
            .collection('users')
            .doc(user.uid)
            .collection('Sleep')
            .where('year', '==', this.state.sleepYearArray[i]) //order by date, where year is this year
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                sleepDurationYear = sleepDurationYear + documentSnapshot.data().duration
                console.log(sleepDurationYear)
                this.setState({ sleepDurY: update(this.state.sleepDurY, { [this.state.sleepYearArray.indexOf(documentSnapshot.data().year)]: { $set: sleepDurationYear } }) })
                console.log(this.state.sleepDurY)
              })
              sleepDurationYear = 0
            })

        }

      })


    firestore() // Weekly Bowel Data
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

    for (i = 0; i < 12; i++) {
      firestore() // Monthly Bowel Data
        .collection('users')
        .doc(user.uid)
        .collection('Bowel')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('selectedOption', '==', 'Stool')
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            stoolTimesMonth = stoolTimesMonth + documentSnapshot.data().stoolTimes
            this.setState({ stoolTimM: update(this.state.stoolTimM, { [documentSnapshot.data().month]: { $set: stoolTimesMonth } }) })
          })



        })
    }

    for (i = 0; i < 12; i++) {
      firestore() // Monthly Bowel Data
        .collection('users')
        .doc(user.uid)
        .collection('Bowel')
        .where('year', '==', new Date().getFullYear().toString()) //order by date, where year is this year
        .where('month', '==', i)
        .where('selectedOption', '==', 'Urine')
        .where('data', '==', 'true')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {

            urineTimesMonth = urineTimesMonth + documentSnapshot.data().urineTimes
            this.setState({ urineTimM: update(this.state.urineTimM, { [documentSnapshot.data().month]: { $set: urineTimesMonth } }) })
          })



        })
    }

    firestore() // Yearly Stool Data
      .collection('users')
      .doc(user.uid)
      .collection('Bowel')
      .where('selectedOption', '==', 'Stool')
      .where('data', '==', 'true')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          this.setState({ bowelYearArray: [...this.state.bowelYearArray, documentSnapshot.data().year] })
        })
        this.setState({ bowelYearArray: [...new Set(this.state.bowelYearArray)] })
        console.log(this.state.bowelYearArray)

        for (i = 0; i < this.state.bowelYearArray.length; i++) {
          firestore() // Yearly Stool Data
            .collection('users')
            .doc(user.uid)
            .collection('Bowel')
            .where('year', '==', this.state.bowelYearArray[i]) //order by date, where year is this year
            .where('selectedOption', '==', 'Stool')
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                stoolTimesYear = stoolTimesYear + documentSnapshot.data().stoolTimes
                console.log(stoolTimesYear)
                this.setState({ stoolTimY: update(this.state.stoolTimY, { [this.state.bowelYearArray.indexOf(documentSnapshot.data().year)]: { $set: stoolTimesYear } }) })
                console.log(this.state.stoolTimY)
              })

              stoolTimesYear = 0

            })

          firestore() // Yearly Urine Data
            .collection('users')
            .doc(user.uid)
            .collection('Bowel')
            .where('year', '==', this.state.bowelYearArray[i]) //order by date, where year is this year
            .where('data', '==', 'true')
            .where('selectedOption', '==', 'Urine')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                urineTimesYear = urineTimesYear + documentSnapshot.data().urineTimes
                this.setState({ urineTimY: update(this.state.urineTimY, { [this.state.bowelYearArray.indexOf(documentSnapshot.data().year)]: { $set: urineTimesYear } }) })

              })

            })

          urineTimesYear = 0

        }

      })

    firestore() //get all medicines into an array
      .collection('users')
      .doc(user.uid)
      .collection('Medicine')
      .where('data', '==', 'true')
      .orderBy('selectedMedicine', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          this.setState({ medicineArray: [...this.state.medicineArray, documentSnapshot.data().selectedMedicine] })
        })


        uniqueMedicineArray = [...new Set(this.state.medicineArray)]
        this.setState({ medicineArray: uniqueMedicineArray })

        firestore()
          .collection('users')
          .doc(user.uid)
          .collection('Medicine')
          .where('data', '==', 'true')
          .orderBy('date', 'asc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              medicineWeekArray = [...medicineWeekArray, documentSnapshot.data().week]
              this.setState({ medicineCurrentWeek: medicineWeekArray[(medicineWeekArray.length - 1)] })
              console.log(this.state.medicineCurrentWeek)
            })

            for (q = 0; q < this.state.medicineArray.length; q++) { // get all sets of medicineamount from current week into an array
              firestore()
                .collection('users')
                .doc(user.uid)
                .collection('Medicine')
                .where('data', '==', 'true')
                .where('selectedMedicine', '==', this.state.medicineArray[q])
                .orderBy('date', 'asc')
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {

                    if (this.state.medicineCurrentWeek == documentSnapshot.data().week) {

                      for (let i = 0; i < 7; i++) { //for loop, 0-6, if set data for each week 
                        if (documentSnapshot.data().dayOfTheWeek == i) {
                          this.setState({ medicineAmountArray: update(this.state.medicineAmountArray, { [i]: { $set: documentSnapshot.data().amountConsumed } }) })
                        }
                      }

                      r = this.state.medicineArray.indexOf(documentSnapshot.data().selectedMedicine)
                      this.setState({ medicineUnitArray: update(this.state.medicineUnitArray, { [r]: { $set: documentSnapshot.data().unit } }) })

                      t = this.state.medicineArray.indexOf(documentSnapshot.data().selectedMedicine)
                      this.setState({
                        medicineAmountDataset: update(this.state.medicineAmountDataset, {
                          [t]: {
                            $set: {
                              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                              datasets: [{ data: this.state.medicineAmountArray }]
                            }
                          }
                        })

                      })
                    }
                    else {
                      t = this.state.medicineArray.indexOf(documentSnapshot.data().selectedMedicine)
                      this.setState({
                        medicineAmountDataset: update(this.state.medicineAmountDataset, {
                          [t]: {
                            $set: {
                              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                              datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
                            }
                          }
                        })

                      })
                    }
                  })

                  this.setState({ medicineAmountArray: [0, 0, 0, 0, 0, 0, 0] })
                  console.log(this.state.medicineUnitArray)
                  console.log(this.state.medicineAmountArray)
                  console.log(this.state.medicineAmountDataset)


                })

            }

          }
          )

        for (q = 0; q < this.state.medicineArray.length; q++) { // monthly medicine data

          firestore()
            .collection('users')
            .doc(user.uid)
            .collection('Medicine')
            .where('data', '==', 'true')
            .where('selectedMedicine', '==', this.state.medicineArray[q])
            .where('year', '==', new Date().getFullYear()) //order by date, where year is this year
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              for (j = 0; j < 12; j++) {
                querySnapshot.forEach(documentSnapshot => {
                  if (documentSnapshot.data().month == j) {
                    medicineAmountMonth = medicineAmountMonth + documentSnapshot.data().amountConsumed
                  }
                  selectedMedicine = documentSnapshot.data().selectedMedicine
                })
                this.setState({ medicineAmountArrayM: update(this.state.medicineAmountArrayM, { [j]: { $set: medicineAmountMonth } }) })
                console.log(this.state.medicineAmountArrayM)
                medicineAmountMonth = 0
              }

              let l = this.state.medicineArray.indexOf(selectedMedicine)
              this.setState({
                medicineAmountDatasetM: update(this.state.medicineAmountDatasetM, {
                  [l]: {
                    $set: {

                      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                      datasets: [{ data: this.state.medicineAmountArrayM }]

                    }
                  }
                })

              })
              console.log(this.state.medicineAmountDatasetM)

            })
          this.setState({ medicineAmountArrayM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })
        }

        for (q = 0; q < this.state.medicineArray.length; q++) { // yearly medicine data
          firestore()
            .collection('users')
            .doc(user.uid)
            .collection('Medicine')
            .where('data', '==', 'true')
            .where('selectedMedicine', '==', this.state.medicineArray[q])
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {             
              querySnapshot.forEach(documentSnapshot => {
                this.setState({ medicineYearArray: [...this.state.medicineYearArray, documentSnapshot.data().year] })
              })
              this.setState({ medicineYearArray: [...new Set(this.state.medicineYearArray)] })
              console.log(this.state.medicineYearArray)
              
              for (i = 0; i < this.state.medicineYearArray.length; i++) {
                
                firestore()
                  .collection('users')
                  .doc(user.uid)
                  .collection('Medicine')
                  .where('data', '==', 'true')
                  .where('year', '==', this.state.medicineYearArray[i])
                  .orderBy('date', 'asc')
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                      medicineAmountYear = medicineAmountYear + documentSnapshot.data().amountConsumed
                      this.setState({ medicineAmountArrayY: update(this.state.medicineAmountArrayY, { [this.state.medicineYearArray.indexOf(documentSnapshot.data().year)]: { $set: medicineAmountYear } }) })
                      this.setState({
                        medicineAmountDatasetY: update(this.state.medicineAmountDatasetY, {
                          [this.state.medicineArray.indexOf(documentSnapshot.data().selectedMedicine)]: {
                            $set: {
                              labels: this.state.medicineYearArray,
                              datasets: [{ data: this.state.medicineAmountArrayY }]
                            }
                          }
                        })

                      })
                      console.log(medicineAmountYear)
                    })
                    medicineAmountYear = 0

                  })


              }
            })
          this.setState({ medicineAmountArrayY: [] })
          this.setState({ medicineYearArray: []})

        }


      })


  }


  render() {
    let restlessnessDuration = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.restlessDur }]
    }
    let refusalDuration = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.refusalDur }]
    }
    let yellingDuration = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.yellDur }]
    }
    let wanderingDuration = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.wanderingDur }]
    }
    let hallucinationsDuration = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.hallucinationsDur }]
    }
    let sleepDuration = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.sleepDur }]
    }
    let stoolTimes = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.stoolTim }]
    }
    let urineTimes = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: this.state.urineTim }]
    }

    let restlessnessDurationM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.restlessDurM }]
    }
    let refusalDurationM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.refusalDurM }]
    }
    let yellingDurationM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.yellDurM }]
    }
    let wanderingDurationM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.wanderingDurM }]
    }
    let hallucinationsDurationM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.hallucinationsDurM }]
    }
    let sleepDurationM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.sleepDurM }]
    }
    let stoolTimesM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.stoolTimM }]
    }
    let urineTimesM = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [{ data: this.state.urineTimM }]
    }


    let restlessnessDurationY = {
      labels: this.state.behaviorYearArray,
      datasets: [{ data: this.state.restlessDurY }]
    }
    let refusalDurationY = {
      labels: this.state.behaviorYearArray,
      datasets: [{ data: this.state.refusalDurY }]
    }
    let yellingDurationY = {
      labels: this.state.behaviorYearArray,
      datasets: [{ data: this.state.yellDurY }]
    }
    let wanderingDurationY = {
      labels: this.state.behaviorYearArray,
      datasets: [{ data: this.state.wanderingDurY }]
    }
    let hallucinationsDurationY = {
      labels: this.state.behaviorYearArray,
      datasets: [{ data: this.state.hallucinationsDurY }]
    }

    let sleepDurationY = {
      labels: this.state.sleepYearArray,
      datasets: [{ data: this.state.sleepDurY }]
    }

    let stoolTimesY = {
      labels: this.state.bowelYearArray,
      datasets: [{ data: this.state.stoolTimY }]
    }

    let urineTimesY = {
      labels: this.state.bowelYearArray,
      datasets: [{ data: this.state.urineTimY }]
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
        backgroundColor: '#0000000',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 255) => `rgba(0, 50, 200, ${opacity})`,
        propsForVerticalLabels: { fontSize: 13, fontWeight: 500 },
        propsForHorizontalLabels: { fontSize: 10, fontWeight: 500 },
        fillShadowGradientToOpacity: 19000,
        fillShadowGradientFromOpacity: 5000,

        style: {
          borderRadius: 10,
          padding: 5,
          paddingTop: 20,

        }
      },
      {
        tabLabel: "Sleep",
        backgroundColor: '#0000000',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 255) => `rgba(0, 50, 200, ${opacity})`,
        propsForVerticalLabels: { fontSize: 13, fontWeight: 500 },
        propsForHorizontalLabels: { fontSize: 10, fontWeight: 500 },
        fillShadowGradientToOpacity: 19000,
        fillShadowGradientFromOpacity: 5000,

        style: {
          borderRadius: 10,
          padding: 5,
          paddingTop: 20,

        }
      },
      {
        tabLabel: "Bowel",
        backgroundColor: '#0000000',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 255) => `rgba(0, 50, 200, ${opacity})`,
        propsForVerticalLabels: { fontSize: 13, fontWeight: 500 },
        propsForHorizontalLabels: { fontSize: 10, fontWeight: 500 },
        fillShadowGradientToOpacity: 19000,
        fillShadowGradientFromOpacity: 5000,

        style: {
          borderRadius: 10,
          padding: 5,
          paddingTop: 20,

        }
      },
      {
        tabLabel: "Medication",
        backgroundColor: '#0000000',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 255) => `rgba(0, 50, 200, ${opacity})`,
        propsForVerticalLabels: { fontSize: 13, fontWeight: 500 },
        propsForHorizontalLabels: { fontSize: 10, fontWeight: 500 },
        fillShadowGradientToOpacity: 19000,
        fillShadowGradientFromOpacity: 5000,

        style: {
          borderRadius: 10,
          padding: 5,
          paddingTop: 20,

        }
      }
    ]

    const { navigation } = this.props;
    const section = navigation.getParam("section");
    const width = Dimensions.get('window').width
    const height = 220
    let medicineArrayList = null
    let medicineArrayListM = null
    let medicineArrayListY = null

    medicineArrayList = this.state.medicineArray.map((medicine, index) =>

      //call firestore function here and get all medicine data here for specific medicine
      <View key={index} tabLabel={medicine.toString()}>
        <BarChart
          tabLabel={medicine.toString()}
          width={width - 15}
          height={height}
          data={this.state.medicineAmountDataset[this.state.medicineArray.indexOf(medicine)]}
          chartConfig={chartConfig[3]}
          style={chartConfig[3].style}
          yAxisSuffix={this.state.medicineUnitArray[this.state.medicineArray.indexOf(medicine)]}
          fromZero='true'
        />
        <LineChart
          data={this.state.medicineAmountDataset[this.state.medicineArray.indexOf(medicine)]}
          width={width - 15}
          height={height}
          chartConfig={chartConfig[3]}
          style={chartConfig[3].style}
          yAxisSuffix={this.state.medicineUnitArray[this.state.medicineArray.indexOf(medicine)]}
          fromZero='true'
        />
      </View>
    );

    medicineArrayListM = this.state.medicineArray.map((medicine, index) =>

      //call firestore function here and get all medicine data here for specific medicine
      <View key={index} tabLabel={medicine.toString()}>
        <LineChart
          data={this.state.medicineAmountDatasetM[this.state.medicineArray.indexOf(medicine)]}
          width={width - 15}
          height={height}
          chartConfig={chartConfig[3]}
          style={chartConfig[3].style}
          yAxisSuffix={this.state.medicineUnitArray[this.state.medicineArray.indexOf(medicine)]}
          fromZero='true'
        />
      </View>
    );

    medicineArrayListY = this.state.medicineArray.map((medicine, index) =>
      //call firestore function here and get all medicine data here for specific medicine
      <View key={index} tabLabel={medicine.toString()}>
        <BarChart
          tabLabel={medicine.toString()}
          width={width - 15}
          height={height}
          data={this.state.medicineAmountDatasetY[this.state.medicineArray.indexOf(medicine)]}
          chartConfig={chartConfig[3]}
          style={chartConfig[3].style}
          yAxisSuffix={this.state.medicineUnitArray[this.state.medicineArray.indexOf(medicine)]}
          fromZero='true'
        />
        <LineChart
          data={this.state.medicineAmountDatasetY[this.state.medicineArray.indexOf(medicine)]}
          width={width - 15}
          height={height}
          chartConfig={chartConfig[3]}
          style={chartConfig[3].style}
          yAxisSuffix={this.state.medicineUnitArray[this.state.medicineArray.indexOf(medicine)]}
          fromZero='true'
        />
      </View>
    );





    return (
      <ScrollableTabView
        style={{ paddingTop: '15%' }}
        initialPage={0}
      >
        <Text // Weekly Data
          tabLabel='Week'
        >


          <ScrollableTabView
            style={{ paddingTop: '3%' }}
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

                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30,
                  paddingBottom: 5
                }}>
                  <Text style={{
                    paddingLeft: 20,
                    paddingRight: 10,
                  }}>
                    <Icon name="clock" size={30} color="#900" />
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Behavior Duration
                  </Text>

                </View>


                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                  tabBarTextStyle={{ fontSize: 10 }}
                >
                  <View tabLabel='Restless'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={restlessnessDuration}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={restlessnessDuration}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Refusal'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={refusalDuration}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={refusalDuration}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Yelling'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={yellingDuration}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={yellingDuration}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Wandering'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={wanderingDuration}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={wanderingDuration}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Hallucinations'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={hallucinationsDuration}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={hallucinationsDuration}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
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
                  backgroundColor: 'white'
                }}
              >
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30
                }}>
                  <Text style={{
                    paddingLeft: 15,
                    paddingRight: 10,
                  }}>
                    <Icon name="clock" size={30} color="#900" />
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Sleep Duration
                  </Text>

                </View>

                <BarChart
                  width={width}
                  height={height}
                  data={sleepDuration}
                  chartConfig={chartConfig[1]}
                  style={chartConfig[1].style}
                  yAxisSuffix=' Hrs'
                  fromZero='true'
                />
                <LineChart
                  data={sleepDuration}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[1]}
                  style={chartConfig[1].style}
                  yAxisSuffix=' Hrs'
                  fromZero='true'
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
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30, paddingLeft: 15, paddingBottom: 10
                }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Bowel Frequency
                  </Text>

                </View>
                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                >
                  <View tabLabel='Stool'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={stoolTimes}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
                    />
                    <LineChart
                      data={stoolTimes}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Urine'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={urineTimes}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
                    />
                    <LineChart
                      data={urineTimes}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
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
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30,
                  paddingBottom: 5
                }}>
                  <Text style={{
                    paddingLeft: 20,
                    paddingRight: 10,
                  }}>
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Medicine Intake
                  </Text>

                </View>
                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                  tabBarTextStyle={{ fontSize: 10 }}
                >
                  {medicineArrayList}
                </ScrollableTabView>
              </ScrollView>
            </Text>

          </ScrollableTabView>
        </Text>
        <Text //Monthly Data
          tabLabel='Month'
        >


          <ScrollableTabView
            style={{ paddingTop: '3%' }}
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

                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30,
                  paddingBottom: 5
                }}>
                  <Text style={{
                    paddingLeft: 20,
                    paddingRight: 10,
                  }}>
                    <Icon name="clock" size={30} color="#900" />
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Behavior Duration
                  </Text>

                </View>


                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                  tabBarTextStyle={{ fontSize: 10 }}
                >
                  <View tabLabel='Restless'>
                    <LineChart
                      data={restlessnessDurationM}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'

                    />
                  </View>
                  <View tabLabel='Refusal'>
                    <LineChart
                      data={refusalDurationM}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                    />
                  </View>
                  <View tabLabel='Yelling'>
                    <LineChart
                      data={yellingDurationM}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Wandering'>
                    <LineChart
                      data={wanderingDurationM}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                    />
                  </View>
                  <View tabLabel='Hallucinations'>
                    <LineChart
                      data={hallucinationsDurationM}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
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
                  backgroundColor: 'white'
                }}
              >
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30
                }}>
                  <Text style={{
                    paddingLeft: 15,
                    paddingRight: 10,
                  }}>
                    <Icon name="clock" size={30} color="#900" />
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Sleep Duration
                  </Text>

                </View>

                <LineChart
                  data={sleepDurationM}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[1]}
                  style={chartConfig[1].style}
                  yAxisSuffix=' Hrs'
                  fromZero='true'
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
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30, paddingLeft: 15, paddingBottom: 10
                }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Bowel Frequency
                  </Text>

                </View>
                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                >
                  <View tabLabel='Stool'>
                    <LineChart
                      data={stoolTimesM}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Urine'>
                    <LineChart
                      data={urineTimesM}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[2]}
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
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30,
                  paddingBottom: 5
                }}>
                  <Text style={{
                    paddingLeft: 20,
                    paddingRight: 10,
                  }}>
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Medicine Intake
                  </Text>

                </View>
                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                  tabBarTextStyle={{ fontSize: 10 }}
                >
                  {medicineArrayListM}
                </ScrollableTabView>
              </ScrollView>
            </Text>

          </ScrollableTabView>
        </Text>
        <Text //Yearly Data
          tabLabel='Year'
        >


          <ScrollableTabView
            style={{ paddingTop: '3%' }}
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

                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30,
                  paddingBottom: 5
                }}>
                  <Text style={{
                    paddingLeft: 20,
                    paddingRight: 10,
                  }}>
                    <Icon name="clock" size={30} color="#900" />
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Behavior Duration
                  </Text>

                </View>


                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                  tabBarTextStyle={{ fontSize: 10 }}
                >
                  <View tabLabel='Restless'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={restlessnessDurationY}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={restlessnessDurationY}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Refusal'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={refusalDurationY}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={refusalDurationY}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Yelling'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={yellingDurationY}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={yellingDurationY}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />

                  </View>
                  <View tabLabel='Wandering'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={wanderingDurationY}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={wanderingDurationY}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Hallucinations'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={hallucinationsDurationY}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
                    />
                    <LineChart
                      data={hallucinationsDurationY}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[0]}
                      style={chartConfig[0].style}
                      yAxisSuffix=' min'
                      fromZero='true'
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
                  backgroundColor: 'white'
                }}
              >
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30
                }}>
                  <Text style={{
                    paddingLeft: 15,
                    paddingRight: 10,
                  }}>
                    <Icon name="clock" size={30} color="#900" />
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Sleep Duration
                  </Text>

                </View>

                <BarChart
                  width={width}
                  height={height}
                  data={sleepDurationY}
                  chartConfig={chartConfig[1]}
                  style={chartConfig[1].style}
                  yAxisSuffix=' Hrs'
                  fromZero='true'
                />
                <LineChart
                  data={sleepDurationY}
                  width={width}
                  height={height}
                  chartConfig={chartConfig[1]}
                  style={chartConfig[1].style}
                  yAxisSuffix=' Hrs'
                  fromZero='true'
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
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30, paddingLeft: 15, paddingBottom: 10
                }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Bowel Frequency
                  </Text>

                </View>
                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                >
                  <View tabLabel='Stool'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={stoolTimesY}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
                    />
                    <LineChart
                      data={stoolTimesY}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
                    />
                  </View>
                  <View tabLabel='Urine'>
                    <BarChart
                      width={width - 15}
                      height={height}
                      data={urineTimesY}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
                    />
                    <LineChart
                      data={urineTimesY}
                      width={width}
                      height={height}
                      chartConfig={chartConfig[2]}
                      style={chartConfig[2].style}
                      fromZero='true'
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
                <View style={{
                  flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingTop: 30,
                  paddingBottom: 5
                }}>
                  <Text style={{
                    paddingLeft: 20,
                    paddingRight: 10,
                  }}>
                  </Text>
                  <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: "bold",
                    fontFamily: 'Verdana',
                  }}>
                    Medicine Intake
                  </Text>

                </View>
                <ScrollableTabView
                  initialPage={0}
                  style={{ backgroundColor: 'white' }}
                  tabBarTextStyle={{ fontSize: 10 }}
                >
                  {medicineArrayListY}
                </ScrollableTabView>
              </ScrollView>
            </Text>

          </ScrollableTabView>
        </Text>
      </ScrollableTabView>

    );
  }
}


export default ChartScreen;

