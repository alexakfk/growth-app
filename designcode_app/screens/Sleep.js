import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button
} from "react-native";
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

const SleepLog = (navigation) => {
  const [sleepStartTime, setSleepStartTime] = useState(new Date());
  const [sleepEndTime, setSleepEndTime] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    // Send sleep data to backend
    console.log("sleepStartTime", sleepStartTime);
    console.log("sleepEndTime", sleepEndTime);
    console.log("notes", notes);
  };

  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Sleep</Text>
      <View>
        <Text style={styles.sub}>Sleep Start Time:</Text>
        <View style={styles.timeContainer}>
        <Button title="Click Here to Set Start Time" onPress={() => setOpen(true)} />
        <DatePicker 
        modal 
        open={open}
        date={sleepStartTime} 
        onDateChange={setSleepStartTime} 
        onConfirm={(sleepStartTime) => {
          setOpen(false)
          setSleepStartTime(sleepStartTime)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        />
        <Text>{sleepStartTime.toLocaleTimeString()}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.sub}>Sleep End Time:</Text>
        <View style={styles.timeContainer}>
        <Button title="Click Here to Set End Time" onPress={() => setOpen(true)} />
        <DatePicker 
        modal 
        open={open}
        date={sleepEndTime} 
        onDateChange={setSleepEndTime} 
        onConfirm={(sleepEndTime) => {
          setOpen(false)
          setSleepEndTime(sleepEndTime)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        />
        <Text>{sleepEndTime.toLocaleTimeString()}</Text>
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
    </ScrollView>
    </SafeAreaView>
  );
};

SleepLog.navigationOptions = {
  headerShown: false,
};

export default SleepLog;