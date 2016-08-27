import React, {PropTypes} from 'react';
import antd_form_create from 'decorators/antd_form_create';
import _ from 'lodash';
import { Button, Form, Input, notification } from 'antd';
const FormItem = Form.Item;

function noop() {
  return false;
}

@antd_form_create
export default class Login extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    handleSubmit(e) {
        e.preventDefault();
        const { validateFields } = this.props.form;
        const { onSubmit } = this.props;
        validateFields((errors, value) => {
            if (!!errors) {
                _.mapValues(errors, (item)=>{
                    notification.error({description: _.last(item.errors.map((o)=>o.message))});
                })
                return;
            }
            onSubmit({
                username: value.username,
                password: value.password,
            });
        });
    }
    render () {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('username', {
            rules: [
                { required: true , message: '请填写密码'},
            ],
        });
        const passwdProps = getFieldProps('password', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
            ],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <div>
                <div>后台登录</div>
                <div>欢迎使用后台管理员</div>
                <br />
                <br />
                <br />
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="用户名:"
                        hasFeedback
                        >
                        <Input {...nameProps} placeholder="请填写用户名" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码:"
                        hasFeedback
                        >
                        <Input {...passwdProps} type="password" autoComplete="off"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={::this.handleSubmit}>登录</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
