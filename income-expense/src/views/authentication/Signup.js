import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import {Routes} from 'config/Routes';
import {connect} from 'react-redux';
import {signupHandler} from 'redux/actions/Auth';

class Signup extends Component {

    state={
        btnLoading:false
    }

    onFinish = (value) => {
        this.setState({
            btnLoading:true
        })
        this.props.signupHandler(value,(r)=>{
            message.success(r.data.message);
            this.setState({
                btnLoading:false
            })
            setTimeout(()=>{
                this.props.history.push(Routes.Login);
            },2000)
        },(e)=>{
            message.error('Something went wrong!!!');
            this.setState({
                btnLoading:false
            })
        });
    }

    render() {
        return (
            <div className="auth-layout-container">
                <div className="part-one">
                    <img alt="login" src="img/signup.svg" className="auth-img"/>
                </div>
                <div className="part-two">  
                    <div className="login-header mb-30">
                        <img alt="login" src="img/expenses.svg" height="55px"/>
                        <div className="company-name">Expense Manager</div>
                    </div>
                    <div className="text-information mb-20">
                        Create your account
                    </div>
                    <Form
                        name="basic"
                        initialValues={{
                        remember: true,
                        }}
                        colon={false}
                            onFinish={this.onFinish}
                        //   onFinishFailed={onFinishFailed}
                        layout={"vertical"}
                    >
                        <Form.Item
                            name="user_name"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={this.state.btnLoading} htmlType="submit" block className="mt-20">
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

// export default Login;
function mapStateToProps(state){
    return{
    }
}

export default connect(mapStateToProps,{
    signupHandler
})(Signup);