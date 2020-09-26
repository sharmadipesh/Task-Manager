import React, { Component } from 'react';
import idx from 'idx';
import { Form, Input, Button,DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class UpdateForm extends Component {

    onFinish= (values)=>{
        // console.log("#### ",values)
        this.props.onUpdateHandler({...values,id:idx(this.props.currentRowData,_=>_.id)});
    }

    render() {
        return (
            <div>
                <Form
                    initialValues={{
                        task_name:idx(this.props.currentRowData,_=>_.task_name),
                        task_desc: idx(this.props.currentRowData,_=>_.task_desc),
                        task_duration: idx(this.props.currentRowData,_=>_.task_duration),
                    }}
                    onFinish={this.onFinish}
                    colon={false}
                    layout={'vertical'}
                >
                    <Form.Item
                        label="Task Name"
                        name="task_name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Task Name!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="task_desc"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Task Description!',
                        },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item 
                        name="task_duration" 
                        label="Start End Duration" 
                        rules={[
                            {
                                type: 'array',
                                required: true,
                                message: 'Please select time!',
                            },
                        ]}
                        block
                    >
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" block/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"  block>
                            Update Task
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default UpdateForm;