import React, { useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from "react-native-dropdown-picker";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EStyleSheet from 'react-native-extended-stylesheet';


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

const BehaviorScreen = (navigation) => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const [notes, setNotes] = React.useState("");
  const user = auth().currentUser

  const onOpen = () => {
    setOpen2(false);
  };
  const onOpen2 = () => {
    setOpen(false);
  };

  const onPress = () => {
    const now = new Date();
    const now2 = new Date();
    now2.setHours(now.getHours(), now.getMinutes() + (selectedOption2))
    const initialDate = ({ date: now, time: now.toLocaleTimeString() })
    const date1 = new Date().toDateString()
    const time = (now2.toLocaleTimeString())
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .add({
        initialDate,
        date1,
        time,
        selectedOption,
        notes,
        selectedOption2
      })

    console.log(selectedOption);
    console.log(selectedOption2)
    console.log(notes);
    let behaviorsArray = []
    let restlessnessDuration = null
    let refusalDuration = null
    let yellingDuration = null
    let wanderingDuration = null
    let hallucinationsDuration = null
    const Month = (new Date().getMonth() + 1)
    const Day = new Date().getDate()
    const Year = (new Date().getFullYear())
    const dayOfTheWeek = new Date().getDay()
    let dateArray = []
    let daysOfTheWeekArray = []
    let week = null
    let days = null
    let dateArray2 = []
    let daysOfTheWeekArray2 = []
    let week2 = null
    let days2 = null
    let dateArray3 = []
    let daysOfTheWeekArray3 = []
    let week3 = null
    let days3 = null
    let dateArray4 = []
    let daysOfTheWeekArray4 = []
    let week4 = null
    let days4 = null
    let dateArray5 = []
    let daysOfTheWeekArray5 = []
    let week5 = null
    let days5 = null



    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('date1', '==', new Date().toDateString())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          behaviorsArray = [...behaviorsArray, documentSnapshot.data()]

        })
        console.log(behaviorsArray)

        for (let i = 0; i < behaviorsArray.length; i++) {
          if (behaviorsArray[i].selectedOption == 'Restlessness') {
            restlessnessDuration = restlessnessDuration + behaviorsArray[i].selectedOption2
          }
          if (behaviorsArray[i].selectedOption == 'Refusal') {
            refusalDuration = refusalDuration + behaviorsArray[i].selectedOption2
          }
          if (behaviorsArray[i].selectedOption == 'Yelling') {
            yellingDuration = yellingDuration + behaviorsArray[i].selectedOption2
          }
          if (behaviorsArray[i].selectedOption == 'Wandering') {
            wanderingDuration = wanderingDuration + behaviorsArray[i].selectedOption2
          }
          if (behaviorsArray[i].selectedOption == 'Hallucinations') {
            hallucinationsDuration = hallucinationsDuration + behaviorsArray[i].selectedOption2
          }
        }

        if (selectedOption == 'Restlessness') {
          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('data', '==', 'true')
            .where('selectedOption2', '==', 'Restlessness')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray = [...dateArray, documentSnapshot.data().date]
                daysOfTheWeekArray = [...daysOfTheWeekArray, documentSnapshot.data().dayOfTheWeek]
              })

              if (dateArray.length == 0) {
                days = 1 // get days since first data added
              }
              else {
                days = (Math.ceil((new Date().getTime() - dateArray[0]) / (1000 * 60 * 60 * 24))) + 1
              } // get days since first data added

      
              
              if (daysOfTheWeekArray.length == 0) { // get week of added data
                week = 1
              }
              else {
                week = Math.ceil((days + (daysOfTheWeekArray[0])) / 7)
              }


              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Behaviors')
                .doc(`${Month} ${Day} ${Year} Restlessness`)
                .set
                ({
                  date: (new Date().getTime()),
                  selectedOption2: 'Restlessness',
                  days: days,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week,
                  restlessnessDuration: restlessnessDuration,
                  data: 'true',
                  month: new Date().getMonth(),
                  year: new Date().getFullYear().toString()
                })

            })
        }

        if (selectedOption == 'Refusal') {
          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('data', '==', 'true')
            .where('selectedOption2', '==', 'Refusal')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray2 = [...dateArray2, documentSnapshot.data().date]
                daysOfTheWeekArray2 = [...daysOfTheWeekArray2, documentSnapshot.data().dayOfTheWeek]
              })

              if (dateArray2.length == 0) {
                days2 = 1 // get days since first data added
              }
              else {
                days2 = (Math.ceil((new Date().getTime() - dateArray2[0]) / (1000 * 60 * 60 * 24))) + 1
              }

              if (daysOfTheWeekArray2.length == 0) { // get week of added data
                week2 = 1
              }
              else {
                week2 = Math.ceil((days2 + (daysOfTheWeekArray2[0])) / 7)
              }


              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Behaviors')
                .doc(`${Month} ${Day} ${Year} Refusal`)
                .set
                ({
                  date: (new Date().getTime()),
                  selectedOption2: 'Refusal',
                  days: days2,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week2,
                  refusalDuration: refusalDuration,
                  data: 'true',
                  month: new Date().getMonth(),
                  year: new Date().getFullYear().toString()
                })

            })
        }

        if (selectedOption == 'Yelling') {
          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('data', '==', 'true')
            .where('selectedOption2', '==', 'Yelling')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray3 = [...dateArray3, documentSnapshot.data().date]
                daysOfTheWeekArray3 = [...daysOfTheWeekArray3, documentSnapshot.data().dayOfTheWeek]
              })

              if (dateArray3.length == 0) {
                days3 = 1 // get days since first data added
              }
              else {
                days3 = (Math.ceil((new Date().getTime() - dateArray3[0]) / (1000 * 60 * 60 * 24))) + 1
              }

              if (daysOfTheWeekArray3.length == 0) { // get week of added data
                week3 = 1
              }
              else {
                week3 = Math.ceil((days3 + (daysOfTheWeekArray3[0])) / 7)
              }


              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Behaviors')
                .doc(`${Month} ${Day} ${Year} Yelling`)
                .set
                ({
                  date: (new Date().getTime()),
                  selectedOption2: 'Yelling',
                  days: days3,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week3,
                  yellingDuration: yellingDuration,
                  data: 'true',
                  month: new Date().getMonth(),
                  year: new Date().getFullYear().toString()
                })

            })
        }

        if (selectedOption == 'Wandering') {
          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('data', '==', 'true')
            .where('selectedOption2', '==', 'Wandering')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray4 = [...dateArray4, documentSnapshot.data().date]
                daysOfTheWeekArray4 = [...daysOfTheWeekArray4, documentSnapshot.data().dayOfTheWeek]
              })

              if (dateArray4.length == 0) {
                days4 = 1 // get days since first data added
              }
              else {
                days4 = (Math.ceil((new Date().getTime() - dateArray4[0]) / (1000 * 60 * 60 * 24))) + 1
              }

              if (daysOfTheWeekArray4.length == 0) { // get week of added data
                week4 = 1
              }
              else {
                week4 = Math.ceil((days4 + (daysOfTheWeekArray4[0])) / 7)
              }


              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Behaviors')
                .doc(`${Month} ${Day} ${Year} Wandering`)
                .set
                ({
                  date: (new Date().getTime()),
                  selectedOption2: 'Wandering',
                  days: days4,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week4,
                  wanderingDuration: wanderingDuration,
                  data: 'true',
                  month: new Date().getMonth(),
                  year: new Date().getFullYear().toString()
                })

            })
        }

        if (selectedOption == 'Hallucinations') {
          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Behaviors')
            .where('data', '==', 'true')
            .where('selectedOption2', '==', 'Hallucinations')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray5 = [...dateArray5, documentSnapshot.data().date]
                daysOfTheWeekArray5 = [...daysOfTheWeekArray5, documentSnapshot.data().dayOfTheWeek]
              })

              if (dateArray5.length == 0) {
                days5 = 1 // get days since first data added
              }
              else {
                days5 = (Math.ceil((new Date().getTime() - dateArray5[0]) / (1000 * 60 * 60 * 24))) + 1
              }

              if (daysOfTheWeekArray5.length == 0) { // get week of added data
                week5 = 1
              }
              else {
                week5 = Math.ceil((days5 + (daysOfTheWeekArray5[0])) / 7)
              }


              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Behaviors')
                .doc(`${Month} ${Day} ${Year} Hallucinations`)
                .set
                ({
                  date: (new Date().getTime()),
                  selectedOption2: 'Hallucinations',
                  days: days5,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week5,
                  hallucinationsDuration: hallucinationsDuration,
                  data: 'true',
                  month: new Date().getMonth(),
                  year: new Date().getFullYear().toString()
                })

            })
        }

      })



  };

  const cancel = () => { };



  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
      <Text style={styles.title}>Behaviors</Text>
      <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker1}
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
          >
            <Picker.Item label="Behavior" value="" />
            <Picker.Item label="Restlessness/Pacing" value = "Restlessness" />
            <Picker.Item label="Refusal to Bathe" value= "Refusal" />
            <Picker.Item label="Yelling/Cursing" value= "Yelling" />
            <Picker.Item label="Wandering" value= "Wandering" />
            <Picker.Item label="Hallucinations/Delusions" value= "Hallucinations" />
          </Picker>
          <Picker
            style={styles.picker2}
            selectedValue={selectedOption2}
            onValueChange={(itemValue) => setSelectedOption2(itemValue)}
          >
            <Picker.Item label="Duration" value="" />
            <Picker.Item label="5 mins" value={5} />
            <Picker.Item label="10 mins" value={10} />
            <Picker.Item label="15 mins" value={15} />
            <Picker.Item label="20 mins" value={20} />
            <Picker.Item label="25 mins" value={25} />
            <Picker.Item label="30 mins" value={30} />
            <Picker.Item label="35 mins" value={35} />
            <Picker.Item label="40 mins" value={40} />
            <Picker.Item label="45 mins" value={45} />
            <Picker.Item label="50 mins" value={50} />
            <Picker.Item label="55 mins" value={55} />
            <Picker.Item label="60 mins" value={60} />
          </Picker>
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
  );
}

BehaviorScreen.navigationOptions = {
  headerShown: false,
};

export default BehaviorScreen;
