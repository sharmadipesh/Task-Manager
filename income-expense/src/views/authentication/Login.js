import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import {Routes} from 'config/Routes';
import {connect} from 'react-redux';
import {reduxSetup,loginHandler} from 'redux/actions/Auth';

class Login extends Component {

    state={
        btnLoading:false
    }

    // componentDidMount = ()=>{
    //     localStorage.clear()
    // }

    onFinish = (value) => {
        // console.log("Login ",value)
        this.setState({
            btnLoading:true
        })
        this.props.loginHandler(value,(r)=>{
            message.success('You are successfully logged in');
            this.props.history.push(Routes.Dashboard)
            this.setState({
                btnLoading:false
            })
        },(e)=>{
            message.error('Something went wrong!!!');
            this.setState({
                btnLoading:false
            })
        });
    }

    componentDidMount = () =>{
        this.props.reduxSetup()
    }

    render() {
        return (
            <div className="auth-layout-container">
                <div className="part-one">
                    <img alt="login" src="img/login.svg" className="auth-img"/>
                </div>
                <div className="part-two">  
                    <div className="login-header mb-30">
                        <img alt="login" src="img/expenses.svg" height="60px"/>
                        <div className="company-name">Expense Manager</div>
                    </div>
                    <div className="text-information ">
                        Welcome Back
                    </div>
                    <div className="mb-30 text-small">
                        Login to continue
                    </div>
                    <Form
                        name="login"
                        initialValues={{
                        remember: true,
                        }}
                        colon={false}
                        onFinish={this.onFinish}
                        //   onFinishFailed={onFinishFailed}
                        layout={"vertical"}
                    >
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
                            <Button type="primary" htmlType="submit" loading={this.state.btnLoading} block className="mt-20">
                                Sign in
                            </Button>
                        </Form.Item>
                        <div className="register-now-text">
                            Don't have an account? <span className="clickable" 
                            onClick={()=>this.props.history.push(Routes.Signup)}
                            >Register Now</span>
                        </div>
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
    reduxSetup,
    loginHandler
})(Login);