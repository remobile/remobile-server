import React, {PropTypes} from 'react';
import { Table, Modal } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import styles from './index.less';
import ListMenu, {NULL_TYPE, DELETE_TYPE, ADD_TYPE, EDIT_TYPE} from 'components/ListMenu';
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
    state = {
        selectType: NULL_TYPE,
        selectedRecord: null,
    };
    handleClick(key) {
        const {actions, states} = this.props;
        const {selectType} = this.state;
        if (key == DELETE_TYPE) {
            this.setState({selectType: selectType!==DELETE_TYPE ? DELETE_TYPE : NULL_TYPE});
        } else if (key == ADD_TYPE) {
            actions.openModal({isEdit: false});
        } else if (key == EDIT_TYPE) {
            this.setState({selectType: selectType!==EDIT_TYPE ? EDIT_TYPE : NULL_TYPE});
        }
    }
    onRowSelect(record) {
        const self = this;
        const {actions} = this.props;
        const {selectType} = this.state;
        if (selectType === DELETE_TYPE) {
            if (record.key === 0) {
                Modal.warning({
                    title: '不能删除这个初始用户',
                });
            } else {
                Modal.confirm({
                    title: '您是否确认要删除这个账户',
                    onOk() {
                        actions.removeAdministrator(record._id);
                        self.setState({selectedRecord: null});
                    },
                    onCancel() {
                    },
                });
            }
        } else if (selectType === EDIT_TYPE) {
            actions.openModal({isEdit: true});
        }
    }
    render () {
        const self = this;
        const props = this.props;
        const {selectType, selectedRecord} = this.state;
        const administrators = _.map(props.administrators, (administrator, i)=>({...administrator, key: i}));
        const pagination = {
            total: administrators.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        const rowSelection = selectType===NULL_TYPE ? null : {
            type: 'radio',
            selectedRowKeys: selectedRecord ? [selectedRecord.key] : [],
            onSelect(record, selected, selectedRows) {
                self.setState({selectedRecord: record});
                self.onRowSelect(record);
            },
        };
        return (
            <div>
                <ListMenu handleClick={::this.handleClick} />
                <Table columns={Administrators.columns} dataSource={administrators} pagination={pagination} rowSelection={rowSelection} />
                <AddEditMoal {...props} administrator={selectedRecord} fragments={Administrators.fragments}/>
            </div>
        )
    }
}
