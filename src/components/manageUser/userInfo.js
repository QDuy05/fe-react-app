import { Avatar, Row, Card, Space, Button, Checkbox, Form, Input, Col } from "antd"
import { UserOutlined } from '@ant-design/icons';

const UserInfo = () => {

    const styleLabel = {
        border: 'black',
        borderStyle: 'groove',
        borderWidth: 'thin',
        borderRadius: '5px',
        float: 'left',
        width: '100%',
    }

    const styleFormItem = {
        height: '1rem'
    }

    return (
        <>

            <Card
                title='Thông tin người dùng'
                style={{ textAlign: 'center', height: '85vh' }}>

                <Row>
                    <Col span={8}>
                        <Space direction="vertical">
                            <Avatar size={64} icon={<UserOutlined />} />
                            <label style={{ textAlign: 'center' }}>Tên tài khoản</label>
                        </Space>
                    </Col>
                    <Col span={16} style={{
                        textAlign: 'center',
                        borderLeft: '1px solid',
                        height: '70vh',
                    }}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 10,
                            }}
                            style={{
                                alignItems: 'center',
                                paddingTop: '2rem',
                            }}

                            autoComplete="off"
                        >
                            <Form.Item
                                style={styleFormItem}
                                label="Tên người dùng"

                            >
                                <label style={styleLabel}>Trống</label>
                            </Form.Item>
                            <Form.Item
                                style={styleFormItem}
                                label="CCCD/CMND"
                            >
                                <label style={styleLabel}>Trống</label>
                            </Form.Item>
                            <Form.Item
                                style={styleFormItem}
                                label="Số điện thoại">
                                <label style={styleLabel}>Trống</label>
                            </Form.Item>
                            <Form.Item
                                style={styleFormItem}
                                label="Chức vụ/ Nghề nghiệp">
                                <label style={styleLabel}>Trống</label>
                            </Form.Item>
                            <Form.Item
                                style={styleFormItem}
                                label="Chứng chỉ">
                                <label style={styleLabel}>Trống</label>
                            </Form.Item>
                            <Form.Item
                                style={styleFormItem}
                                label="Địa chỉ">
                                <label style={styleLabel}>Trống</label>
                            </Form.Item>
                            <Form.Item
                                style={styleFormItem}
                                label="Ngày tháng năm sinh">
                                <label style={styleLabel}>Trống</label>
                            </Form.Item>

                            <Form.Item
                                style={styleFormItem}
                                wrapperCol={{

                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Sửa thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>


            </Card>

        </>
    )
}

export default UserInfo