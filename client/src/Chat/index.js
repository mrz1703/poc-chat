import React, { Component } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { Input } from 'antd';

import Message from './Message';

const { TextArea } = Input;

const StyledLayout = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-columns: 100%;
    grid-template-rows: 25px 1px auto 1px 60px;
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
    render() {
        return (
            <StyledLayout>
                <StyledHeader>General Chat</StyledHeader>

                <StyledDivider/>

                <StyledMessages>
                    <Message
                        user="Sam"
                        text="Hi there"
                    />
                    <Message
                        user="Roma"
                        text="Hi there"
                    />
                    <Message
                        me
                        user="Erzhan Torokulov"
                        text="Hi there"
                    />
                </StyledMessages>

                <StyledDivider/>

                <StyledInput>
                    <TextArea
                        placeholder="Start typing some message"
                        autosize={{ minRows: 2, maxRows: 6 }}
                        />
                </StyledInput>
            </StyledLayout>
        );
    }
}

export default Chat;