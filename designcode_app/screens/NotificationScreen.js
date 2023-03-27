import React, { useState, useEffect, useId } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';



const NotificationScreen = (navigation) => {

    const styles = EStyleSheet.create({
        title: {
            fontSize: 30,
            color: "black",
            fontWeight: "bold",
            padding: "2rem"
        },
    })
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style = {styles.title}>Notifications</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

NotificationScreen.navigationOptions = {
    headerShown: false,
  };

export default NotificationScreen