/* import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Bowel() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());

  const [items, setItems] = useState([
    { value: "stool", label: "Stool" },
    { value: "urine", label: "Urine" },
  ]);

  const [note, setNote] = React.useState("");
  const user = auth().currentUser

  const onPress = () => {
    console.log(selectedOption);
    console.log(dateValue);
    console.log(dateValue.toLocaleTimeString());
    console.log(note);

    const date = ({date: dateValue, time: dateValue.toLocaleTimeString()})
    firestore().collection('users').doc(user.uid).collection('Bowel').add({
      date,
      selectedOption,
      note
    })
  };

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateValue(currentDate);
  };

  const timeChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setTimeValue(currentTime);
  };

  const cancel = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Icon.Button
          name={"cross"}
          onPress={cancel}
          style={styles.checkButton}
        ></Icon.Button>
        <Icon.Button
          name={"check"}
          onPress={onPress}
          style={styles.checkButton}
        ></Icon.Button>

        <DateTimePicker
          onChange={dateChange}
          style={{ float: "left" }}
          width="40%"
          value={dateValue}
        />
        <DateTimePicker
          onChange={timeChange}
          style={{}}
          mode="time"
          value={timeValue}
        />

        <DropDownPicker
          open={open}
          value={selectedOption}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedOption}
          setItems={setItems}
          style={styles.dropdownPicker}
        />

        <TextInput
          value={note}
          onChangeText={setNote}
          style={styles.note}
          multiline={true}
          keyboardType="default"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  checkButton: {
    float: "left",
    width: "60%",
  },
  dropdownPicker: {},
  note: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#D4FFAA",
    height: "20%",
    textAlignVertical: "top",
    border: "none",
  },
}); */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import DatePicker from "react-native-date-picker";
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
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sub: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    paddingBottom: "0.5rem"
  },
  picker1: {
    flex: 1,
    marginBottom: "0.5rem",
    marginTop: "0.5rem"
  },
  submitButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: 10
  }
});

const BowelLog = (navigation) => {
  const [bowelStartTime, setBowelStartTime] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false)
  const user = auth().currentUser

  const handleSubmit = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Bowel')
      .add({
        date1: new Date().toDateString(),
        bowelStartTime,
        selectedOption,
        notes,
      })

    console.log(selectedOption);
    console.log(notes);
    let bowelArray = []
    let stoolTimes = null
    let urineTimes = null
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

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Bowel')
      .where('date1', '==', new Date().toDateString())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          bowelArray = [...bowelArray, documentSnapshot.data()]

        })
        console.log(bowelArray)

        for (let i = 0; i < bowelArray.length; i++) {
          if (bowelArray[i].selectedOption == 'stool') {
            stoolTimes = stoolTimes + 1
          }
          if (bowelArray[i].selectedOption == 'urine') {
            urineTimes = urineTimes + 1
          }
        }

        if (selectedOption == 'stool') {
          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Bowel')
            .where('data', '==', 'true')
            .where('selectedOption', '==', 'Stool')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray = [...dateArray, documentSnapshot.data().date]
                daysOfTheWeekArray = [...daysOfTheWeekArray, documentSnapshot.data().dayOfTheWeek]
              })

              if (dateArray.length == 0) {
                days = 0 + daysOfTheWeekArray[0] // get days since first data added
              }
              else {
                days = (Math.ceil(((new Date().getTime() - dateArray[0]) + daysOfTheWeekArray[0]) / (1000 * 60 * 60 * 24))) + 1
              } // get days since first data added

      
              
              if (daysOfTheWeekArray.length == 0) { // get week of added data
                week = 1
              }
              else {
                week = Math.ceil(days / 7)
              }


              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Bowel')
                .doc(`${Month} ${Day} ${Year} Stool`)
                .set
                ({
                  date: (new Date().getTime()),
                  dateString: new Date().toLocaleDateString(),
                  selectedOption: 'Stool',
                  dataType: 'Bowel',
                  days: days,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week,
                  stoolTimes: stoolTimes,
                  data: 'true',
                  month: new Date().getMonth(),
                  year: new Date().getFullYear().toString()
                })

            })
        }

        if (selectedOption == 'urine') {
          firestore() // sort data and get first data sent to firestore
            .collection('users')
            .doc(user.uid)
            .collection('Bowel')
            .where('data', '==', 'true')
            .where('selectedOption', '==', 'Urine')
            .orderBy('date', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                dateArray2 = [...dateArray2, documentSnapshot.data().date]
                daysOfTheWeekArray2 = [...daysOfTheWeekArray2, documentSnapshot.data().dayOfTheWeek]
              })

              
              if (dateArray2.length == 0) {
                days2 = 0 + daysOfTheWeekArray2[0] // get days since first data added
              }
              else {
                days2 = (Math.ceil(((new Date().getTime() - dateArray2[0]) + daysOfTheWeekArray2[0]) / (1000 * 60 * 60 * 24))) + 1
              } // get days since first data added

      
              
              if (daysOfTheWeekArray2.length == 0) { // get week of added data
                week2 = 1
              }
              else {
                week2 = Math.ceil(days2/ 7)
              }


              firestore() // complete behavior data to firestore
                .collection('users')
                .doc(user.uid)
                .collection('Bowel')
                .doc(`${Month} ${Day} ${Year} Urine`)
                .set
                ({
                  date: (new Date().getTime()), // subtract these two dates
                  dateString: new Date().toLocaleDateString(),
                  selectedOption: 'Urine',
                  dataType: 'Bowel',
                  days: days2,
                  dayOfTheWeek: dayOfTheWeek,
                  week: week2,
                  urineTimes: urineTimes,
                  data: 'true',
                  month: new Date().getMonth(),
                  year: new Date().getFullYear().toString()
                })

            })
        }

      })

    // Send bowel data to backend
    console.log("type", selectedOption);
    console.log("bowelStartTime", bowelStartTime);
    console.log("notes", notes);
  };

  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Bowel Movement</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker1}
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
        >
          <Picker.Item label="Type" value="" />
          <Picker.Item label="Stool" value="stool" />
          <Picker.Item label="Urine" value="urine" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <View>
        <Text style={styles.sub}>Start Time:</Text>
        <Button title="Click Here to Set Start Time" onPress={() => setOpen(true)} />
        <DatePicker 
        modal 
        open={open}
        date={bowelStartTime} 
        onDateChange={setBowelStartTime} 
        onConfirm={(bowelStartTime) => {
          setOpen(false)
          setBowelStartTime(bowelStartTime)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        />
        <Text>{bowelStartTime.toLocaleTimeString()}</Text>
      </View>
      <TextInput
        style={styles.notes}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes (optional)"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

BowelLog.navigationOptions = {
  headerShown: false,
};

export default BowelLog;