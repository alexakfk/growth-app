import React from 'react'
import { StyleSheet, Pressable, ScrollView, Dimensions, Text, Button, View, Linking } from "react-native";


function Popup(props) {
  return (props.trigger) ? (
    <View style = {styles.popup}>
      <View style = {styles.popupInner}>
        {props.children}
      </View>
    
    </View>
  ) : "";
}

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },   
    popupInner: {
        position: 'relative',
        padding: 32,
        width: '100%',
        maxWidth: 640,
        backgroundColor: 'white',
    },
    closeBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
    }
    
})

export default Popup
