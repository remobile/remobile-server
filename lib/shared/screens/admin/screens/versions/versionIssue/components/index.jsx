import React, {PropTypes} from 'react';
import antd_form_create from 'decorators/antd_form_create';
import _ from 'lodash';
import moment from 'moment';
import { Button, Form, Upload, Icon, Spin, notification } from 'antd';
import styles from './index.less';
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const FILES = ['version.json', 'yxjqd.apk', 'android.zip', 'ios.zip'];

@antd_form_create
export default class Init extends React.Component {
    state = {
        fileLists:[]
    }
    getVersion(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsText(file.originFileObj);
            reader.onload = function(){
                let result;
                try {
                    result = JSON.parse(this.result);
                } catch (e) {
                    resolve();
                }
                resolve(result);
            };
            reader.onerror = function(){
                resolve();
            };
        });
    }
    async handleIssue(e) {
        e.preventDefault();
        const {fileLists} = this.state;
        if (!(fileLists[0] && fileLists[0][0])) {
            notification.error({description: '必须要上传版本文件'});
            return;
        }
        const version = await this.getVersion(fileLists[0][0]);
        if (!version) {
            notification.error({description: '版本文件格式不正确'});
            return;
        }
        if (fileLists.length < 2) {
            notification.error({description: '至少需要上传一种版本文件'});
            return;
        }
        this.props.actions.addVersion(version, {_id: 1});
    }
    onChange(type, info) {
        let fileLists = this.state.fileLists;
        fileLists[type] = info.fileList.slice(-1);
        this.setState({ fileLists });
    }
    beforeUpload(type, file) {
        if (file.name !== FILES[type]) {
            notification.error({description: '请选择正确的文件'});
            return false;
        }
        return true;
    }
    render () {
        const self = this;
        const { states, form } = this.props;
        const { waiting } = states||{};
        const { getFieldProps, getFieldError, isFieldValidating } = form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, message: '请输入任务名称' },
            ],
        });
        const props = {
            name: 'file',
            action: '/api/uploadVersion',
            supportServerRender: true,
        };
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <Form horizontal>
                <FormItem
                    {...formItemLayout}
                    label={'版本文件('+FILES[0]+')'}
                    >
                    <div className={styles.draggerContainer}>
                        <Dragger {...props} accept='.json'
                            beforeUpload={this.beforeUpload.bind(this, 0)}
                            onChange={this.onChange.bind(this, 0)}
                            fileList={this.state.fileLists[0]}>
                            <Icon type='plus' />
                        </Dragger>
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={'apk安装文件('+FILES[1]+')'}
                    >
                    <div className={styles.draggerContainer}>
                        <Dragger {...props} accept='.apk'
                            beforeUpload={this.beforeUpload.bind(this, 1)}
                            onChange={this.onChange.bind(this, 1)}
                            fileList={this.state.fileLists[1]}>
                            <Icon type='plus' />
                        </Dragger>
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={'android小版本('+FILES[2]+')'}
                    >
                    <div className={styles.draggerContainer}>
                        <Dragger {...props} accept='.zip'
                            beforeUpload={this.beforeUpload.bind(this, 2)}
                            onChange={this.onChange.bind(this, 2)}
                            fileList={this.state.fileLists[2]}>
                            <Icon type='plus' />
                        </Dragger>
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={'ios小版本('+FILES[3]+')'}
                    >
                    <div className={styles.draggerContainer}>
                        <Dragger {...props} accept='.zip'
                            beforeUpload={this.beforeUpload.bind(this, 3)}
                            onChange={this.onChange.bind(this, 3)}
                            fileList={this.state.fileLists[3]}>
                            <Icon type='plus' />
                        </Dragger>
                    </div>
                </FormItem>
                {
                    waiting ?
                    <div style={{textAlign:'center'}}>
                        <Spin />
                        <div>请稍后...</div>
                    </div>
                    :
                    <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                        <Button type='primary' onClick={::this.handleIssue}>发布</Button>
                    </FormItem>
                }
            </Form>
        );
    }
}
