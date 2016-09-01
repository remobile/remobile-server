import React, {PropTypes} from 'react';
import { Table, Modal } from 'antd';
import _ from 'lodash';
import moment from 'moment';

export default class Users extends React.Component {
    static fragments = {
        userList: {
            _id: 1,
            phone: 1,
            name: 1,
            email: 1,
            state: 1,
            date: 1,
        }
    };
    static columns = [{
        title: '电话号码',
        dataIndex: 'phone',
    }, {
        title: '昵称',
        dataIndex: 'name',
        render: (text) => text||'/',
    }, {
        title: '邮箱',
        dataIndex: 'email',
        render: (text) => text||'/',
    }, {
        title: '状态',
        dataIndex: 'state',
    }, {
        title: '注册时间',
        dataIndex: 'date',
        render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    }];
    render () {
        const users = _.map(this.props.userList, (user, i)=>({...user, key: i}));
        const pagination = {
            total: users.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        return (
            <Table columns={Users.columns} dataSource={users} pagination={pagination} />
        )
    }
}
