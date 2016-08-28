import React, {PropTypes} from 'react';
import {  Form, Table, Modal } from 'antd';
import _ from 'lodash';
import moment from 'moment';
const FormItem = Form.Item;

const STATETEXT = [{text: '未领取', color: '#CDC9C9'}, {text: '进行中', color: '#EE3B3B'}, {text: '已完成', color: '#B3EE3A'}];

export default class AllTasks extends React.Component {
    static fragments = {
        tasks: {
            _id: 1,
            name: 1,
            address: 1,
            description: 1,
            reward: 1,
            state: 1,
            startTime: 1,
            endTime: 1,
            acceptTime: 1,
            submitTime: 1,
            passTime: 1,
        }
    };
    static columns = [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '状态',
        dataIndex: 'state',
        render: (i) => <span style={{color:STATETEXT[i].color}}>{STATETEXT[i].text}</span>,
    }, {
        title: <span>赏金(<span style={{color:'red'}}>元</span>)</span>,
        dataIndex: 'reward',
    }, {
        title: '开始时间',
        dataIndex: 'startTime',
        render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    }, {
        title: '开始时间',
        dataIndex: 'endTime',
        render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    }];
    expandedRowRender(record) {
        const {address, description} = record;
        const formItemLayout = {labelCol: { span: 2}, wrapperCol: { span: 12}};
        return (
            <Form horizontal>
                <FormItem
                    {...formItemLayout}
                    label="拍摄地址:"
                    >
                    <p className="ant-form-text">{address}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="拍摄要求:"
                    >
                    <p className="ant-form-text">{description}</p>
                </FormItem>
            </Form>
        )
    }
    render () {
        const tasks = _.map(this.props.tasks, (task, i)=>({...task, key: i}));
        const pagination = {
            total: tasks.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        return (
            <Table
                columns={AllTasks.columns}
                dataSource={tasks}
                expandedRowRender={::this.expandedRowRender}
                pagination={pagination}
                />
        )
    }
}
