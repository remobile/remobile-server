import React, {PropTypes} from 'react';
import {  Table, Modal, Collapse } from 'antd';
import _ from 'lodash';
import moment from 'moment';
const Panel = Collapse.Panel;

const STATETEXT = [null, {text: '待提交', color: '#CDC9C9'}, {text: '待审核', color: '#EE3B3B'}, {text: '已完成', color: '#B3EE3A'}];

export default class TaskList extends React.Component {
    static fragments = {
        tasks: {
            _id: 1,
            name: 1,
            address: 1,
            description: 1,
            reward: 1,
            startTime: 1,
            endTime: 1,
            acceptList: 1,
        }
    };
    static columns = [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: <span>赏金(<span style={{color:'red'}}>元</span>)</span>,
        dataIndex: 'reward',
    }, {
        title: '状态',
        dataIndex: '',
        render: (text, record, index) => {
            return record.acceptList.length ? <span style={{color:'#66CD00'}}>有领取</span>: <span style={{color:'red'}}>无人问津</span>;
        },
    }, {
        title: '开始时间',
        dataIndex: 'startTime',
        render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    }, {
        title: '开始时间',
        dataIndex: 'endTime',
        render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    }];
    static childColumns = [{
        title: '领取人',
        dataIndex: 'acceptor',
        render: (text) => {
            return text.phone;
        },
    }, {
        title: '状态',
        dataIndex: 'state',
        render: (i) => <span style={{color:STATETEXT[i].color}}>{STATETEXT[i].text}</span>,
    }];
    expandedRowRender(record) {
        const {address, description, acceptList} = record;
        if (acceptList.length) {
            const list = _.map(acceptList, (item, i)=>{return {...eval('('+item+')'), key: i}});
            return (
                <Collapse accordion>
                    <Panel header={'拍摄地址:'} key="1">
                        <p>{address}</p>
                    </Panel>
                    <Panel header={'拍摄要求:'} key="2">
                        <p>{description}</p>
                    </Panel>
                    <Panel header={'领取详情:'} key="3">
                        <Table columns={TaskList.childColumns} dataSource={list} pagination={false} size="small" />
                    </Panel>
                </Collapse>
            )
        } else {
            return (
                <Collapse accordion>
                    <Panel header={'拍摄地址:'} key="1">
                        <p>{address}</p>
                    </Panel>
                    <Panel header={'拍摄要求:'} key="2">
                        <p>{description}</p>
                    </Panel>
                </Collapse>
            )
        }
    }
    onRowClick(record, index) {
        if (this.props.tasks.length) {
            this.props.history.push({ pathname: '/admin/task/taskDetail', state: { id: record._id} });
        }
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
                columns={TaskList.columns}
                dataSource={tasks}
                expandedRowRender={tasks.length ? ::this.expandedRowRender: null}
                pagination={pagination}
                onRowClick={::this.onRowClick}
                />
        )
    }
}
