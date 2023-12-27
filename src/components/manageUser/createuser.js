import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createUser } from '../../services/userService';
import useWindowDimensions from "../windowSize/windowSize";

const onFinish = async (values) => {
    let check = isValidInput(values);
    let { username, password, firstName, lastName, email, gender, phone, roleId } = values;
    if (check === true) {
        let respone = await createUser(username, password, firstName, lastName, email, gender, phone, roleId)
        let serverData = respone.data;
        if (+serverData.EC === 0) {
            toast.success(serverData.EM)
        } else {
            toast.error(serverData.EM)
        }
    }
};

const isValidInput = (values) => {
    //Kiểm tra null
    if (!values.username) {
        toast.error("Nhập tài khoản đi nhé")
        return false;
    } else if (!values.password) {
        toast.error("Nhập mật khẩu đi nhé")
        return false;
    } else if (!values.phone) {
        toast.error("Nhập số điện thoại đi nhé")
        return false;
    }
    //Kiểm tra nhập lại mật khẩu có khớp không
    if (values.password != values.confirmPassword) {
        toast.error("Mật khẩu nhập lại không khớp")
        return false;
    }
    //Kiểm tra email hợp lệ
    let regx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (values.email && !regx.test(values.email)) {
        toast.error("Email không hợp lệ")
        return false;
    }
    return true
}
const onFinishFailed = (errorInfo) => {
    toast.error("Lỗi: Thông tin chưa đầy đủ");
    console.log('Failed:', errorInfo);
};

const CreateUser = (props) => {
    const size = useWindowDimensions();
    const optionsGender = [
        { value: '1', label: 'Nam', },
        { value: '0', label: 'Nữ', }
    ];

    const optionsRoleId = [
        { value: '1', label: 'Admin', },
        { value: '2', label: 'Người dân', },
        { value: '3', label: 'Biên phòng', },
    ]

    return (
        <>
            <div style={{
                backgroundColor: '#EFEFEF', height: '100vh', width: size.width > 500 ? '84vw' : '100vw', margin: size.width > 500 ? '-10px -10px -10px 0' : '0 -10px',
            }}>
                <Row style={{ justifyContent: 'center' }}>
                    <Col span={24} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10vh 0'
                    }}>
                        <Card title="Đăng ký tài khoản mới" size="default" style={{ minWidth: 200, maxwidth: 700, textAlign: 'center' }}>
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
                                    gender: optionsGender[0].value,
                                    roleId: optionsRoleId[1].value
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
                                    <Input placeholder='Nhập tài khoản mới' />
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
                                    <Input.Password placeholder='Nhập mật khẩu mới' />
                                </Form.Item>
                                <Form.Item
                                    label="Nhập lại mật khẩu"
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mật khẩu không được trống',
                                        },
                                    ]}

                                >
                                    <Input.Password placeholder='Nhập lại mật khẩu' />
                                </Form.Item>
                                <Row>
                                    <Col span={12} style={{ paddingRight: '5%' }}>
                                        <Form.Item
                                            label="Họ"
                                            name="lastName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Họ không được trống',
                                                },
                                            ]}

                                        >
                                            <Input placeholder='Nhập họ' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Tên"
                                            name="firstName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tên không được trống',
                                                },
                                            ]}

                                        >
                                            <Input placeholder='Nhập tên' />
                                        </Form.Item>

                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={12} style={{ paddingRight: '5%' }}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    required: false,
                                                    message: 'Email không đúng định dạng'
                                                }
                                            ]}
                                        >
                                            <Input placeholder='Nhập email' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="SDT"
                                            name="phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Số điện thoại không được trống'
                                                }
                                            ]}

                                        >
                                            <Input placeholder='Nhập số điện thoại' />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12} style={{ paddingRight: '5%' }}>
                                        <Form.Item
                                            label="Giới tính"
                                            name="gender"

                                            rules={[
                                                {
                                                    required: false,
                                                }
                                            ]}
                                        >
                                            <Select
                                                options={optionsGender}

                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Quyền"
                                            name="roleId"
                                        >
                                            <Select
                                                options={optionsRoleId}

                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Đăng ký
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

export default CreateUser;