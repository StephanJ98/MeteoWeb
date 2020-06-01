import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Body from './Components/Body';

function App() {
  return (
    <Container fluid className="App">
      <Header />
      <Body/>
    </Container>
  );
}

export default App;
