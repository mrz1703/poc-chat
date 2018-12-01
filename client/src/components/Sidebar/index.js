import React, { Component } from 'react';
import {Input, Icon, List, Avatar} from 'antd';
import styled from 'styled-components';

const StyledLayout = styled.section`
`;

const StyledLink = styled.a`
    text-decoration: none;
`;

class Sidebar extends Component {
    render() {
        const {users = [], onChatChange} = this.props;
        return (
            <StyledLayout>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Search for people  " 
                />
                <List
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={item => (
                    <List.Item>
                        <StyledLink onClick={() => onChatChange(item)}>
                                <List.Item.Meta
                                    avatar={<Avatar icon="user" />}
                                    title={item}
                                    description="Active 10m ago"
                                />
                        </StyledLink>
                    </List.Item>
                    )}
                />
            </StyledLayout>
        );
    }
}

export default Sidebar;