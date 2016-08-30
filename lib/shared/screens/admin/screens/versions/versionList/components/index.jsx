import React, {PropTypes} from 'react';
import { Table, Modal } from 'antd';
import ListMenu, {DELETE_KEY, ADD_KEY, EDIT_KEY} from 'components/ListMenu';
import _ from 'lodash';
import moment from 'moment';
import styles from './index.less';

export default class VersionList extends React.Component {
    static fragments = {
        versions: {
            _id: 1,
            verName: 1,
            androidJsVersion: 1,
            iosJsVersion: 1,
            date: 1,
        }
    };
    static columns = [{
        title: '安卓大版本号',
        dataIndex: 'verName',
    }, {
        title: '安卓小版本号',
        dataIndex: 'androidJsVersion',
    }, {
        title: 'IOS小版本号',
        dataIndex: 'iosJsVersion',
    }, {
        title: '提交时间',
        dataIndex: 'date',
        render: (text) => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    }];
    state = {
        showSelected: false,
        selectedRowKeys: [],
    };
    handleClick(key) {
        const {actions, states} = this.props;
        if (key == DELETE_KEY) {
            const showSelected = !this.state.showSelected;
            this.setState({showSelected});
        }
    }
    render () {
        const self = this;
        const props = this.props;
        const {showSelected, selectedRowKeys} = this.state;
        const versions = _.map(props.versions, (user, i)=>({...user, key: i}));
        const pagination = {
            total: versions.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        const rowSelection = showSelected ? {
            type: 'radio',
            selectedRowKeys,
            onSelect(record, selectedVersion, selectedRows) {
                self.setState({selectedRowKeys: [record.key]});
                Modal.confirm({
                    title: '您是否确认要删除这个版本',
                    onOk() {
                        props.actions.removeVersion(record._id);
                        self.setState({selectedRowKeys: []});
                    },
                    onCancel() {
                        self.setState({selectedRowKeys: []});
                    },
                });
            },
        } : null;
        return (
            <div>
                <ListMenu handleClick={::this.handleClick} keys={DELETE_KEY}/>
                <Table columns={VersionList.columns} dataSource={versions} pagination={pagination} rowSelection={rowSelection}/>
            </div>
        )
    }
}
