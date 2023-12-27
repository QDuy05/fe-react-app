import { Modal, Row, Col, Card, Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { getShipInfo, unverifyShip, verifyShip } from '../../services/shipService';
import moment from 'moment';


const UpdateShipDetail = (props) => {
    const shipInfo = props.shipInfo

    const styleLabel = {
        border: 'black',
        borderStyle: 'groove',
        borderWidth: 'thin',
        borderRadius: '5px',
        float: 'left',
        width: '100%',
    }

    const handleOk = async () => {

    };
    const handleCancel = () => {
        props.setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <>
            <Card size="default" style={{ textAlign: 'center' }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    style={{}}
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row style={{ height: '2rem' }}>
                        <Col span={12} style={{ paddingRight: '5%' }}>
                            <Form.Item
                                style={{ height: '0.5rem' }}

                                label="Mã tàu: "
                            >
                                <label style={styleLabel}>{shipInfo?.plate_number}</label>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                style={{ height: '0.5rem' }}
                                label="Khu vực: "
                            >
                                <label style={styleLabel}>{shipInfo?.locationcode ? shipInfo?.locationcode : 'Trống'}</label>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ height: '2rem' }}>
                        <Col span={12} style={{ paddingRight: '5%' }}>
                            <Form.Item
                                style={{ height: '0.5rem' }}
                                label="Chủ tàu: "
                            >
                                <label style={styleLabel}>{ }</label>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                style={{ height: '0.5rem' }}
                                label="Thuyền trưởng: "
                            >
                                <label style={styleLabel}>{shipInfo?.captioncode ? shipInfo?.captioncode : 'Trống'}</label>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} >
                            <Card title='Thông tin đăng kí'>
                                <Col span={24} style={{ height: '20rem', overflow: 'auto' }} >
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Mã nghề 1: "
                                    // name="businesscode"
                                    >
                                        <label style={styleLabel}>{shipInfo?.businesscode ? shipInfo?.businesscode : 'Trống'}</label>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Mã nghề 2: "
                                    // name="business2code"
                                    >
                                        <label style={styleLabel}>{shipInfo?.business2code ? shipInfo?.business2code : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Mã nghề 3: "
                                    // name="business3code"
                                    >
                                        <label style={styleLabel}>{shipInfo?.business3code ? shipInfo?.business3code : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Mã nghề 4: "
                                    // name="business4code"
                                    >
                                        <label style={styleLabel}>{shipInfo?.business4code ? shipInfo?.business4code : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="GPKT"
                                    // name="licenseid"
                                    >
                                        <label style={styleLabel}>{shipInfo?.licenseid ? shipInfo?.licenseid : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Hô hiệu"
                                    // name="HoHieu"
                                    >
                                        <label style={styleLabel}>{shipInfo?.HoHieu ? shipInfo?.HoHieu : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Cờ hiệu"
                                    // name="CoHieu"
                                    >
                                        <label style={styleLabel}>{shipInfo?.CoHieu ? shipInfo?.CoHieu : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="IMO"
                                    // name="IMO"
                                    >
                                        <label style={styleLabel}>{shipInfo?.IMO ? shipInfo?.IMO : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Cảng đăng kí"
                                    // name="CangCaDangKyCode"
                                    >
                                        <label style={styleLabel}>{shipInfo?.CangCaDangKyCode ? shipInfo?.CangCaDangKyCode : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Cảng phụ"
                                    // name="CangCaPhuCode"
                                    >
                                        <label style={styleLabel}>{shipInfo?.CangCaPhuCode ? shipInfo?.CangCaPhuCode : 'Trống'}</label>

                                    </Form.Item>

                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Ngày sản xuất"
                                    // name="NgaySanXuat"
                                    >
                                        <label style={styleLabel}>{shipInfo?.NgaySanXuat ? moment(shipInfo?.NgaySanXuat).format('DD/MM/YYYY') : 'Trống'}</label>
                                        {/* <Input disabled value={shipInfo?.NgaySanXuat ? moment(shipInfo?.NgaySanXuat).format('DD/MM/YYYY') : 'Trống'} /> */}
                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Ngày hết hạn"
                                    // name="NgayHetHan"
                                    >
                                        <label style={styleLabel}>{shipInfo?.NgayHetHan ? moment(shipInfo?.NgayHetHan).format('DD/MM/YYYY') : 'Trống'}</label>
                                        {/* <Input disabled style={} value={shipInfo?.NgayHetHan ? moment(shipInfo?.NgayHetHan).format('DD/MM/YYYY') : 'Trống'} /> */}
                                    </Form.Item>
                                </Col>
                            </Card>
                        </Col>
                        <Col span={12} >
                            <Card title='Thông tin thông số' >
                                <Col span={24} style={{ height: '20rem', overflow: 'scroll' }} >

                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Chiều dài"
                                    // name="length"
                                    >
                                        <label style={styleLabel}>{shipInfo?.length ? shipInfo?.length + ' m' : 'Trống'}</label>
                                        {/* <Input placeholder='Trống' disabled style={} suffix="m" value={shipInfo?.length} /> */}
                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Công suất"
                                    // name="congsuat"
                                    >
                                        <label style={styleLabel}>{shipInfo?.congsuat ? shipInfo?.congsuat + ' CV' : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Tổng tải trọng"
                                    // name="TongTaiTrong"
                                    >
                                        <label style={styleLabel}>{shipInfo?.TongTaiTrong ? shipInfo?.TongTaiTrong + ' tấn' : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Chiều rộng max"
                                    // name="ChieuRongLonNhat"
                                    >
                                        <label style={styleLabel}>{shipInfo?.ChieuRongLonNhat ? shipInfo?.ChieuRongLonNhat : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Mớn nước"
                                    // name="MonNuoc"
                                    >
                                        <label style={styleLabel}>{shipInfo?.MonNuoc ? shipInfo?.MonNuoc : 'Trống'}</label>

                                    </Form.Item>

                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Dung tích hầm cá"
                                    // name="DungTichHamCa"
                                    >
                                        <label style={styleLabel}>{shipInfo?.DungTichHamCa ? shipInfo?.DungTichHamCa : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Số thuyền viên"
                                    // name="SoThuyenVien"
                                    >
                                        <label style={styleLabel}>{shipInfo?.SoThuyenVien ? shipInfo?.SoThuyenVien : 'Trống'}</label>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Vận tốc đánh bắt"
                                    // name="VanTocDanhBat"
                                    >
                                        <label style={styleLabel}>{shipInfo?.VanTocDanhBat ? shipInfo?.VanTocDanhBat : 'Trống'}</label>

                                    </Form.Item>
                                    <Form.Item
                                        style={{ height: '0.5rem' }}
                                        label="Vận tốc hành trình"
                                    // name="VanTocHanhTrinh"
                                    >
                                        <label style={styleLabel}>{shipInfo?.VanTocHanhTrinh ? shipInfo?.VanTocHanhTrinh : 'Trống'}</label>
                                    </Form.Item>
                                </Col>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Card >

        </>
    );
}

export default UpdateShipDetail