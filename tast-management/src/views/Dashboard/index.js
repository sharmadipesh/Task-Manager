import React, { Component } from 'react';
import { Card, Row, Col,Form, Input, Button,DatePicker,message,Table,Space,Tag,Modal,Popconfirm } from 'antd';
import {taskAddHandler,taskDeleteHandler,taskUpdateHandler} from 'redux/actions/Auth';
import {connect} from 'react-redux'; 
import moment from 'moment';
import idx from 'idx';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import UpdateForm from './UpdateForm';
// import ReactEcharts from 'echarts-for-react';

const { RangePicker } = DatePicker;

class Dashboard extends Component {
    formRef = React.createRef();

    state={
        btnLoading:false,
        tableHeader:[],
        tableBody:[],
        isUpdating:false,
        currentRowData:null,
        searchText: '',
        searchedColumn: '',
        visible:false,
        idStatus:0,
        filterOperationData:null,
        scheduledTask:0,
        expiredTask:0,
        runningTask:0
    }

    onUpdateHandler = async(values) =>{

        let startTime=moment(idx(values.task_duration,_=>_[0]._d));
        let endTime=moment(idx(values.task_duration,_=>_[1]._d));
        let newData={
            ...values,
            start_date_time:moment(idx(values.task_duration,_=>_[0]._d)).format('DD-MM-YYYY HH:mm:ss'),
            end_date_time:moment(idx(values.task_duration,_=>_[1]._d)).format('DD-MM-YYYY HH:mm:ss'),
            status:this.getTaskStatus(startTime,endTime),
        }
        
        let dataContainer = [...this.props.task_information];
        const index = dataContainer.findIndex(i => i.id === values.id)
        dataContainer.splice(index, 1,newData);

        this.props.taskUpdateHandler(dataContainer,()=>{
            message.success('Task updated successfully;)');
            this.handleCancel();
        },()=>{
            message.error('Something went wrong!!!');
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
            currentRowData:null
        });
    };

