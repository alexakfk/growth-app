import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import DropDownPicker from "react-native-dropdown-picker";

export default function Notes() {
  const user = auth().currentUser
  let behaviorNotes = [[]]
  const [behaviorArray, setBehaviorArray] = useState(null)
  const [medicineNotes, setMedicineNotes] = useState([]);
  const [sleepNotes, setSleepNotes] = useState([]);
  const [bowelNotes, setBowelNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Behavior', value: 'Behavior'},
    {label: 'Sleep', value: 'Sleep'},
    {label: 'Bowel', value: 'Bowel'},
    {label: 'Medicine', value: 'Medicine'}
  ]);

  

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('Behaviors')
      .where('data', '==', 'true')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          behaviorNotes = [...behaviorNotes, [documentSnapshot.data().notes, documentSnapshot.data().selectedOption2, documentSnapshot.data().dateString, documentSnapshot.data().dataType]]
        })
        setBehaviorArray(behaviorNotes.filter((data) => data[3] == value).map((data, index) =>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, margin: 5 }}>
            <Text style={{ padding: 3 }}>
              Date: {data[2]}
            </Text>
            <Text style={{ padding: 3 }}>
              Data Type: {data[1]}
            </Text>
            <Text style={{ padding: 3 }}>
              Note: {data[0]}
            </Text>
          </View>

        )
        )
      }
      )
  })








  return (
    <View>
      <DropDownPicker
        placeholder="Data Type" 
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style = {{padding: 5}}
        containerStyle={{
          margin: 5,
          paddingRight: 10
        }}
      />
      
      {behaviorArray}
    </View>
  )
}
