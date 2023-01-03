import React, { useEffect } from "react";
import styled from "styled-components";
import {
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Text,
  Button,
} from "react-native";



class MedicineScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    return fetch("../assets/drugbank-ui.min.js")
    .then((response) => response.json())
    .then((responseJson) => {
      
    })
    
  }

  render() {
    return (
      <SafeAreaView>
        <Container>
          <Button
            title="Medicine Intake Screen"
            onPress={() => {
              this.props.navigation.navigate("Section");
            }}
          />
          
        </Container>
      </SafeAreaView>
    );
  }
}

export default MedicineScreen;

const Container = styled.View``;
