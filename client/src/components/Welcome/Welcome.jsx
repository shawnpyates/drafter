import React from 'react';
import styled from 'styled-components';

const WelcomeContainer = styled.div`
  text-align: center;
  padding: 30px;
  width: 50%;
  display: inline-block;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const StyledImage = styled.img`
  height: 70%;
  width: 70%;
  border 2px solid #F0F0F0;
  margin: 10px auto;
`;

function Welcome() {
  return (
    <WelcomeContainer>
      <Title>Welcome to Draft Machine</Title>
      <Subtitle>
        Create custom drafts for rec or fantasy sports leagues and hold them in live time.
      </Subtitle>
      <Subtitle>Sign up to get started!</Subtitle>
      <StyledImage
        src="https://res.cloudinary.com/dcupoxygs/image/upload/v1587579413/draft-machine/draftmachine-screenshot.png"
        alt="sample card question"
      />
    </WelcomeContainer>
  );
}

export default Welcome;