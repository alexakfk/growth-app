import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  VirtualizedList
} from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
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
  searchBar: {
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 10,
    padding: "0.5rem",
    marginBottom: "1rem",
    fontSize: 16
  },
  selectedMedicine: {
    fontSize: 20,
    padding: 10,
    alignSelf: "center",
    textAlign: "center"
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  picker1: {
    flex: 1,
    marginRight: "0.5rem"
  },
  picker2: {
    flex: 1
  },
  submitButton: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: 10
  }
});

const MedicineScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [amountConsumed, setAmountConsumed] = useState("");
  const [units, setUnits] = useState("");

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${searchTerm}`
        );
        setMedicines(response.data.approximateGroup.candidate);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  useEffect(() => {
    setMedicines(
      medicines.filter((medicine) => medicine.name !== selectedMedicine)
    );
  }, [selectedMedicine]);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Medicine</Text>
      <TextInput
        style={styles.searchBar}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search for a medicine"
      />
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.rxcui}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedMedicine(item.name)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {!!selectedMedicine && (
        <Text style={styles.selectedMedicine}>
          Selected Medicine: {selectedMedicine}
        </Text>
      )}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker1}
          selectedValue={amountConsumed}
          onValueChange={(itemValue) => setAmountConsumed(itemValue)}
        >
          <Picker.Item label="Amount Consumed" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
        <Picker
          style={styles.picker2}
          selectedValue={units}
          onValueChange={(itemValue) => setUnits(itemValue)}
        >
          <Picker.Item label="Units" value="" />
          <Picker.Item label="mg" value="mg" />
          <Picker.Item label="g" value="g" />
          <Picker.Item label="ml" value="ml" />
          <Picker.Item label="l" value="l" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() =>
          console.log(`${selectedMedicine}: ${amountConsumed} ${units}`)
        }
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default MedicineScreen;