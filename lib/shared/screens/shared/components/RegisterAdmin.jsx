import React, {PropTypes} from 'react';
import antd_form_create from 'decorators/antd_form_create';
import _ from 'lodash';
import moment from 'moment';
import { Button, Form, Input, InputNumber, Spin, notification } from 'antd';
const FormItem = Form.Item;

function noop() {
    return false;
}

@antd_form_create
export default class Init extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        const { onSubmit, form, administrator } = this.props;
        const { validateFields } = form;
        validateFields((errors, value) => {
            if (!!errors) {
                _.mapValues(errors, (item)=>{
                    notification.error({description: _.last(item.errors.map((o)=>o.message))});
                })
                return;
            }
            onSubmit({
                ...administrator,
                username: value.username,
                password: value.password,
                name: value.name,
                email: value.email,
                authority: value.authority,
            });
        });
    }
    handleCancel(e) {
        e.preventDefault();
        this.props.actions.stopEditPersonalInfo();
    }
    checkName(rule, value, callback) {
        if (!value ) {
            callback('用户名不能为空');
        }
        else if (!/^[a-zA-Z].*/.test(value)) {
            callback('用户名只能以字母开头');
        } else if (/^[a-zA-Z]{1}[a-zA-Z0-9_]*/.test(value)) {
            if (value.length < 4) {
                callback('用户名长度不能小于4');
            } else {
                callback();
            }
        } else {
            callback('用户名只能由大小写字母，数字，下划线组成且只能有字母开头');
        }
    }
    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePassword'], { force: true });
        }
        callback();
    }
    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    }
    render() {
        const { isSuper, isSelf, administrator, form } = this.props;
        const {isEdit, waiting, isSelfEditing} = this.props.states||{};
        const {username, name, email, authority, date} = isEdit ? administrator : (isSelf&&!!administrator) ? administrator : {authority:isSuper?0:9};
        const { getFieldProps, getFieldError, isFieldValidating } = form;
        const usernameProps = getFieldProps('username', {
            initialValue: username,
            rules: [
                { required: true },
                { validator: ::this.checkName },
            ],
        });
        const passwdProps = !isEdit&&!isSelf ? getFieldProps('password', {
            rules: [
                { required: true, whitespace: true, min:3, message: '请输入密码' },
                { validator: ::this.checkPass },
            ],
        }): null;
        const rePasswdProps = !isEdit&&!isSelf ? getFieldProps('rePassword', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: ::this.checkPass2,
            }],
        }): null;
        const nameProps = getFieldProps('name', {
            initialValue: name,
            rules: [
                { required: true, min: 4, message: '昵称至少为 4 个字符' },
            ],
        });
        const emailProps = getFieldProps('email', {
            initialValue: email,
            validate: [{
                rules: [
                    { required: true,  message: '请输入邮箱' },
                ],
                trigger: 'onBlur',
            }, {
                rules: [
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ],
                trigger: ['onBlur', 'onChange'],
            }],
        });
        const authorityProps = getFieldProps('authority', {
            initialValue: authority,
        });
        const dateProps = getFieldProps('date', {
            initialValue: moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss'),
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <Form horizontal>
                <FormItem
                    {...formItemLayout}
                    label="用户名:"
                    hasFeedback
                    help={isFieldValidating('username') ? '校验中...' : _.last(getFieldError('username'))}
                    >
                    <Input {...usernameProps} placeholder="请输入用户名" disabled={!!isEdit || (!!isSelf)}/>
                </FormItem>
                {
                    (!isEdit && !isSelf) &&
                    <FormItem
                        {...formItemLayout}
                        label="密码:"
                        hasFeedback
                        >
                        <Input {...passwdProps} type="password" autoComplete="off"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                }
                {
                    (!isEdit && !isSelf) &&
                    <FormItem
                        {...formItemLayout}
                        label="确认密码:"
                        hasFeedback
                        >
                        <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                }
                <FormItem
                    {...formItemLayout}
                    label="昵称:"
                    hasFeedback
                    >
                    <Input {...nameProps} placeholder="请输入昵称" disabled={!!isSelf && !isSelfEditing}/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱:"
                    hasFeedback
                    >
                    <Input {...emailProps} placeholder="请输入邮箱" disabled={!!isEdit || (!!isSelf && !isSelfEditing)}/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="权限:"
                    hasFeedback
                    >
                    <InputNumber {...authorityProps} min={0} max={9} style={{float:'left'}} disabled={!!isSuper || (isEdit&&administrator.key===0) || (!!isSelf)}/>
                </FormItem>
                {
                    isSelf &&
                    <FormItem
                        {...formItemLayout}
                        label="创建时间:"
                        hasFeedback
                        >
                        <Input {...dateProps} disabled={true}/>
                    </FormItem>
                }
                {
                    waiting ?
                    <div style={{textAlign:'center'}}>
                        <Spin />
                        <div>请稍后...</div>
                    </div>
                    :
                    !(isSelf && !isSelfEditing) ?
                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" onClick={::this.handleSubmit}>确定</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={::this.handleReset}>重置</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                            (isSelf && isSelfEditing) &&
                            <Button type="ghost" onClick={::this.handleCancel}>取消</Button>
                        }
                    </FormItem>
                    :
                    null
                }
            </Form>
        );
    }
}
