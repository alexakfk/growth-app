import React from "react";
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
