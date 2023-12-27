import { Modal, Row, Col, Card, Button, Form, Tabs, Collapse, Input, DatePicker, Select } from 'antd';
import { useEffect, useState } from 'react';

import { getTripInfo } from '../../services/tripService';
import { useDispatch, useSelector } from 'react-redux';

import locale from 'antd/es/date-picker/locale/vi_VN';
import { LocationList, BussinessList } from '../manageInfo/infoList';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { toast } from 'react-toastify';
import { handleGetPort } from '../../store/actions/portAction';
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)



const TripDetail = (props) => {

    const [form] = Form.useForm()

    const [tripInfo, setTripInfo] = useState()
    const [isLabelHidden, setLabelHidden] = useState(false)
    const [isInputHidden, setInputHidden] = useState(true)
    const [isUpdateDisabled, setUpdateDisabled] = useState(true)
    const [isConfirmLoading, setConfirmLoading] = useState(false)
    const [isConfirmDisabled, setConfirmDisabled] = useState(false);

    const dispatch = useDispatch()
    const portData = useSelector(state => state.port.portData)

    const styleLabel = {
        border: 'black',
        borderStyle: 'groove',
        borderWidth: 'thin',
        borderRadius: '5px',
        float: 'left',
        width: '100%',
    }
    const dateFormat = 'DD/MM/YYYY HH:mm:ss';





    const defaultValues = {
        plate_number: tripInfo?.plate_number,
        owner: tripInfo?.captain,
        captain: tripInfo?.captain,
        date: tripInfo?.date ? dayjs.tz(tripInfo?.date, 'Asia/Ho_Chi_Minh').utc(true) : null,

        Sovaoso: tripInfo?.Sovaoso,
        year: tripInfo?.timeOfYear.year,
        numOfYear: tripInfo?.timeOfYear.numOfYear,
        total_oil: tripInfo?.total.oil,
        total_onsea: tripInfo?.total.onsea,
        total_fishmen: tripInfo?.total.fishmen,
        total_fish: tripInfo?.total.fish,
        total_expense: tripInfo?.total.expense,
        total_waste_plastic: tripInfo?.total.waste_plastic,
        total_value: tripInfo?.total.value,

        portOut: tripInfo?.portOut.name,
        portOut_date: tripInfo?.portOut.date ? dayjs.tz(tripInfo?.portOut.date, 'Asia/Ho_Chi_Minh').utc(true) : null,
        portOut_lat: tripInfo?.portOut.lat,
        portOut_lng: tripInfo?.portOut.lng,
        portOut_status: tripInfo?.portOut.status ? props.optionStatus[tripInfo?.portOut.status].label : null,

        portIn: tripInfo?.portIn.name,
        portIn_date: tripInfo?.portIn.date ? dayjs.tz(tripInfo?.portIn.date, 'Asia/Ho_Chi_Minh').utc(true) : null,
        portIn_lat: tripInfo?.portIn.lat,
        portIn_lng: tripInfo?.portIn.lng,
        portIn_status: tripInfo?.portIn.status ? tripInfo?.portIn.status : null,

    }
    useEffect(() => {
        form.setFieldsValue(defaultValues)
    }, [form, defaultValues])

    const showModal = () => {
        props.setIsModalOpen(true);
    };
    const handleOk = () => {
        props.setIsModalOpen(false);
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
    const onShowUpdateTrip = async () => {
        setLabelHidden(isLabelHidden => !isLabelHidden)
        setInputHidden(isInputHidden => !isInputHidden)
        setConfirmDisabled(isConfirmDisabled => !isConfirmDisabled)
        setUpdateDisabled(isUpdateDisabled => !isUpdateDisabled)

        dispatch(handleGetPort(localStorage.getItem('token')))
    }
    const handleUpdateTrip = () => { }
    useEffect(() => {
        fetchTripInfo(props.tripid)
    }, [])
    useEffect(() => {
        fetchTripInfo(props.tripid)
    }, [props.tripid])

    const fetchTripInfo = async (tripid) => {
        let token = localStorage.getItem('token');
        let response = await getTripInfo(token, tripid);
        if (response && response.data && response.status === 200) {
            setTripInfo(response.data.data);
        }
    }
    const itemInLeft = [
        {
            key: '1',
            label: 'Thông tin tàu',
            children: <>
                {/* */}
                <Form.Item
                    style={{}}
                    label="Mã tàu"
                    hidden={isLabelHidden}

                >
                    <label style={styleLabel}>{tripInfo?.plate_number ? tripInfo?.plate_number : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='plate_number'
                    label="Mã tàu"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Chủ tàu"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.owner ? tripInfo?.owner : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='owner'
                    label="Chủ tàu"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item
                    style={{}}
                    label="Thuyền trưởng"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.captain ? tripInfo?.captain : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='captain'
                    label="Thuyền trưởng"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="NKKT"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{'...'}</label>
                </Form.Item>
                <Form.Item
                    style={{ height: '0.5rem', width: '50%' }}
                    name='nkkt'
                    label="NKKT"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Ngày"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.date ? dayjs(tripInfo?.date).format('DD/MM/YYYY HH:mm A') : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='date'
                    label="Ngày"
                    hidden={isInputHidden}
                >
                    <DatePicker locale={locale} showTime format={dateFormat} style={{ width: '100%' }} />
                </Form.Item>
            </>
        },
        {
            key: '2',
            label: 'Thông tin chuyến biển',
            children: <>

                {/*  */}
                <Form.Item
                    style={{}}
                    label="Số vào sổ"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.Sovaoso ? tripInfo?.Sovaoso : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='Sovaoso'
                    label="Số vào sổ"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Năm"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.timeOfYear.year ? tripInfo?.timeOfYear.year : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='year'
                    label="Năm"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Chuyến thứ "
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.timeOfYear.numOfYear ? tripInfo?.timeOfYear.numOfYear : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='numOfYear'
                    label="Chuyến thứ"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Tổng lượng dầu "
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.total.oil ? tripInfo?.total.oil : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='total_oil'
                    label="Tổng lượng dầu"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Tổng ngày trên biển "
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.total.onsea ? tripInfo?.total.onsea : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='total_onsea'
                    label="Tổng ngày trên biển"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Tổng thuyền viên"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.total.fishmen ? tripInfo?.total.fishmen : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='total_fishmen'
                    label="Tổng thuyền viên"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Tổng lượng cá"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.total.fish ? tripInfo?.total.fish : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='total_fish'
                    label="Tổng lượng cá"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Tổng chi phí"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.total.expense ? tripInfo?.total.expense : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='total_expense'
                    label="Tổng chi phí"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Tổng rác thải nhựa"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.total.waste_plastic ? tripInfo?.total.waste_plastic : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='total_waste_plastic'
                    label="Tổng rác thải nhựa"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Tổng giá trị"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.total.value ? tripInfo?.total.value : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='total_value'
                    label="Tổng giá trị"
                    hidden={isInputHidden}
                >
                    <Input type='number' />
                </Form.Item>
            </>
        }
    ]
    const itemInRight = [
        {
            key: '1',
            label: 'Thông tin xuất cảng',
            children: <>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Cảng xuất"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portOut.name ? tripInfo?.portOut.name : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portOut'
                    label="Cảng xuất"
                    hidden={isInputHidden}
                >
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        placeholder="Tìm kiếm"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={portData}

                    />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Ngày xuất"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portOut ? dayjs(tripInfo?.portOut.date).format('DD/MM/YYYY HH:mm A') : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portOut_date'
                    label="Ngày xuất"
                    locale={locale}
                    hidden={isInputHidden}
                >
                    <DatePicker locale={locale} showTime format={dateFormat} style={{ width: '100%' }} />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Kinh độ"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portOut.lat ? tripInfo?.portOut.lat : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portOut_lat'
                    label="Kinh độ"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Vĩ độ"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portOut.lng ? tripInfo?.portOut.lng : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portOut_lng'
                    label="Vĩ độ"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Trạng thái"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portOut.status ? props.optionStatus[tripInfo?.portOut.status - 1].label : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portOut_status'
                    label="Trạng thái"
                    hidden={isInputHidden}
                >
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        placeholder="Tìm kiếm"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={props.optionStatus}

                    />
                </Form.Item>
            </>
        },
        {
            key: '2',
            label: 'Thông tin nhập cảng',
            children: <>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Cảng nhập"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portIn.name ? tripInfo?.portIn.name : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portIn'
                    label="Cảng nhập"
                    hidden={isInputHidden}
                >
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        placeholder="Tìm kiếm"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={portData}

                    />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Ngày nhập"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portIn.date ? dayjs(tripInfo?.portIn.date).format('DD/MM/YYYY HH:mm A') : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portIn_date'
                    label="Ngày nhập"
                    hidden={isInputHidden}
                >
                    <DatePicker locale={locale} showTime format={dateFormat} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    style={{}}
                    label="Kinh độ"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portIn.lat ? tripInfo?.portIn.lat : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portIn_lat'
                    label="Kinh độ"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Vĩ độ"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portIn.lng ? tripInfo?.portIn.lng : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portIn_lng'
                    label="Vĩ độ"
                    hidden={isInputHidden}
                >
                    <Input type='text' />
                </Form.Item>
                {/*  */}
                <Form.Item
                    style={{}}
                    label="Trạng thái"
                    hidden={isLabelHidden}
                >
                    <label style={styleLabel}>{tripInfo?.portIn.status ? props.optionStatus[tripInfo?.portIn.status - 1].label : '...'}</label>
                </Form.Item>
                <Form.Item
                    style={{}}
                    name='portIn_status'
                    label="Trạng thái"
                    hidden={isInputHidden}
                >
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        placeholder="Tìm kiếm"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={props.optionStatus}

                    />
                </Form.Item>
            </>
        }
    ]
    const itemTabs = [
        {
            key: '1',
            label: 'Thông tin',
            children:
                <Form
                    form={form}
                    name="trip"
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    style={{ textAlign: 'center' }}
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Collapse
                                items={itemInLeft}
                                defaultActiveKey={['1', '2']}>

                            </Collapse>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Collapse
                                items={itemInRight}
                                defaultActiveKey={['1', '2']}>
                            </Collapse>
                        </Col>
                    </Row>
                </Form>
            ,
        },
        {
            key: '2',
            label: 'Danh sách thuyền viên',
            children: 'Content of Tab Pane 2',
        },
        // {
        //   key: '3',
        //   label: 'Tab 3',
        //   children: 'Content of Tab Pane 3',
        // },
    ];



    return (
        <>
            <Modal
                title="Thông tin chuyến biển"
                width={1000}
                open={props.isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ top: 10 }}
                bodyStyle={{ minHeight: '70vh' }}
                footer={[
                    <Button key="1" danger onClick={handleCancel}>Đóng</Button>,
                    <Button key="2" onClick={onShowUpdateTrip}>{isInputHidden == false ? 'Hủy cập nhật' : 'Cập nhật'}</Button>,
                    <Button key="3" type='primary' disabled={isUpdateDisabled} onClick={handleUpdateTrip}>Xác nhận cập nhật</Button>,
                    <Button key="4" type="primary" onClick={handleOk} disabled={isConfirmDisabled} loading={isConfirmLoading}>
                        {'Xác thực'}
                    </Button>
                ]}>

                <Tabs defaultActiveKey="1" style={{ minHeight: '100%' }} items={itemTabs} />


            </Modal >
        </>
    )

}
export default TripDetail;