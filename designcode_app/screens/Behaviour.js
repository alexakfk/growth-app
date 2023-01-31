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
  const [behaviors, setBehaviors] = React.useState("");
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
    now2.setHours(now.getHours(),now.getMinutes()+(selectedOption2))
    const initialDate = ({date:now, time:now.toLocaleTimeString()})
    const date = new Date().toDateString()
    const time = (now2.toLocaleTimeString())
    firestore().collection('users').doc(user.uid).collection('Behaviors').add({
      initialDate,
      date,
      time,
      selectedOption,
      note,
      selectedOption2
    })

    console.log(selectedOption);
    console.log(selectedOption2)
    console.log(note);
    const behaviorsArray = []
    let restlessnessDuration = null
    let refusalDuration = null
    let yellingDuration = null
    let wanderingDuration = null
    let hallucinationsDuration = null
    let today = null
    const Month = (new Date().getMonth() + 1)
    const Day = (new Date().getDate() - new Date().getDay())
    const Year = (new Date().getFullYear())
    const dayOfTheWeek = new Date().getDay()
    let dateArray = []
    let firstDate = null
  
    firestore()
    .collection('users')
    .doc(user.uid)
    .collection('Behaviors')
    .where('date', '==', new Date().toDateString())
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
      behaviorsArray.push({
        ...documentSnapshot.data()
      })
    
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

      
      firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        dateArray.push({
          ...documentSnapshot.data().date
        })
        
        })
        console.log(dateArray)
      })
      

      firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .doc(`${Month} ${Day} ${Year} (${dayOfTheWeek})`)
      .set
      ({
        date: (new Date().toDateString()),
        restlessnessDuration: restlessnessDuration,
        refusalDuration: refusalDuration,
        yellingDuration: yellingDuration,
        wanderingDuration: wanderingDuration,
        hallucinationsDuration: hallucinationsDuration,
        data: 'true'
      })
    
    })
  
  };

  const cancel = () => {};

 

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
        containerStyle={{ zIndex: 1, marginBottom: 0}}
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
