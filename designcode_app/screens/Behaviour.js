import React, { useState } from "react";
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
    { value: "5", label: "5 min" },
    { value: "10", label: "10 min" },
    { value: "15", label: "15 min" },
    { value: "20", label: "20 min" },
    { value: "25", label: "25 min" },
    { value: "30", label: "30 min" },
    { value: "35", label: "35 min" },
    { value: "40", label: "40 min" },
    { value: "45", label: "45 min" },
    { value: "50", label: "50 min" },
    { value: "55", label: "55 min" },
    { value: "60", label: "60 min" },
  ]);
  const [note, setNote] = React.useState("");

  const onOpen = () => {
    setOpen2(false);
  };
  const onOpen2 = () => {
    setOpen(false);
  };

  const onPress = () => {
    const now = new Date();
    const current = now.getHours() + ":" + now.getMinutes();
    console.log("Start Time: " + current);

    if (parseInt(now.getMinutes()) + parseInt(selectedOption2) > 59) {
      var newHours =
        (parseInt(now.getMinutes()) + parseInt(selectedOption2)) / 60;
      var newMinutes =
        (parseInt(now.getMinutes()) + parseInt(selectedOption2)) % 60;
      let newTime =
        parseInt(newHours) +
        parseInt(now.getHours()) +
        ":" +
        parseInt(newMinutes);
      console.log("End Time: " + newTime);
    } else {
      var newHours = now.getHours();
      var newMinutes = parseInt(now.getMinutes()) + parseInt(selectedOption2);
      let newTime = parseInt(newHours) + ":" + parseInt(newMinutes);

      console.log("End Time: " + newTime);

      console.log(now.getMonth() + 1 + "/" + now.getDate());
    }

    console.log(selectedOption);
    console.log(note);
  };

  const cancel = () => {};

  return (
    <View style={styles.container}>
      <Title>Add Behavior</Title>
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
        containerStyle={{ zIndex: 1 }}
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
