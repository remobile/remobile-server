import React, {PropTypes} from 'react';
import { Table, Modal } from 'antd';
import ListMenu from 'components/ListMenu';
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
    handleClick(key) {
        const {actions, states} = this.props;
        if (key == 1) {
        } else if (key == 2) {
        } else {
            if (states.selectedAdministrator) {
                actions.openModal({isEdit: true});
            } else {
                Modal.warning({
                    title: '请选择你要编辑的用户',
                });
            }
        }
    }
    render () {
        const versions = _.map(this.props.versions, (user, i)=>({...user, key: i}));
        const pagination = {
            total: versions.length,
            showSizeChanger: false,
            pageSize: 2,
        };
        return (
            <Table columns={VersionList.columns} dataSource={versions} pagination={pagination} />
        )
    }
}
