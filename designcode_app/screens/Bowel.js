import React, { useState } from "react";
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
    const date = ({date: dateValue, time: dateValue.toLocaleTimeString()})
    console.log(note);
    firestore().collection('users').doc(user.uid).collection('Bowel').add({
      date,
      selectedOption
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
});