    componentDidMount = () =>{
        this.setState({
            tableHeader:[
                {
                    title: 'Task Name',
                    dataIndex: 'task_name',
                    key: 'task_name',
                    ...this.getColumnSearchProps('task_name'),
                },
                {
                    title: 'Description',
                    dataIndex: 'task_desc',
                    key: 'task_desc',
                },
                {
                    title: 'Start Time',
                    dataIndex: 'start_date_time',
                    key: 'start_date_time',
                },
                {
                    title: 'End Time',
                    dataIndex: 'end_date_time',
                    key: 'end_date_time',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: tags => (
                        <>
                            {tags ==='Scheduled' ?  <Tag color={'geekblue'}>
                                {tags}
                            </Tag>:null
                            }
                            {tags ==='Running' ?  <Tag color={'green'}>
                                {tags}
                            </Tag>:null}
                            {tags ==='Expired' ?  <Tag color={'volcano'}>
                                {tags}
                            </Tag>:null}
                        </>
                    ),
                    sorter: (a, b) => a.status.length - b.status.length
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={()=>{
                                this.setState({
                                    currentRowData:record
                                },()=>{
                                    this.showModal()
                                })
                            }}>
                                Update
                            </Button>
                            <Popconfirm
                                // placement="topRight"
                                title={"Are you sure to delete this task?"}
                                okText="Yes"
                                cancelText="No"
                                onConfirm={()=>this.onDeleteHandler(record)}
                            >
                            <Button type="primary" danger 
                                // onClick={()=>this.onDeleteHandler(record)}
                            >
                                Delete
                            </Button>
                            </Popconfirm>
                        </Space>
                    ),
                }
            ]
        })
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
            ) : (
            text
        ),
    });

    onDeleteHandler = (row)=>{
        let dataContainer = [...this.props.task_information];
        // const index = dataContainer.findIndex(i => i.start_date_time === row.start_date_time)
        const index = dataContainer.findIndex(i => i.id === row.id)
        console.log("index ",index)
        dataContainer.splice(index, 1);
        this.props.taskDeleteHandler(dataContainer,()=>{
            message.success('Task deleted successfully;)');
        },()=>{
            message.error('Something went wrong!!!');
        })
    }

    onFinish = (values) => {
        this.setState({
            btnLoading:true
        })
        // let startTime=moment(idx(values.task_duration,_=>_[0]._d)).format('DD-MM-YYYY HH:mm:ss')
        // let endTime=moment(idx(values.task_duration,_=>_[1]._d)).format('DD-MM-YYYY HH:mm:ss');
        let startTime=moment(idx(values.task_duration,_=>_[0]._d));
        let endTime=moment(idx(values.task_duration,_=>_[1]._d));
        let data={
            ...values,
            start_date_time:moment(idx(values.task_duration,_=>_[0]._d)).format('DD-MM-YYYY HH:mm:ss'),
            end_date_time:moment(idx(values.task_duration,_=>_[1]._d)).format('DD-MM-YYYY HH:mm:ss'),
            status:this.getTaskStatus(startTime,endTime),
            id:this.state.idStatus
        }
        console.log("Eee ",this.getTaskStatus(startTime,endTime))
    
            this.props.taskAddHandler(data,()=>{
                this.setState({
                    btnLoading:false,
                    idStatus:this.state.idStatus+1
                })
                console.log(this.state.btnLoading," btnLoading")
                message.success('Task added successfully;)');
                this.formRef.current.resetFields();

            },()=>{
                message.error('Something went wrong!!!');
                // this.setState({
                //     btnLoading:false
                // })
            });
    };

    getDateValue = (dates)=>{
        if(dates && moment(dates[1]['_d']).format('DD-MM-YYYY HH:mm:ss') && idx(this.props.task_information,_=>_.length)){
            let data = {
                start_date:dates[0]['_d'],
                end_date:dates[1]['_d']
            }

            let filtered_data  =  this.props.task_information.reduce((pV, value)=>{
                let ssTT = moment(value.start_date_time,'DD-MM-YYYY HH:mm:ss').format();
                let eeTT = moment(value.end_date_time,'DD-MM-YYYY HH:mm:ss').format();
                // console.log("alal ",moment(data.start_date).isBefore(ssTT) && moment(data.end_date).isAfter(eeTT))
                if(moment(data.start_date).isBefore(ssTT) && moment(data.end_date).isAfter(eeTT)){
                    pV.push(value)
                }
                return pV;
            },[])
            console.log("filtered_data ",filtered_data)
            this.setState({
                filterOperationData:filtered_data
            })
        }else{
            this.setState({
                filterOperationData:null
            })
        }
    }


    getTaskStatus = (startTime,endTime)=>{
        let currentTime = moment(); 
        let startTimeSet = moment(startTime._d);
        let endTimeSet = moment(endTime._d)
        if(moment(currentTime._d).isBefore(startTimeSet._d) && moment(currentTime._d).isBefore(endTimeSet._d)){
            return "Scheduled"
        }else if(moment(currentTime._d).isAfter(startTimeSet._d) && moment(currentTime._d).isBefore(endTimeSet._d)){
            return "Running"
        }else if(moment(currentTime._d).isAfter(startTimeSet._d) && moment(currentTime._d).isAfter(endTimeSet._d)){
            return "Expired"
        }
    }


    render() {
        // console.log("currentRowData ",this.state.currentRowData)
        let taskName = idx(this.state.currentRowData,_=>_.task_name);
        // console.log("taskName ",taskName)
        return (
            <div>
                <Row gutter={20}>
                    <Col span={7}>
                        <Card title="Add Task">
                            <Form
                                // name="add-task"
                                initialValues={{
                                    task_name: taskName || idx(this.state.currentRowData,_=>_.task_name),
                                    task_desc: "",
                                    task_duration: idx(this.state.currentRowData,_=>_.task_duration),
                                }}
                                onFinish={this.onFinish}
                                colon={false}
                                layout={'vertical'}
                                ref={this.formRef}
                                // preserve={true}
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
                                    initialValue={taskName}
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
                                    <Button loading={this.state.btnLoading} type="primary" htmlType="submit"  block>
                                        Add Task
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={17}>
                        <Card title="Task List" style={{marginBottom:"20px"}}>
                            <RangePicker showTime onChange={this.getDateValue}  format="YYYY-MM-DD HH:mm:ss" style={{marginBottom:"10px"}}/>
                            <Table pagination={false} columns={this.state.tableHeader} dataSource={this.state.filterOperationData ? this.state.filterOperationData : this.props.task_information} />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title="Update Task"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={"430px"}
                >
                    <UpdateForm currentRowData={this.state.currentRowData} onUpdateHandler={this.onUpdateHandler}/>
                </Modal>
            </div>
        );
    }
}

// export default Dashboard;
function mapStateToProps(state){
    return{
        task_information:state.Auth.task_information
    }
}

export default connect(mapStateToProps,{
    taskAddHandler,
    taskDeleteHandler,
    taskUpdateHandler
})(Dashboard);