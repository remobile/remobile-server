import React, {PropTypes} from 'react';
import antd_form_create from 'decorators/antd_form_create';
import {  Modal,  Button, Form, Input, InputNumber, Spin, notification } from 'antd';
const FormItem = Form.Item;

function noop() {
    return false;
}

@antd_form_create
export default class PasswordMoal extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        const { form, actions, administrator } = this.props;
        form.validateFields((errors, value) => {
            if (!!errors) {
                _.mapValues(errors, (item)=>{
                    notification.error({description: _.last(item.errors.map((o)=>o.message))});
                })
                return;
            }
            actions.updateAdministratorPassword(administrator.id, value.password, value.newPassword);
        });
    }
    checkNewPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['reNewPassword'], { force: true });
        }
        callback();
    }
    checkNewPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('newPassword')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    }
    render() {
        const { form, actions, states } = this.props;
        const {passwordModalVisile,  waiting} = this.props.states||{};
        const { getFieldProps, getFieldError, isFieldValidating } = form;
        const passwdProps = getFieldProps('password', {
            rules: [
                { required: true, whitespace: true, message: '请输入旧密码' },
            ],
        });
        const newPasswdProps = getFieldProps('newPassword', {
            rules: [
                { required: true, whitespace: true, min:3, message: '请输入新密码' },
                { validator: ::this.checkNewPass },
            ],
        });
        const reNewPasswdProps = getFieldProps('reNewPassword', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入新密码',
            }, {
                validator: ::this.checkNewPass2,
            }],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <Modal title="修改密码"
                visible={passwordModalVisile}
                footer={null}
                wrapClassName="vertical-center-modal"
                onCancel={actions.closeUpdatePasswordModal}
                >
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="旧密码:"
                        hasFeedback
                        >
                        <Input {...passwdProps} type="password" autoComplete="off"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="新密码:"
                        hasFeedback
                        >
                        <Input {...newPasswdProps} type="password" autoComplete="off"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认新密码:"
                        hasFeedback
                        >
                        <Input {...reNewPasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                    {
                        waiting ?
                        <div style={{textAlign:'center'}}>
                            <Spin />
                            <div>请稍后...</div>
                        </div>
                        :
                        <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                            <Button type="primary" onClick={::this.handleSubmit}>确定</Button>
                        </FormItem>
                    }
                </Form>
            </Modal>
        )
    }
}
