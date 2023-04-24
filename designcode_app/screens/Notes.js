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

export default function Notes() {
  const user = auth().currentUser
  const [behaviorNotes, setBehaviorNotes] = useState([[]]);
  const [medicineNotes, setMedicineNotes] = useState([]);
  const [sleepNotes, setSleepNotes] = useState([]);
  const [bowelNotes, setBowelNotes] = useState([]);

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
          setBehaviorNotes([...behaviorNotes, [documentSnapshot.data().notes, documentSnapshot.data().selectedOption2, documentSnapshot.data().dateString]])

        })
        console.log(behaviorNotes)


      }


      )
  }, [])
  console.log(behaviorNotes[0][0])

  const behaviorArray = behaviorNotes.map((data, index) =>
        <View>
          <Text>
            {data[2]}
          </Text>
          <Text>
            {data[1]}
          </Text>
          <Text>
            {data[0]}
          </Text>
        </View>

      )

  




  return (
    <View>
      {behaviorArray}
    </View>
  )
}
