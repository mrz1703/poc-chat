import React, { Component } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import socketIOClient from "socket.io-client";

import "antd/dist/antd.css";
import './App.css';

import Sidebar from './Sidebar';
import Chat from './Chat';
import { AppContext } from './context';


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
  constructor() {
    super();
    this.state = {
      currentChannel: 'general',
      users: [],
      msgLocal: []
    };
  }

  componentDidMount() {
    this.socket = socketIOClient('http://localhost:3030');
    this.socket.on("msg:local", message => {
      const {msgLocal} = this.state;
      this.setState({
        msgLocal: [...msgLocal, message]
      })
    });
    this.socket.on("msg:local:history", messages => {
      this.setState({
        msgLocal: messages
      })
    });
    this.socket.on("user:list", users => this.setState({ users }));
    this.socket.on("user:new", newUserId => {
      this.setState({ users: [...this.state.users, newUserId] })
    });
    this.socket.on("user:disconnect", newUserId => {
      this.setState({ users: this.state.users.filter(id => id !== newUserId) })
    });
  }

  onSend = (message) => {
    if (this.socket) {
      this.socket.emit(`msg:${this.state.currentChannel}`, message);
    } else {
      console.error('Socket is not defined');
    }
  }

  onChatChange = (channelId) => {
    this.setState({
      currentChannel: channelId
    })
  }
  
  render() {
    const {users, currentChannel} = this.state;

    return (
      <AppContext.Provider
        value={{
          onSend: this.onSend,
          onChatChange: this.onChatChange,
        }}
      >
        <StyledLayout>
            <Sidebar
              users={['general', 'local', ...users]}
              onChatChange={this.onChatChange}
            />
            <StyledDivider type="vertical"/>
            <Chat
              channel={currentChannel}
              messages={this.state[currentChannel] || []}
            />
        </StyledLayout>
      </AppContext.Provider>
    );
  }
}

export default App;
