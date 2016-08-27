import React, {PropTypes} from 'react';
import antd_form_create from 'decorators/antd_form_create';
import _ from 'lodash';
import moment from 'moment';
import { Button, Form, Input, DatePicker, InputNumber, Spin, Col, notification } from 'antd';
const FormItem = Form.Item;

function noop() {
    return false;
}

@antd_form_create
export default class Init extends React.Component {
    state = {
        endOpen: false,
        startTime: null,
        endTime: null,
    };
    handleStartToggle({ open }) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    handleEndToggle({ open }) {
        this.setState({ endOpen: open });
    }
    disabledStartTime(startTime) {
        if (!startTime) {
            return false;
        }
        const startValue = startTime.getTime();
        if (startValue <= Date.now()) {
            return true;
        }
        if (!this.state.endTime) {
            return false;
        }
        return startValue >= this.state.endTime.getTime();
    }
    disabledEndTime(endTime) {
        if (!endTime) {
            return false;
        }
        const endValue = endTime.getTime();
        if (endValue <= Date.now()) {
            return true;
        }
        if (!this.state.startTime) {
            return false;
        }
        return endTime.getTime() <= this.state.startTime.getTime();
    }
    onDateChange(field, value) {
        this.setState({ [field]: value });
    }
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        const { actions, form} = this.props;
        const { validateFields } = form;
        validateFields((errors, value) => {
            if (!!errors) {
                _.mapValues(errors, (item)=>{
                    notification.error({description: _.last(item.errors.map((o)=>o.message))});
                })
                return;
            }
            actions.addTask({
                tasks: {
                    _id: 1
                }
            }, value);
        });
    }
    render () {
        const self = this;
        const { isSuper, isSelf, administrator, form } = this.props;
        const { waiting } = this.props.states||{};
        const { getFieldProps, getFieldError, isFieldValidating } = form;
        const { endOpen, startTime, endTime } = this.state;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, message: '请输入任务名称' },
            ],
        });
        const addressProps = getFieldProps('address', {
            rules: [
                { required: true, message: '请输入任务执行的地址' },
            ],
        });
        const descriptionProps = getFieldProps('description', {
            rules: [
                { required: true, message: '请输入任务要求' },
            ],
        });
        const rewardProps = getFieldProps('reward', {
            initialValue: 0.01
        });
        const startTimeProps = getFieldProps('startTime', {
            getValueFromEvent: (date, dateString) => {self.setState({startTime: date}); return dateString},
            rules: [
                { required: true, message: '开始时间不能为空' },
            ],
        });
        const endTimeProps = getFieldProps('endTime', {
            getValueFromEvent: (date, dateString) =>  {self.setState({endTime: date}); return dateString},
            rules: [
                { required: true, message: '结束时间不能为空' },
            ],
        });

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <Form horizontal>
                <FormItem
                    {...formItemLayout}
                    label="任务名称:"
                    hasFeedback
                    >
                    <Input {...nameProps} placeholder="请输入任务名称" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="任务地址:"
                    hasFeedback
                    >
                    <Input {...addressProps} placeholder="请输入地址" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="任务要求:"
                    hasFeedback
                    >
                    <Input {...descriptionProps} placeholder="请输入任务要求" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="有效时间:"
                    >
                    <Col span="8">
                        <FormItem>
                            <DatePicker
                                {...startTimeProps}
                                showTime
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="开始时间"
                                toggleOpen={::this.handleStartToggle}
                                disabledDate={::this.disabledStartTime}
                                />
                        </FormItem>
                    </Col>
                    <Col span="3">
                        <p className="ant-form-split">-</p>
                    </Col>
                    <Col span="8">
                        <FormItem>
                            <DatePicker
                                {...endTimeProps}
                                showTime
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="结束时间"
                                open={endOpen}
                                toggleOpen={::this.handleEndToggle}
                                disabledDate={::this.disabledEndTime}
                                />
                        </FormItem>
                    </Col>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="任务赏金:"
                    hasFeedback
                    >
                    <InputNumber {...rewardProps} min={0.01} max={10000} step={0.01}/>
                    <span className="ant-form-text">元</span>
                </FormItem>
                {
                    waiting ?
                    <div style={{textAlign:'center'}}>
                        <Spin />
                        <div>请稍后...</div>
                    </div>
                    :
                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" onClick={::this.handleSubmit}>添加</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={::this.handleReset}>重置</Button>
                    </FormItem>
                }
            </Form>
        );
    }
}
