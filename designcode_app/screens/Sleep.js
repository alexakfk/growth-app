import styled from "styled-components";
import {
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Text,
  Button,
  View,
  TextInput,
} from "react-native";

import React,{ useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import DatePicker from 'react-native-date-picker'


export default function SleepScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [open1, setOpen1] = useState(false)
  const [endDate, setEndDate] = useState(new Date());
  const [open2, setOpen2] = useState(false)
  const [note, setNote] = React.useState("");
  var am_pm1 = startDate.getHours() >= 12 ? "PM" : "AM";
  var am_pm2 = startDate.getHours() >= 12 ? "PM" : "AM";

  const cancel = () => {
    
  }

  const onPress = () => {
    console.log(startDate.getMonth() + '/' + startDate.getDate() + '/' + startDate.getFullYear())
    console.log(endDate.getMonth() + '/' + endDate.getDate() + '/' + startDate.getFullYear())
    console.log(startDate.getHours() + ':' + startDate.getMinutes())
    console.log(endDate.getHours() + ':' + endDate.getMinutes())
    console.log(note)
    console.log((Math.floor(Math.abs(endDate - startDate) / (1000*60*60))) + ' Hours ' + ((Math.round(Math.abs(endDate - startDate) / (1000*60))) - ((Math.floor(Math.abs(endDate - startDate) / (1000*60*60))) * 60)) + ' Minutes')
   
  }

  return(
    <View style={styles.container}>
      <Title>Add Sleep</Title>
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
      <View>
        <Text>{startDate.getMonth() + '/' + startDate.getDate() + '/' + startDate.getFullYear()} {startDate.getHours() + ':' + startDate.getMinutes() + am_pm1}</Text>
      </View>
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
      <View>
        <Text>{endDate.getMonth() + '/' + endDate.getDate() + '/' + endDate.getFullYear()} {endDate.getHours() + ':' + endDate.getMinutes() + am_pm2}</Text>
      </View>

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
  )
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


 

