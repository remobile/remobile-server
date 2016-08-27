import React, {PropTypes} from 'react';
import { Table, Modal } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import styles from './index.less';
import Menu from './menu';
import AddEditMoal from './addEditModal';

export default class Administrators extends React.Component {
    static fragments = {
        administrators: {
            _id: 1,
            username: 1,
            name: 1,
            email: 1,
            authority: 1,
            date: 1,
        }
    };
    static columns = [{
        title: '账号',
        dataIndex: 'username',
    }, {
        title: '昵称',
        dataIndex: 'name',
    }, {
        title: '邮箱',
        dataIndex: 'email',
    }, {
        title: '权限',
        dataIndex: 'authority',
    }, {
        title: '加入时间',
        dataIndex: 'date',
        render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    }];
    componentWillReceiveProps(nextProps) {
        if (this.props.states.removeOpened!=nextProps.states.removeOpened && nextProps.states.removeOpened) {
            const {actions} = this.props;
            if (nextProps.states.selectedAdministrator) {
                if (nextProps.states.selectedAdministrator.key === 0) {
                    actions.clearRemove();
                    Modal.warning({
                        title: '不能删除这个初始用户',
                    });
                } else {
                    Modal.confirm({
                        title: '您是否确认要删除这个账户',
                        onOk() {
                            actions.removeAdministrator(nextProps.states.selectedAdministrator._id);
                        },
                        onCancel() {
                            actions.clearRemove();
                        },
                    });
                }
            } else {
                actions.clearRemove();
                Modal.warning({
                    title: '请选择你要删除的用户',
                });
            }
        }
    }
    render () {
        const props = this.props;
        const selectedAdministrator = props.states.selectedAdministrator;
        const administrators = _.map(props.administrators, (administrator, i)=>({...administrator, key: i}));
        const pagination = {
            total: administrators.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedAdministrator?[selectedAdministrator.key]:[],
            onSelect(record, selectedAdministrator, selectedRows) {
                props.actions.setSelectedAdministrator(record);
            },
        };
        return (
            <div>
                <Menu {...props} />
                <Table columns={Administrators.columns} dataSource={administrators} pagination={pagination} rowSelection={rowSelection} />
                <AddEditMoal {...props} fragments={Administrators.fragments}/>
            </div>
        )
    }
}
