import React, {PropTypes} from 'react';
import { Table, Modal } from 'antd';
import ListMenu, {NULL_TYPE, DELETE_TYPE, ADD_TYPE, EDIT_TYPE} from 'components/ListMenu';
import _ from 'lodash';
import moment from 'moment';
import styles from './index.less';

export default class VersionList extends React.Component {
    static fragments = {
        versionList: {
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
        selectType: NULL_TYPE,
        selectedRecord: null,
    };
    handleClick(key) {
        const {states} = this.props;
        const {selectType} = this.state;
        if (key == DELETE_TYPE) {
            this.setState({selectType: selectType!==DELETE_TYPE ? DELETE_TYPE : NULL_TYPE});
        }
    }
    render () {
        const self = this;
        const props = this.props;
        const {selectType, selectedRecord} = this.state;
        const versions = _.map(props.versionList, (user, i)=>({...user, key: i}));
        const pagination = {
            total: versions.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        const rowSelection = selectType===DELETE_TYPE ? null : {
            type: 'radio',
            selectedRowKeys: selectedRecord ? [selectedRecord.key] : [],
            onSelect(record, selected, selectedRows) {
                self.setState({selectedRecord: record});
                Modal.confirm({
                    title: '您是否确认要删除这个版本',
                    onOk() {
                        props.actions.removeVersion(record._id);
                        self.setState({selectedRecord: null});
                    },
                    onCancel() {
                        self.setState({selectedRecord: null});
                    },
                });
            },
        };
        return (
            <div>
                <ListMenu handleClick={::this.handleClick} keys={DELETE_TYPE}/>
                <Table columns={VersionList.columns} dataSource={versions} pagination={pagination} rowSelection={rowSelection}/>
            </div>
        )
    }
}
