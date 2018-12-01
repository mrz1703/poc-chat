import React, {Component} from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const StyledLayout = styled.div`
    margin-bottom: 15px;
    ${({flip}) => flip ? 'transform: scaleX(-1);' : ''};
`;

const StyledCard = styled.div`
    border: 1px solid lightgray;
    padding: 3px 10px;
    margin: 0 5px 0 30px;
    width: max-content;
    ${({flip}) => flip ? 'transform: scaleX(-1);' : ''};
    ${({flip}) => flip ? `
        border-radius: 15px 15px 0 15px;
    ` : `
        border-radius: 15px 15px 15px 0;
    `};
    background-color: white;
`;

const StyledAvatar = styled(Avatar)`
    margin-right: 10px;
`;

const StyledUser = styled.div`
    font-weight: bold;
`;

class Message extends Component {
    render() {
        const {user, text, me} = this.props;
        console.log(user, me);
        return (
            <StyledLayout flip={me}>
                <StyledCard flip={me}>
                    <StyledUser>{user}</StyledUser>
                    {text}
                </StyledCard>
                <StyledAvatar icon="user"/>
            </StyledLayout>
        )
    }
}

export default Message;