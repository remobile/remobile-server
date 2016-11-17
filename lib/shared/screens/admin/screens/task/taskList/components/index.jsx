import React, {PropTypes} from 'react';
import {  Table, Modal } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import styles from './index.less';

const STATETEXT = [null, {text: '待提交', color: '#CDC9C9'}, {text: '待审核', color: '#EE3B3B'}, {text: '已完成', color: '#B3EE3A'}];

export default class TaskList extends React.Component {
    static fragments = {
        taskList: {
            _id:1,
            name: 1,
            address: 1,
            description: 1,
            reward: 1,
            startTime: 1,
            endTime: 1,
            acceptList: {
                _id:1,
                acceptTime: 1,
                submitTime: 1,
                passTime: 1,
                state: 1,
                acceptorName: 1,
                acceptorPhone: 1,
            }
        }
    };
    expandedRowRender(record) {
        const {address, description, acceptList} = record;
        if (acceptList.length) {
            const columns = [{
                title: '领取人',
                dataIndex: 'acceptorName',
                render: (text) => text||'/',
            }, {
                title: '领取人电话',
                dataIndex: 'acceptorPhone',
            }, {
                title: '接受时间',
                dataIndex: 'acceptTime',
                render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
            }, {
                title: '提交时间',
                dataIndex: 'submitTime',
                render: (text, record) => record.state < 2?'/':moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
            }, {
                title: '审核时间',
                dataIndex: 'passTime',
                render: (text, record) => record.state < 3?'/':moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
            }, {
                title: '状态',
                dataIndex: 'state',
                render: (i) => <span style={{color:STATETEXT[i].color}}>{STATETEXT[i].text}</span>,
            }];
            return (
                <div>
                    <p className={styles.row}><span className={styles.label}>拍摄地址:</span>{address}</p>
                    <p className={styles.row}><span className={styles.label}>拍摄要求:</span>{description}</p>
                    <Table columns={columns} dataSource={acceptList} pagination={false} size="small" />
                </div>
            )
        } else {
            return (
                <div>
                    <p className={styles.row}><span className={styles.label}>拍摄地址:</span>{address}</p>
                    <p className={styles.row}><span className={styles.label}>拍摄要求:</span>{description}</p>
                </div>
            )
        }
    }
    onRowClick(record, index) {
        if (this.props.taskList.length) {
            this.props.history.push({ pathname: '/admin/task/taskDetail', state: { id: record._id} });
        }
    }
    render () {
        const tasks = _.map(this.props.taskList, (task, i)=>({...task, key: i}));
        const pagination = {
            total: tasks.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        const columns = [{
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
            title: '结束时间',
            dataIndex: 'endTime',
            render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
        }, {
            title: '操作',
            dataIndex: '',
            key: 'oper',
            render: (text, record, index) => <a href="#" onClick={this.onRowClick.bind(this, record, index)}>详情</a>,
        }];
        return (
            <Table
                columns={columns}
                dataSource={tasks}
                expandedRowRender={tasks.length ? ::this.expandedRowRender: null}
                pagination={pagination}
                />
        )
    }
}
