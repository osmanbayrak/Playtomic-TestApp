import React from 'react';
import './Login.css';
import { Input, Form, Checkbox, Button, Col } from 'antd';
import * as LoginActions from '../../Actions/Login/LoginActions';
import * as PageEventsActions from '../../Actions/PageEvents/PageEventsActions';
import "antd/dist/antd.css";
import { loginInputDataDto } from '../../DataModels/LoginDataDto';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from '../../Reducers/ReducerCombiner';

interface LoginProps extends LoginActions.LoginActionsDeclerations, PageEventsActions.PageEventsActionsDeclerations {
  history: any
};

class Login extends React.Component<LoginProps, loginInputDataDto> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  };

  render() {
    const {email, password} = this.state;
    return (
      <div className="Login">
        <Col className='loginBox' xs={{span: 24}} md={{span: 8, offset: 8}}>
          <h1>Login</h1>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={this.onSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your e-mail!' }]}
            >
              <Input value={email} onChange={(e)=> {this.setState({email: e.target.value})}} placeholder='E-mail' />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={(e)=> {this.setState({password: e.target.value})}} placeholder='Password' />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className='rememberMe'>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button className='submitButton' type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    );
  };
  private onSubmit = () => {
    const {email, password} = this.state;
    this.props.toggleLoading(true);
    let requestBody: loginInputDataDto = {
      email: email,
      password: password
    }
    this.props.Login(requestBody, this.props.history);
  };
};

const mapStateToProps = (state: AppState, props: LoginProps) => {
  return {
      ...props,
  };
};

const mapDispatchToProps = (dispatch: any, state: any) => {
  return bindActionCreators({ ...LoginActions, ...PageEventsActions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
