import React, { useState, useEffect } from 'react';
import { Drawer, Button,Form,Select,Input } from 'antd';
import {connect} from 'react-redux';

function Dashboard() {

    const [drawerHandler, setDrawerHandler] = useState(false);
    const [currentLoadForm, setCurrentLoadForm] = useState(0);

    const showDrawer = (form) => {
        setCurrentLoadForm(form)
        setDrawerHandler(true);
    };

    const hideDrawer = () => {
        setDrawerHandler(false);
    };

    const addExpenseHandler = (values) => {
        console.log("addExpenseHandler ",values)
    };

    const addCategoryHandler = (values) => {
        console.log("addCategoryHandler ",values)
    };
    
    const expenseHandlerFinish = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Button type="primary" onClick={()=>showDrawer(0)}>
                Open Expense
            </Button>
            <Button type="primary" onClick={()=>showDrawer(1)}>
                Open category
            </Button>
            <Drawer
                title="Add Category"
                placement="right"
                closable={false}
                onClose={hideDrawer}
                visible={drawerHandler}
                width={340}
            >
                {currentLoadForm ? 
                    <Form
                        name="add_category"
                        colon={false}
                        layout={"vertical"}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={addCategoryHandler}
                    >
                        <Form.Item
                            label="Category name"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input category name!!!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Add Category
                            </Button>
                        </Form.Item>
                    </Form>
                    :
                <Form
                    name="add_expense"
                    colon={false}
                    layout={"vertical"}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={addExpenseHandler}
                    onFinishFailed={expenseHandlerFinish}
                >
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="select category"
                        >
                            <Select.Option value="male">male</Select.Option>
                            <Select.Option value="female">female</Select.Option>
                            <Select.Option value="other">other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                        {
                            required: true,
                            message: 'Please input amount!!!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name="description" 
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Description!!!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Add Expense 
                        </Button>
                    </Form.Item>
                </Form>
                }
            </Drawer>
        </div>
    );
}

// export default Dashboard;
function mapStateToProps(state){
    return{
    }
}

export default connect(mapStateToProps,{
})(Dashboard);