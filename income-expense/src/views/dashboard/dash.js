import React, { Component } from 'react';
import { Drawer, Button,Form,Select,Input,message,Card,Row, Col,Table,DatePicker,Space,InputNumber } from 'antd';
import {connect} from 'react-redux';
import {addCategoryOperation,addExpenseOperation,getAllCategory,getAllExpenses} from 'redux/actions/Dashboard';
import idx from 'idx';
import moment from "moment";

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

class dash extends Component {
    formRef = React.createRef();
    state = {
        drawerHandler:false,
        currentLoadForm:0,
        tableColumn:[
            {
                title:'Date',
                dataIndex:'date_added',
                key:'date_added'
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title:'Amount',
                dataIndex:'amount',
                key:'amount'
            },
            {
                title:'Description',
                dataIndex:'description',
                key:'description'
            }
        ],
        tableData:[],
        btnLoading:false
    }


    showDrawer = (form) => {
        this.setState({
            drawerHandler:true,
            currentLoadForm:form
        })
    };

    hideDrawer = () => {
        this.setState({
            drawerHandler:false
        })
    };

    addExpenseHandler = (values) => {
        // console.log("addExpenseHandler ",values)
        this.setState({
            btnLoading:true
        })
        this.props.addExpenseOperation(values,(r)=>{
            message.success('Expense added successfully!!!');
            this.setState({
                btnLoading:false
            })
            this.getAllExpenseData();
            this.formRef.current.resetFields();
        },(e)=>{
            message.error('Something went wrong!!!');
            this.setState({
                btnLoading:false
            })
        })
    };

    addCategoryHandler = (values) => {
        // console.log("addCategoryHandler ",values)
        this.setState({
            btnLoading:true
        })
        this.props.addCategoryOperation(values,(r)=>{
            message.success('Category added successfully!!!');
            this.props.getAllCategory()
            this.setState({
                btnLoading:false
            })
            this.formRef.current.resetFields();
        },(e)=>{
            message.error('Something went wrong!!!');
            this.setState({
                btnLoading:false
            })
        });
    };

    getAllExpenseData = (datesData = null)=>{
        this.props.getAllExpenses(datesData,(r)=>{
            let data = r.data.map((value,key)=>{
                return {key : key+1,date_added:value.date_added,category:value.category,amount:value.amount,description:value.description}
            })
            this.setState({
                tableData:data
            })
        })
    }

    getDateValue = (dates)=>{
        if(dates && moment(dates[1]['_d']).format('YYYY-MM-DD')){
            let data = {
                start_date:moment(dates[0]['_d']).format('YYYY-MM-DD'),
                end_date:moment(dates[1]['_d']).format('YYYY-MM-DD')
            }
            this.getAllExpenseData(data);
        }else{
            this.getAllExpenseData();
        }
    }
    
    expenseHandlerFinish = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    componentDidMount = async()=>{
        this.props.getAllCategory()
        this.getAllExpenseData()
    }

    render() {
        return (
            <div className="p-30">
            <Row gutter={16}>
                <Col span={9}>
                    <Card 
                        title="Category" 
                        extra={<Button type="primary" onClick={()=>this.showDrawer(1)}>Add category</Button>}
                    >
                        {/* <p>Card content</p> */}
                        {idx(this.props.category_data,_=>_.length)?
                                this.props.category_data.map((value,index)=>
                                    <p key={index} value={value}>{value}</p>
                                )
                            :
                                <p>No category Available at</p>
                            }
                    </Card>
                </Col>
                <Col span={14}>
                    <Card 
                        title="Expenses" 
                        extra={<Button type="primary" onClick={()=>this.showDrawer(0)}>Add Expense</Button>}
                    >
                        <div className="mb-20">
                            <RangePicker onChange={this.getDateValue} format={dateFormat}/>
                        </div>
                        <Table columns={this.state.tableColumn} dataSource={this.state.tableData} />   
                    </Card>
                </Col>
            </Row>
            <Drawer
                title="Add Category"
                placement="right"
                closable={false}
                onClose={this.hideDrawer}
                visible={this.state.drawerHandler}
                width={340}
            >
                {this.state.currentLoadForm ? 
                    <Form
                        name="add_category"
                        colon={false}
                        layout={"vertical"}
                        initialValues={{
                            name: '',
                        }}
                        // resetFields={{}}
                        ref={this.formRef}
                        onFinish={this.addCategoryHandler}
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
                            <Button loading={this.state.btnLoading} type="primary" htmlType="submit" block>
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
                    onFinish={this.addExpenseHandler}
                    ref={this.formRef}
                    onFinishFailed={this.expenseHandlerFinish}
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
                            {idx(this.props.category_data,_=>_.length)?
                                this.props.category_data.map((value,index)=>
                                    <Select.Option key={index} value={value}>{value}</Select.Option>
                                )
                            :
                                null
                            }
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
                        <InputNumber style={{ width: '100%' }}/>
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
                        <Button loading={this.state.btnLoading} type="primary" htmlType="submit" block>
                            Add Expense 
                        </Button>
                    </Form.Item>
                </Form>
                }
            </Drawer>
        </div>
        );
    }
}

// export default dash;
function mapStateToProps(state){
    return{
        category_data:state.Dashboard.category_data
    }
}

export default connect(mapStateToProps,{
    addCategoryOperation,
    addExpenseOperation,
    getAllCategory,
    getAllExpenses
})(dash);