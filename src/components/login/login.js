import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Row, Col, Card, Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux } from '../../store/actions/userAction';


const onFinishFailed = async (errorInfo) => {
    console.log('Failed:', errorInfo);
};



const Login = (props) => {
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()
    const dispatch = useDispatch()
    const account = useSelector(state => state.user.auth)

    const onFinish = async () => {
        if (!username) {
            toast.error("Nhập tài khoản nhé")
        } else if (!password) {

        }
        dispatch(handleLoginRedux(username, password))
    };

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
        }
    }, [account]);

    return (
        <>
            <div style={{ backgroundColor: '#EFEFEF', height: '100vh', margin: '-10px -10px -10px 0', width: '100vw' }}>
                <Row style={{ justifyContent: 'center' }}>
                    <Col span={24} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20vh 0'
                    }}>
                        <Card title="Đăng nhập" size="default" style={{ minWidth: 300, width: 600, textAlign: 'center' }}>
                            <Form
                                name="basic"
                                labelCol={{

                                }}
                                wrapperCol={{
                                    span: 30,
                                }}
                                style={{

                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tài khoản"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tài khoản không được trống',
                                        },
                                    ]}
                                >
                                    <Input value={username} onChange={(e) => setusername(e.target.value)} placeholder='Nhập tài khoản hoặc số điện thoại' />
                                </Form.Item>

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mật khẩu không được trống',
                                        },
                                    ]}
                                >
                                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Nhập mật khẩu' />
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 3,
                                        span: 20,

                                    }}
                                >
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox>Nhớ mật khẩu</Checkbox>
                                        </Col>
                                        <Col span={8} offset={4}>
                                            <a href="#">Quên mật khẩu</a>
                                        </Col>
                                    </Row>


                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>

                    </Col>
                </Row>

            </div>



        </>
    )
}

export default Login;