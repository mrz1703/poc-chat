import React, { Component } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { Input } from 'antd';

import Message from './Message';

const StyledLayout = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-columns: 100%;
    grid-template-rows: 25px 1px auto 1px 35px;
    padding: 0 5px;
    grid-row-gap: 5px;
`;

const StyledHeader = styled.div`
    text-align: center;
`;

const StyledMessages = styled.div`
    padding: 0 5px;
    background-color: rgba(234, 247, 212, 0.4);
`;

const StyledInput = styled.div`

`;

const StyledDivider = styled(Divider)`
    margin: 0;
`;

class Chat extends Component {
    state = {}
    render() {
        const {channel, messages, onSend} = this.props;

        return (
            <StyledLayout>
                <StyledHeader>{channel}</StyledHeader>

                <StyledDivider/>
                <StyledMessages>
                {messages.map(message => (
                    <Message
                        user={message.user}
                        text={message.text}
                        me={message.user === channel}
                    />
                ))}
                </StyledMessages>

                <StyledDivider/>

                <StyledInput>
                    <Input
                        placeholder="Start typing some message"
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        onPressEnter={event => {
                            onSend(event.target.value);
                            this.setState({value: ''})
                        }}
                    />
                </StyledInput>
            </StyledLayout>
        );
    }
}

export default Chat;