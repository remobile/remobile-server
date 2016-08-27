import React, {PropTypes} from 'react';
import { Table } from 'antd';
import styles from './index.less';

const rowSelection = {
    type: 'radio',
    onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect(record, selectedAdministrator, selectedRows) {
        console.log(record, selectedAdministrator, selectedRows);
    },
};

const columns = [{
    title: '账号',
    dataIndex: 'username',
}, {
    title: '昵称',
    dataIndex: 'name',
}, {
    title: '登录时间',
    dataIndex: 'loginTime',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        username: `admin${i}`,
        name: 'fang',
        loginTime: '2016-09-01 10:09:56',
    });
}


const pagination = {
    total: data.length,
    showSizeChanger: false,
    pageSize: 20,
    onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
    },
    onChange(current) {
        console.log('Current: ', current);
    },
};

export default class LoginLog extends React.Component {
    render () {
        return (
            <Table columns={columns} dataSource={data} pagination={pagination} rowSelection={rowSelection}/>
        )
    }
}
