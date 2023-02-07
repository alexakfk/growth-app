import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default function BehaviourScreen() {

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [items, setItems] = useState([
    { value: "Restlessness", label: "Restlessness/Pacing" },
    { value: "Refusal", label: "Refusal to Bathe" },
    { value: "Yelling", label: "Yelling/Cursing" },
    { value: "Wandering", label: "Wandering" },
    { value: "Hallucinations", label: "Hallucinations/Delusions" },
  ]);
  const [open2, setOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [items2, setItems2] = useState([
    { value: 5, label: "5 min" },
    { value: 10, label: "10 min" },
    { value: 15, label: "15 min" },
    { value: 20, label: "20 min" },
    { value: 25, label: "25 min" },
    { value: 30, label: "30 min" },
    { value: 35, label: "35 min" },
    { value: 40, label: "40 min" },
    { value: 45, label: "45 min" },
    { value: 50, label: "50 min" },
    { value: 55, label: "55 min" },
    { value: 60, label: "60 min" },
  ]);
  const [note, setNote] = React.useState("");
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
        note,
        selectedOption2
      })

    console.log(selectedOption);
    console.log(selectedOption2)
    console.log(note);
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
                days = (Math.ceil((new Date().getTime() - dateArray[0]) / (1000 * 60 * 60 * 24)))
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
                  data: 'true'
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

              if (dateArray2.length == 0 || dateArray2.length == 1) {
                days2 = 1 // get days since first data added
              }
              else {
                days2 = (Math.ceil((new Date().getTime() - dateArray2[0]) / (1000 * 60 * 60 * 24)))
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
                  data: 'true'
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

              if (dateArray3.length == 0 || dateArray3.length == 1) {
                days3 = 1 // get days since first data added
              }
              else {
                days3 = (Math.ceil((new Date().getTime() - dateArray3[0]) / (1000 * 60 * 60 * 24)))
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
                  data: 'true'
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

              if (dateArray4.length == 0 || dateArray5.length == 1) {
                days4 = 1 // get days since first data added
              }
              else {
                days4 = (Math.ceil((new Date().getTime() - dateArray4[0]) / (1000 * 60 * 60 * 24)))
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
                  data: 'true'
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

              if (dateArray5.length == 0 || dateArray5.length == 1) {
                days5 = 1 // get days since first data added
              }
              else {
                days5 = (Math.ceil((new Date().getTime() - dateArray5[0]) / (1000 * 60 * 60 * 24)))
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
                  data: 'true'
                })

            })
        }

      })



  };

  const cancel = () => { };



  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedOption}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedOption}
        setItems={setItems}
        onOpen={onOpen}
        style={styles.dropdownPicker}
        containerStyle={{ marginTop: 50, zIndex: 2 }}
      />
      <DropDownPicker
        open={open2}
        value={selectedOption2}
        items={items2}
        setOpen={setOpen2}
        setValue={setSelectedOption2}
        setItems={setItems2}
        onOpen={onOpen2}
        style={styles.dropdownPicker2}
        containerStyle={{ zIndex: 1, marginBottom: 0 }}
      />
      <TextInput
        value={note}
        onChangeText={setNote}
        style={styles.note}
        multiline={true}

      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={cancel}>
          <Ionicons name="close-outline" size={34} color="white" />
        </Pressable>
        <Pressable style={styles.button} onPress={onPress}>
          <Ionicons name="checkmark-outline" size={34} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#f0f3f5",
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#4775F2",
    width: "40%",
    margin: 20,
    top: 90,
  },
  checkButton: {
    float: "left",
    width: 50,
  },
  note: {
    margin: 20,
    borderWidth: 1.5,
    borderColor: "rgb(115,194,255)",
    padding: 10,
    backgroundColor: "rgba(115,194,251,0.5)",
    height: "35%",
    textAlignVertical: "top",
    border: "none",
    marginTop: 80,
  },
});

const Title = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: bold;
  width: 200px;
  position: absolute;
  margin-top: 5%;
  margin-left: 2%;
`;
