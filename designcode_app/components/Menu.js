import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Navigate } from "react-router";
import firestore from '@react-native-firebase/firestore';

function mapStateToProps(state) {
    return { action: state.action };
}

function mapDispatchToProps(dispatch) {
    return {
        closeMenu: () => dispatch({
            type: "CLOSE_MENU"
        })
    }
}

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {

    state = {
        top: new Animated.Value(screenHeight)
    };

    componentDidMount() {
        this.toggleMenu();
    }

    componentDidUpdate() {
        this.toggleMenu();
    }

    toggleMenu = () => {
        if (this.props.action == "openMenu") {
            Animated.spring(this.state.top, {
                toValue: 54,
                useNativeDriver: false
            }).start();
        }
        
        if (this.props.action == "closeMenu") {
            Animated.spring(this.state.top, {
                toValue: screenHeight,
                useNativeDriver: false
            }).start()
        }
    }

    render() {
        const user = auth().currentUser
        firestore()
            .collection('users')
            .add({
                name: '{user.displayName}',
                age: 30,
            })
            .then(() => {
            console.log('User added!');
            });

        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <Cover>
                    <Image source={require('../assets/background2.jpg')} />
                    <Title>{user.displayName}</Title>
                    <Subtitle>Kaiser Permanente</Subtitle>
                </Cover>
                <TouchableOpacity onPress={this.props.closeMenu} style={{ position: "absolute", top: 120, left: "50%", marginLeft: -22, zIndex: 1 }}>
                    <CloseView>
                        <Ionicons name="ios-close" size={44} color="#546bfb" />
                    </CloseView>
                </TouchableOpacity>
                <Content>
                    <MenuItem icon={"ios-settings"} title={"Account"} text={"settings"}/>
                    <MenuItem icon={"gift-outline"} title={"Donate"} text={"help us grow!"}/>
                    <MenuItem icon={"ios-compass"} title={"About us"} text={"who we are"}/>
                    <TouchableOpacity onPress={async () => {
                        try {
                            await GoogleSignin.signOut();
                            await auth().signOut();
                          } catch (error) {
                            console.error(error);
                          }     
                        
                          console.log("signed out!")                  
                    }}>
                        <MenuItem icon={"ios-exit"} title={"Log out"} text={"see you soon!"}/>
                    </TouchableOpacity>

                </Content>
            </AnimatedContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Image = styled.Image`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Title = styled.Text`
    color: white;
    font-size: 24px;
    font-weight: 600;
`;

const Subtitle = styled.Text`
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 8px;
`;

const CloseView = styled.View`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgba(0,0,0, 0.15);
`;

const Container = styled.View`
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    z-index: 100;
    border-radius: 10px;
    overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
    height: 142px;
    background: black;
    justify-content: center;
    align-items: center;
`;

const Content = styled.View`
    height: ${screenHeight};
    background: #f0f3f5;
    padding: 50px;
`;

const items = [
    {
        icon: "ios-settings",
        title: "Account",
        text: "settings"
    },
    {
        icon: "gift-outline",
        title: "Donate",
        text: "help us grow!"
    },
    {
        icon: "ios-compass",
        title: "About Us",
        text: "who we are"
    },
    {
        icon: "ios-exit",
        title: "Log out",
        text: "see you soon!"
    }
]

