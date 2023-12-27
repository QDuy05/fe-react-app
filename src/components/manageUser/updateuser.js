import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




const isValidInput = (values) => {
    //Kiểm tra null
    if (!values.phone) {
        toast.error("Nhập số điện thoại đi nhé")
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

const UpdateUser = (props) => {

    const [updateForm] = Form.useForm()

    const optionsGender = [
        { value: '1', label: 'Nam', },
        { value: '0', label: 'Nữ', }
    ];

    const optionsRoleId = [
        { value: '1', label: 'Admin', },
        { value: '2', label: 'Người dân', },
        { value: '3', label: 'Biên phòng', },
    ]
    const onFinish = async (values) => {
        let check = isValidInput(values);
        props.handleCancel();
        if (check === true) {

        }
    };

    useEffect(() => {
        updateForm.resetFields()
        console.log('data in updt', props.data.phone);
        const field = updateForm.getFieldValue();
        console.log(props.data.Role.id);
    }, [props.data])

    return (
        <>
            <div style={{
                backgroundColor: '#EFEFEF', height: '100%', width: '100%',
            }}>
                <Row style={{ justifyContent: 'center' }}>
                    <Col span={24} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Card title="Cập nhật thông tin tài khoản" size="default" style={{ minWidth: 200, maxwidth: 700, textAlign: 'center' }}>
                            <Form
                                form={updateForm}
                                name="basic"
                                labelCol={{

                                }}
                                wrapperCol={{
                                    span: 30,
                                }}
                                style={{

                                }}
                                initialValues={{
                                    lastName: props.data.lastName,
                                    firstName: props.data.firstName,
                                    phone: props.data.phone,
                                    remember: true,
                                    gender: optionsGender[props.data.gender - 1].value,
                                    roleId: optionsRoleId[props.data.Role.id - 1].value
                                }}

                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                {/* <Form.Item
                                    label="Tài khoản"
                                    name="username"
                                    value='123'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tài khoản không được trống',
                                        },
                                    ]}
                                >
                                    <Input {...'adc'} placeholder='Nhập tài khoản mới' />
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
                                </Form.Item> */}
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
                                    <Row>
                                        <Col span={12} style={{ padding: '0 5%' }}>
                                            <Button type="default" block onClick={() => props.handleCancel()}>
                                                Đóng
                                            </Button>
                                        </Col>
                                        <Col span={12} style={{ padding: '0 5%' }}>
                                            <Button type="primary" htmlType="submit" block>
                                                Cập nhật
                                            </Button>
                                        </Col>
                                    </Row>


                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default UpdateUser;