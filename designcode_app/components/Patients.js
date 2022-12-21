import React from "react";
import {Image} from 'react-native'
import styled from "styled-components";

const Patients = props => (
  <Container>
    <Cover>
      <Image source={props.image} style = {{position: 'absolute', width: '100%', height: '100%'}}/>
    </Cover>
    <Content>
      <Name>{props.name}</Name>
    </Content>
  </Container>
);

export default Patients;

const Container = styled.View`
  width: 200px;
  height: 335px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin: 15px 10px;
`;

const Cover = styled.View`
  height: 260px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Content = styled.View`
  justify-content: center;
  height: 75px;
`;

const Name = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: bold;
  max-width: 260px;
  text-align: center;
`;