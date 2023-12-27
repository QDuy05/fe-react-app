import { Modal, Row, Col, Card, Button, Form, Input, Collapse, Select, DatePicker } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { getShipInfo, unverifyShip, updateShip, verifyShip } from '../../services/shipService';
import moment from 'moment';
import { getPeopleInfo } from '../../services/peopleService';
import UpdateShipDetail from './updateShip';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetLocation } from '../../store/actions/locationAction';
import { LocationList, BussinessList } from '../manageInfo/infoList';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { toast } from 'react-toastify';
dayjs.extend(utc)
dayjs.extend(timezone)


const ShipDetail = (props) => {
    const [form] = Form.useForm()

    const [shipInfo, setShipInfo] = useState()
    const [shipId, setShipId] = useState()

    const [isLabelHidden, setLabelHidden] = useState(false)
    const [isInputHidden, setInputHidden] = useState(true)

    const [isUpdateDisabled, setUpdateDisabled] = useState(true)


    const [isConfirmLoading, setConfirmLoading] = useState(false)
    const [isConfirmDisabled, setConfirmDisabled] = useState(false);

    const styleLabel = {
        border: 'black',
        borderStyle: 'groove',
        borderWidth: 'thin',
        borderRadius: '5px',
        float: 'left',
        width: '100%',
    }
    let selectedLocation = LocationList.find(item => item.value === shipInfo?.location.code);
    let selectedBussiness = BussinessList.find(item => item.value === shipInfo?.ship.business.code);
    let selectedBussiness2 = BussinessList.find(item => item.value === shipInfo?.ship.business2.code);
    const dateFormat = 'DD/MM/YYYY';
    const defaultValues = {
        plate_number: shipInfo?.plate_number,
        location: selectedLocation?.value,
        // location: shipInfo?.location.code,
        owner: shipInfo?.owner.name,
        ownerPhone: shipInfo?.owner.phone,
        ownerAddress: shipInfo?.owner.address,

        captain: shipInfo?.ship.caption.name,
        captainIdentity: shipInfo?.ship.caption.identity,
        captainLicense: shipInfo?.ship.caption.license,
        captainPhone: shipInfo?.ship.caption.phone,
        captainYear: shipInfo?.ship.caption.year ? shipInfo?.ship.caption.year : 0,
        captainAddress: shipInfo?.ship.caption.address,


        maytruong: shipInfo?.ship.maytruong.name,
        maytruongIdentity: shipInfo?.ship.maytruong.identity,
        maytruongLicense: shipInfo?.ship.maytruong.license,
        maytruongPhone: shipInfo?.ship.maytruong.phone,
        maytruongYear: shipInfo?.ship.maytruong.year ? shipInfo?.ship.maytruong.year : 0,
        maytruongAddress: shipInfo?.ship.maytruong.address,

        license: shipInfo?.ship.license.number,
        licenseRegistered: dayjs.tz(shipInfo?.ship.license.registered, 'Asia/Ho_Chi_Minh').utc(true),
        licenseExpired: dayjs.tz(shipInfo?.ship.license.expired, 'Asia/Ho_Chi_Minh').utc(true),

        businesscode: selectedBussiness?.value,
        business2code: selectedBussiness2?.value,

        length: shipInfo?.ship.length,
        congsuat: shipInfo?.ship.congsuat,
    }


    useEffect(() => {
        fetchShipInfo(props.keyNumber)
    }, [])
    useEffect(() => {
        form.setFieldsValue(defaultValues)
    }, [form, defaultValues])

    //handle location

    const handleOk = async () => {
        setConfirmLoading(true)
        setConfirmDisabled(true)
        let auth = JSON.parse(localStorage.getItem('auth'));
        let stateShip = shipInfo.state
        if (stateShip == 1) {
            let response = await unverifyShip(auth.token, shipId)
            console.log('response unverify', response.data);
            props.fetchShips()

        } else {
            let response = await verifyShip(auth.token, shipId)
            console.log('response verify', response.data);
            props.fetchShips()
        }
        props.setIsModalOpen(false);
        setConfirmLoading(false)
        setConfirmDisabled(false)
        fetchShipInfo(props.keyNumber)
    };
    const handleCancel = () => {
        setLabelHidden(false)
        setInputHidden(true)
        props.setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    useEffect(() => {
        fetchShipInfo(props.keyNumber);
    }, [props.keyNumber])

    const fetchShipInfo = async (keyNumber) => {
        let token = localStorage.getItem('token');
        let response = await getShipInfo(token, keyNumber)
        if (response && response.data && response.status === 200) {
            setShipInfo(response.data.data);
            if (response.data.data) {
                setShipId(response.data.data.id)
            }
        }
    }
    const onShowUpdateShip = () => {
        setLabelHidden(isLabelHidden => !isLabelHidden)
        setInputHidden(isInputHidden => !isInputHidden)
        setConfirmDisabled(isConfirmDisabled => !isConfirmDisabled)
        setUpdateDisabled(isUpdateDisabled => !isUpdateDisabled)
    }
    const handleUpdateShip = async () => {
        let token = localStorage.getItem('token');
        let response = await updateShip(form, token)
        if (response) {
            if (response.status == 200) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } else if (response) {
            toast.success('Cập nhật thất bại')
        }
        onShowUpdateShip()
        fetchShipInfo(props.keyNumber)
    }
    //Thông tin đăng kí
    const itemsTTDK = [{
        key: '1',
        label: 'Thông tin đăng kí',
        children: <Col >
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Mã nghề 1 "
                hidden={isLabelHidden}
            // name="businesscode"
            >
                <label style={styleLabel}>{shipInfo?.ship.business.name ? shipInfo?.ship.business.name : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='businesscode'
                label="Mã nghề 1"
                hidden={isInputHidden}
            >
                <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={BussinessList}
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Mã nghề 2: "
                hidden={isLabelHidden}
            // name="business2code"
            >
                <label style={styleLabel}>{shipInfo?.ship?.business2?.name ? shipInfo?.ship?.business2?.name : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='business2code'
                label="Mã nghề 2"
                hidden={isInputHidden}
            >
                <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={BussinessList}
                />
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Mã nghề 3: "
                hidden={isLabelHidden}
            // name="business3code"
            >
                <label style={styleLabel}>{shipInfo?.business3code ? shipInfo?.business3code : 'Trống'}</label>

            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                name='business3code'
                label="Mã nghề 3"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.business3code ? shipInfo?.business3code : null}
                    type='text'
                />
            </Form.Item>


            <Form.Item
                style={{ height: '0.5rem' }}
                label="Mã nghề 4"
                hidden={isLabelHidden}
            // name="business4code"
            >
                <label style={styleLabel}>{shipInfo?.business4code ? shipInfo?.business4code : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='business4code'
                label="Mã nghề 4"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.business4code ? shipInfo?.business4code : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Hô hiệu"
                hidden={isLabelHidden}
            // name="HoHieu"
            >
                <label style={styleLabel}>{shipInfo?.HoHieu ? shipInfo?.HoHieu : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='HoHieu'
                label="Hô hiệu"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.HoHieu ? shipInfo?.HoHieu : null}
                    type='text'
                />
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Cờ hiệu"
                hidden={isLabelHidden}
            // name="CoHieu"
            >
                <label style={styleLabel}>{shipInfo?.CoHieu ? shipInfo?.CoHieu : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='CoHieu'
                label="Cờ hiệu"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.CoHieu ? shipInfo?.CoHieu : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="IMO"
                hidden={isLabelHidden}
            // name="IMO"
            >
                <label style={styleLabel}>{shipInfo?.IMO ? shipInfo?.IMO : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='IMO'
                label="IMO"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.IMO ? shipInfo?.IMO : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Cảng đăng kí"
                hidden={isLabelHidden}
            // name="CangCaDangKyCode"
            >
                <label style={styleLabel}>{shipInfo?.CangCaDangKyCode ? shipInfo?.CangCaDangKyCode : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='CangCaDangKyCode'
                label="Cảng đăng kí"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.CangCaDangKyCode ? shipInfo?.CangCaDangKyCode : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Cảng phụ"
                hidden={isLabelHidden}
            // name="CangCaPhuCode"
            >
                <label style={styleLabel}>{shipInfo?.CangCaPhuCode ? shipInfo?.CangCaPhuCode : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='CangCaPhuCode'
                label="Cảng phụ"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
        </Col>,
    },]
    //Thông tin thông số
    const itemsTTTS = [{
        key: '1',
        label: 'Thông tin thông số',
        children: <Col >
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Chiều dài"
                hidden={isLabelHidden}
            // name="length"
            >
                <label style={styleLabel}>{shipInfo?.length ? shipInfo?.length + ' m' : 'Trống'}</label>
                {/* <Input placeholder='Trống' disabled style={} suffix="m" value={shipInfo?.length} /> */}
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='length'
                label="Chiều dài"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.length ? shipInfo?.length : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Công suất"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.congsuat ? shipInfo?.congsuat + ' CV' : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='congsuat'
                label="Công suất"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.congsuat ? shipInfo?.congsuat : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Tổng tải trọng"
                hidden={isLabelHidden}
            // name="TongTaiTrong"
            >
                <label style={styleLabel}>{shipInfo?.TongTaiTrong ? shipInfo?.TongTaiTrong + ' tấn' : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='TongTaiTrong'
                label="Tổng tải trọng"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.TongTaiTrong ? shipInfo?.TongTaiTrong : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Chiều rộng max"
                hidden={isLabelHidden}
            // name="ChieuRongLonNhat"
            >
                <label style={styleLabel}>{shipInfo?.ChieuRongLonNhat ? shipInfo?.ChieuRongLonNhat : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='ChieuRongLonNhat'
                label="Chiều rộng max"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.ChieuRongLonNhat ? shipInfo?.ChieuRongLonNhat : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Mớn nước"
                hidden={isLabelHidden}
            // name="MonNuoc"
            >
                <label style={styleLabel}>{shipInfo?.MonNuoc ? shipInfo?.MonNuoc : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='MonNuoc'
                label="Mớn nước"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.MonNuoc ? shipInfo?.MonNuoc : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Dung tích hầm cá"
                hidden={isLabelHidden}
            // name="DungTichHamCa"
            >
                <label style={styleLabel}>{shipInfo?.DungTichHamCa ? shipInfo?.DungTichHamCa : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='DungTichHamCa'
                label="Dung tích hầm cá"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.DungTichHamCa ? shipInfo?.DungTichHamCa : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Số thuyền viên"
                hidden={isLabelHidden}
            // name="SoThuyenVien"
            >
                <label style={styleLabel}>{shipInfo?.SoThuyenVien ? shipInfo?.SoThuyenVien : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='SoThuyenVien'
                label="Số thuyền viên"
                hidden={isInputHidden}
            >
                <Input
                    defaultValue={shipInfo?.SoThuyenVien ? shipInfo?.SoThuyenVien : null}
                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Vận tốc đánh bắt"
                hidden={isLabelHidden}
            // name="VanTocDanhBat"
            >
                <label style={styleLabel}>{shipInfo?.VanTocDanhBat ? shipInfo?.VanTocDanhBat : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='VanTocDanhBat'
                label="Vận tốc đánh bắt"
                hidden={isInputHidden}
            >
                <Input

                    type='text'
                />
            </Form.Item>

            <Form.Item
                style={{ height: '0.5rem' }}
                label="Vận tốc hành trình"
                hidden={isLabelHidden}
            // name="VanTocHanhTrinh"
            >
                <label style={styleLabel}>{shipInfo?.VanTocHanhTrinh ? shipInfo?.VanTocHanhTrinh : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='VanTocHanhTrinh'
                label="Vận tốc hành trình"
                hidden={isInputHidden}
            >
                <Input

                    type='text'
                />
            </Form.Item>

        </Col>,
    }]
    //Thông tin chủ tàu
    const itemsTTCT = [{
        key: '1',
        label: 'Thông tin chủ tàu',
        children: <Col >
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Chủ tàu"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.owner.name}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='owner'
                label="Chủ tàu"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* SĐT chủ tàu */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="SĐT"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.owner.phone ? shipInfo?.owner.phone : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='ownerPhone'
                label="SĐT"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* địa chỉ */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Địa chỉ"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.owner.address}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='ownerAddress'
                label="Địa chỉ"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
        </Col>
    }]
    //Thông tin thuyền trưởng
    const itemsTTTT = [{
        key: '1',
        label: 'Thông tin thuyền trưởng',
        children: <Col>
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Thuyền trưởng"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.caption.name ? shipInfo?.ship.caption.name : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='captain'
                label="Thuyền trưởng"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* CCCD */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="CCCD/CMND"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.caption.identity ? shipInfo?.ship.caption.identity : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='captainIdentity'
                label="CCCD/CMND"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>

            {/* Chứng chỉ */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Chứng chỉ"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.caption.license ? shipInfo?.ship.caption.license : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='captainLicense'
                label="Chứng chỉ"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* SĐT */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="SĐT"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.caption.phone ? shipInfo?.ship.caption.phone : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='captainPhone'
                label="SĐT"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* Năm sinh */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Năm sinh"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.caption.year ? shipInfo?.ship.caption.year : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='captainYear'
                label="Năm sinh"
                hidden={isInputHidden}
            >
                <Input type='number' />
            </Form.Item>
            {/* Địa chỉ */}
            <Form.Item
                style={{ height: '0.5rem', paddingBottom: '1.5rem' }}
                label="Địa chỉ"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.caption.address ? shipInfo?.ship.caption.address : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='captainAddress'
                label="Địa chỉ"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>

        </Col>
    }]
    //Thông tin máy trưởng
    const itemsTTMT = [{
        key: '1',
        label: 'Thông tin máy trưởng',
        children: <Col>
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Máy trưởng"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.maytruong.name ? shipInfo?.ship.maytruong.name : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='maytruong'
                label="Máy trưởng"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* CCCD */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="CCCD/CMND"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.maytruong.identity ? shipInfo?.ship.maytruong.identity : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='maytruongIdentity'
                label="CCCD/CMND"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>


            {/* Chứng chỉ */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Chứng chỉ"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.maytruong.license ? shipInfo?.ship.maytruong.license : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='maytruongLicense'
                label="Chứng chỉ"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* SĐT */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="SĐT"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.maytruong.phone ? shipInfo?.ship.maytruong.phone : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='maytruongPhone'
                label="SĐT"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* Năm sinh */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Năm sinh"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.maytruong.year ? shipInfo?.ship.maytruong.year : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='maytruongYear'
                label="Năm sinh"
                hidden={isInputHidden}
            >
                <Input type='number' />
            </Form.Item>
            {/* Địa chỉ */}
            <Form.Item
                style={{ height: '0.5rem', paddingBottom: '1.5rem' }}
                label="Địa chỉ"
                hidden={isLabelHidden}
            >
                <label style={styleLabel}>{shipInfo?.ship.maytruong.address ? shipInfo?.ship.maytruong.address : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='maytruongAddress'
                label="Địa chỉ"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>

        </Col>
    }]
    //Thông tin GPKT
    const itemsGPKT = [{
        key: '1',
        label: 'Thông tin GPKT',
        children: <Col>
            <Form.Item
                style={{ height: '0.5rem' }}
                label="GPKT"
                hidden={isLabelHidden}
            // name="licenseid"
            >
                <label style={styleLabel}>{shipInfo?.ship.license.number ? shipInfo?.ship.license.number : 'Trống'}</label>

            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='license'
                label="GPKT"
                hidden={isInputHidden}
            >
                <Input type='text' />
            </Form.Item>
            {/* Ngày cấp */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Ngày đăng kí"
                hidden={isLabelHidden}
            // name="licenseid"
            >
                <label style={styleLabel}>{shipInfo?.ship.license.registered ? moment(shipInfo?.ship.license.registered).format('DD/MM/YYYY') : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='licenseRegistered'
                label="Ngày đăng kí"
                hidden={isInputHidden}
            >
                <DatePicker format={dateFormat} />
            </Form.Item>
            {/* Ngày hết hạn */}
            <Form.Item
                style={{ height: '0.5rem' }}
                label="Ngày hết hạn"
                hidden={isLabelHidden}
            // name="licenseid"
            >
                <label style={styleLabel}>{shipInfo?.ship.license.expired ? moment(shipInfo?.ship.license.expired).format('DD/MM/YYYY') : 'Trống'}</label>
            </Form.Item>
            <Form.Item
                style={{ height: '0.5rem' }}
                name='licenseExpired'
                label="Ngày hết hạn"
                hidden={isInputHidden}
            >
                <DatePicker format={dateFormat} />
            </Form.Item>
        </Col>
    }]



    return (
        <>
            <Modal
                title="Thông tin tàu"
                width={1000}
                open={props.isModalOpen}
                style={{ top: 10 }}
                bodyStyle={{ minHeight: '70vh' }}
                onCancel={handleCancel}
                footer={[
                    <Button key="1" danger onClick={handleCancel}>Đóng</Button>,
                    <Button key="2" onClick={onShowUpdateShip}>{isInputHidden == false ? 'Hủy cập nhật' : 'Cập nhật'}</Button>,
                    <Button key="3" type='primary' disabled={isUpdateDisabled} onClick={handleUpdateShip}>Xác nhận cập nhật</Button>,
                    <Button key="4" type="primary" onClick={handleOk} disabled={isConfirmDisabled} loading={isConfirmLoading}>
                        {shipInfo?.state == 1 ? 'Hủy xác thực' : 'Xác thực'}
                    </Button>
                ]}>
                <Card size="default" style={{ textAlign: 'center' }}
                >
                    <Form
                        form={form}
                        name="ship"
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 10,
                        }}
                        style={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row style={{ height: '2rem' }}>
                            {/* Mã tàu */}
                            <Col span={12} style={{ paddingRight: '5%' }}>
                                <Form.Item
                                    style={{ height: '0.5rem' }}
                                    name='plate_number'
                                    label="Mã tàu"
                                    hidden={isInputHidden}
                                >
                                    <Input
                                        type='text'
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ height: '0.5rem' }}
                                    label="Mã tàu"
                                    hidden={isLabelHidden}
                                >
                                    <label style={styleLabel}>{shipInfo?.plate_number}</label>
                                </Form.Item>
                            </Col>
                            {/* Khu vực */}
                            <Col span={12}>
                                <Form.Item
                                    style={{ height: '0.5rem' }}
                                    label="Khu vực: "
                                    hidden={isLabelHidden}
                                >
                                    <label style={styleLabel}>{shipInfo?.location.name ? shipInfo?.location.name : 'Trống'}</label>
                                </Form.Item>
                                <Form.Item
                                    style={{ height: '0.5rem' }}
                                    name='location'
                                    label="Khu vực"
                                    hidden={isInputHidden}
                                >
                                    <Select
                                        showSearch
                                        style={{
                                            width: 200,
                                        }}
                                        placeholder="Tìm kiếm"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={LocationList}
                                    />

                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12} >
                                <Collapse
                                    items={itemsTTCT}
                                    defaultActiveKey={['1']}>
                                </Collapse>
                            </Col>
                            <Col span={12} >
                                <Collapse
                                    items={itemsGPKT}
                                    defaultActiveKey={['1']}>
                                </Collapse>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} >
                                <Collapse
                                    items={itemsTTTT}
                                    defaultActiveKey={['1']}>
                                </Collapse>
                            </Col>
                            <Col span={12} >
                                <Collapse
                                    items={itemsTTMT}
                                    defaultActiveKey={['1']}>
                                </Collapse>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} >
                                <Collapse
                                    items={itemsTTDK}
                                    defaultActiveKey={['1']}>
                                </Collapse>
                            </Col>
                            <Col span={12} >
                                <Collapse
                                    items={itemsTTTS}
                                    defaultActiveKey={['1']}>
                                </Collapse>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col span={12} >
                                <Collapse
                                    items={itemsGear}>
                                </Collapse>
                            </Col>
                        </Row> */}

                    </Form>
                </Card >
            </Modal >

        </>
    );
}

export default ShipDetail