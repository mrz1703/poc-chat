import React, { Component } from 'react';
import styled from 'styled-components';
import "antd/dist/antd.css";
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Divider } from 'antd';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 5px auto;
  grid-template-rows: 100%;
  padding: 5px;
  grid-column-gap: 5px;
  height: 100vh;
`;

const StyledDivider=styled(Divider)`
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <StyledLayout>
          <Sidebar/>
          <StyledDivider type="vertical"/>
          <Chat/>
      </StyledLayout>
    );
  }
}

export default App;
