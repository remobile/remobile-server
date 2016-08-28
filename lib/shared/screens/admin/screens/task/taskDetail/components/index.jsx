import React, {PropTypes} from 'react';
import {  Table, Form, Spin } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import styles from './index.less';
const FormItem = Form.Item;

const STATETEXT = [null, {text: '待提交', color: '#CDC9C9'}, {text: '待审核', color: '#EE3B3B'}, {text: '已完成', color: '#B3EE3A'}];

export default class TaskDetail extends React.Component {
    static fragments = {
        task: {
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
    render () {
        if (this.props.task) {
            const {name, address, description, reward, startTime, endTime, acceptList} = this.props.task||{};
            const formItemLayout = {labelCol: { span: 3}, wrapperCol: { span: 20}};
            const pagination = { total: acceptList.length, showSizeChanger: false, pageSize: 2, };
            return (
                <Form horizontal>
                    <FormItem {...formItemLayout} label="任务名称:" >
                        <p className="ant-form-text">{name}</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="任务地址:" >
                        <p className="ant-form-text">{address}</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="任务要求:" >
                        <p className="ant-form-text">{description}</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="悬赏金额:" >
                        <p className="ant-form-text">{reward}(<span style={{color:'red'}}>元</span>)</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="开始时间:" >
                        <p className="ant-form-text">{startTime}</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="结束时间:" >
                        <p className="ant-form-text">{endTime}</p>
                    </FormItem>
                    <FormItem {...formItemLayout} label="详情展示:" >
                    </FormItem>
                    <FormItem {...{wrapperCol: { span: 20, offset: 2}}} >
                        <Table
                            columns={TaskDetail.columns}
                            dataSource={acceptList}
                            pagination={pagination}
                            size="small"/>
                    </FormItem>
                </Form>
            )
        } else {
            return <div className={styles.spinContainer}><Spin /></div>
        }
    }
}
