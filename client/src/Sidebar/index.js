import React, { Component } from 'react';
import {Input, Icon} from 'antd';
import styled from 'styled-components';
import Contacts from './Contacts';

const StyledLayout = styled.section`
`;

class Sidebar extends Component {
    render() {
        return (
            <StyledLayout>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Search for people  " 
                />
                <Contacts/>
            </StyledLayout>
        );
    }
}

export default Sidebar;