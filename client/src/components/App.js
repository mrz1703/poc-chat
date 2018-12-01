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
      myId: null,
      currentChannel: 'general',
      users: [],
      local: [],
      general: [],
    };
  }

  componentDidMount() {
    this.socket = socketIOClient('http://localhost:3030');
    this.socket.on("msg:local", message => {
      const {local} = this.state;
      this.setState({
        local: [...local, message]
      })
    });
    this.socket.on("msg:general", message => {
      const {general} = this.state;
      this.setState({
        general: [...general, message]
      })
    });
    this.socket.on("msg:local:history", messages => {
      this.setState({
        local: messages
      })
    });
    this.socket.on("msg:general:history", messages => {
      this.setState({
        general: messages
      })
    });
    this.socket.on("user:list", users => this.setState({ users }));
    this.socket.on("user:new", newUserId => {
      this.setState({ users: [...this.state.users, newUserId] })
    });
    this.socket.on("user:id", myId => {
      this.setState({ myId })
    });
    this.socket.on("user:disconnect", newUserId => {
      this.setState({ users: this.state.users.filter(id => id !== newUserId) })
    });
  }

  onSend = (text) => {
    if (!this.socket) {
      console.error('Socket is not defined');
    }
    const {currentChannel, myId} = this.state;
    const message = {
      user: myId,
      text: text,
      timestamp: new Date().toISOString()
    }
    this.socket.emit(`msg:${currentChannel}`, message);

    this.setState({[currentChannel]: [...(this.state[currentChannel] || []), message]})
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
              onSend={this.onSend}
            />
        </StyledLayout>
      </AppContext.Provider>
    );
  }
}

export default App;
