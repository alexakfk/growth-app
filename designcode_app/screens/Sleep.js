import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  Button,
  View,
  TextInput,
} from "react-native";
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const styles = EStyleSheet.create({
  container: {
    padding: "1rem",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    paddingBottom: "0.5rem"
  },
  timeContainer: {
    paddingBottom: "1rem",
    paddingTop: "0.5rem"
  },
  notes: {
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 10,
    padding: "0.5rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    fontSize: 16
  },
  sub: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    paddingBottom: "0.5rem"
  },
  submitButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: 10
  }
});


const SleepScreen = (navigation) => {
  const [startDate, setStartDate] = useState(new Date());
  const [open1, setOpen1] = useState(false)
  const [endDate, setEndDate] = useState(new Date());
  const [open2, setOpen2] = useState(false)
  const [notes, setNotes] = React.useState("");
  var am_pm1 = startDate.getHours() >= 12 ? "PM" : "AM";
  var am_pm2 = startDate.getHours() >= 12 ? "PM" : "AM";
  const user = auth().currentUser

  const onPress = () => {
    console.log(startDate.getMonth() + '/' + startDate.getDate() + '/' + startDate.getFullYear())
    console.log(endDate.getMonth() + '/' + endDate.getDate() + '/' + startDate.getFullYear())
    console.log(startDate.getHours() + ':' + startDate.getMinutes())
    console.log(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        endDate.getHours() + ':' + endDate.getMinutes())
    console.log(notes)
    const duration = (Math.abs(endDate - startDate) / (1000 * 60 * 60))                                                                                                                                                                          
    let initialDate = ({ date: startDate, time: startDate.toLocaleTimeString() })
    let finalDate = ({ endDate: endDate, time: endDate.toLocaleTimeString() })
    let sleepDuration = null

    firestore().collection('users').doc(user.uid).collection('Sleep').add({ //add data to firestore
      date: new Date().toDateString(),
      initialDate,
      finalDate,
      notes,
      duration
    })
 
    const Month = (new Date().getMonth() + 1)
    const Day = new Date().getDate()
    const Year = (new Date().getFullYear())
    let dayOfTheWeek = new Date().getDay()
    let dateArray = []
    let daysOfTheWeekArray = []
    let week = null
    let days = null
    let sleepDurationArray = []

    firestore() 
      .collection('users')
      .doc(user.uid)
      .collection('Sleep')
      .where('date', '==', new Date().toDateString()) //if data is from today,
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          sleepDurationArray = [...sleepDurationArray, documentSnapshot.data()]

        })

        for (let i = 0; i < sleepDurationArray.length; i++) {
            sleepDuration = sleepDuration + sleepDurationArray[i].duration
        }

          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Sleep')
            .where('data', '==', 'true')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray = [...dateArray, documentSnapshot.data().date]
                daysOfTheWeekArray = [...daysOfTheWeekArray, documentSnapshot.data().dayOfTheWeek]
              })

              if (dateArray.length == 0 || dateArray.length == 1) {
                days = 1 // get days since first data added
              }
              else {
                days = (((new Date().getTime()- dateArray[0]) / (1000 * 60 * 60 * 24)))
              }

              if (daysOfTheWeekArray.length == 0) { // get week of added data
                week = 1
              }
              else {
                week = Math.ceil((days + (daysOfTheWeekArray[0])) / 7)
              }

              if(dayOfTheWeek == 0){
                dayOfTheWeek = 6
              }
              else{
                dayOfTheWeek = dayOfTheWeek - 1
              }

              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Sleep')
                .doc(`${Month} ${Day} ${Year}`)
                .set
                ({
                  date: (new Date().getTime()),
                  days: days,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week,
                  duration: sleepDuration,
                  data: 'true'
                })

            })
      })

  }

  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>
    <Text style={styles.title}>Sleep</Text>
        <View style={styles.timeContainer}>
        <Text style={styles.sub}>Sleep Start Time:</Text>
        <Button title="Open" onPress={() => setOpen1(true)} />
      <DatePicker
        modal
        open={open1}
        date={startDate}
        onConfirm={(startDate) => {
          setOpen1(false)
          setStartDate(startDate)
        }}
        onCancel={() => {
          setOpen1(false)
        }}
      />
      <Text>{startDate.getMonth() + '/' + startDate.getDate() + '/' + startDate.getFullYear()} {startDate.getHours() + ':' + startDate.getMinutes() + am_pm1}</Text>
    </View>

    <View style={styles.timeContainer}>
      <Text style={styles.sub}>Sleep End Time:</Text>
      <Button title="Open" onPress={() => setOpen2(true)} />
      <DatePicker
        modal
        open={open2}
        date={endDate}
        onConfirm={(endDate) => {
          setOpen2(false)
          setEndDate(endDate)
        }}
        onCancel={() => {
          setOpen2(false)
        }}
      />
      <Text>{endDate.getMonth() + '/' + endDate.getDate() + '/' + endDate.getFullYear()} {endDate.getHours() + ':' + endDate.getMinutes() + am_pm2}</Text>
      </View>

      <TextInput
        style={styles.notes}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes (optional)"
      />

      <TouchableOpacity style={styles.submitButton} onPress={onPress}>
        <Text>Submit</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

SleepScreen.navigationOptions = {
  headerShown: false,
};

export default SleepScreen;