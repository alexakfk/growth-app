import React from "react";
import styled from "styled-components";

const Card = props => (
    <Container>
        <Cover>
            <Image source={props.image} />
        </Cover>
        <Content>
            <Wrapper>
                <Title>{props.title}</Title>
                <Author>{props.author}</Author>
            </Wrapper>
        </Content>
    </Container>
)

export default Card;

const Content = styled.View`
    padding-left: 20px;
    flex-direction: row;
    align-items: center;
    height: 80px;
`;

const Author = styled.Text`
    color: #3c4560;
    font-size: 18px;
    font-weight: 600;
`;

const Title = styled.Text`
    color: #b8bece;
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    margin-top: 4px;
    margin-bottom: 4px;
`;

const Wrapper = styled.View`
    margin-left: 10px;
`;

const Container = styled.View`
    background: white;
    width: 330px;
    height: 280px;
    border-radius: 14px;
    margin-left: 20px;
    margin-top: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0, 0.15);
`;

const Cover = styled.View`
    width: 100%;
    height: 200px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;