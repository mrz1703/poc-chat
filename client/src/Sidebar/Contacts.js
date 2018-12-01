import React, { Component } from 'react';
import { List, Avatar } from 'antd';

const data = [
  {
    title: 'General Group',
  },
  {
    title: 'Local Group',
  },
  {
    title: 'Erzhan',
  },
  {
    title: 'Sam',
  },
  {
    title: 'Roma',
  },
  {
    title: 'Damir',
  },
  {
    title: 'Vitally',
  }
];

class Contacts extends Component {
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar icon="user" />}
                        title={<a href="#">{item.title}</a>}
                        description="Active 10m ago"
                    />
                </List.Item>
                )}
            />
        );
    }
}

export default Contacts;