import React from 'react'
import { StyleSheet, Pressable, ScrollView, Dimensions, Text, Button, View, Linking } from "react-native";


function Popup(props) {
  return (props.trigger) ? (
    <View  style = {{
      backgroundColor: '#D3D3D3', 
      padding: 15, 
      borderRadius: 15, 
      position: 'absolute',
      width: '100%', 
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
      <View>
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
