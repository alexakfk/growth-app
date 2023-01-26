import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import DatePicker from "react-native-datepicker";
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
  submitButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: 10
  }
});

const SleepScreen = () => {
  const [sleepStartTime, setSleepStartTime] = useState(new Date());
  const [sleepEndTime, setSleepEndTime] = useState(new Date());
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    // Send sleep data to backend
    console.log("sleepStartTime", sleepStartTime);
    console.log("sleepEndTime", sleepEndTime);
    console.log("notes", notes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep</Text>
      <View>
        <Text>Sleep Start Time:</Text>
        <View style={styles.timeContainer}>
          <DatePicker
            date={sleepStartTime}
            onDateChange={setSleepStartTime}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                margin: "1rem",
                marginLeft: "0rem"
              }
            }}
          />
        </View>
      </View>
      <View>
        <Text>Sleep End Time:</Text>
        <View style={styles.timeContainer}>
          <DatePicker
            date={sleepEndTime}
            onDateChange={setSleepEndTime}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                margin: "1rem",
                marginLeft: "0rem"
              }
            }}
          />
        </View>
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

export default SleepScreen;