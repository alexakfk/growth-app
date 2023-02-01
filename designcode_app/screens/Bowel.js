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
  TouchableOpacity
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import DatePicker from "react-native-date-picker";
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
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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

const BowelLog = () => {
  const [bowelStartTime, setBowelStartTime] = useState(new Date());
  const [bowelEndTime, setBowelEndTime] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    // Send bowel data to backend
    console.log("type", selectedOption);
    console.log("bowelStartTime", bowelStartTime);
    console.log("bowelEndTime", bowelEndTime);
    console.log("notes", notes);
  };

  return (
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
        <Text>Start Time:</Text>
        <DatePicker date={bowelStartTime} onDateChange={setBowelStartTime} />
      </View>
      <View>
        <Text>End Time:</Text>
        <DatePicker date={bowelEndTime} onDateChange={setBowelEndTime} />
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
  );
};

export default BowelLog;