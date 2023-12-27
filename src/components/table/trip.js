import { useEffect, useRef, useState } from "react";


import { SearchOutlined } from '@ant-design/icons'

import { Space, Table, Tag, Button, Input, Modal } from 'antd';


import Highlighter from "react-highlight-words";
import useWindowDimensions from "../windowSize/windowSize";
import { getAllTrip } from "../../services/tripService";
import TripDetail from "../modal/tripDetail";




const TripTable = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tripid, setTripid] = useState('');
    const searchInput = useRef(null);
    const [listTrips, setlistTrips] = useState([]);


    const optionStatus = [
        { value: '1', label: 'Chờ duyệt xuất' },
        { value: '2', label: 'Đã duyệt xuất' },
        { value: '3', label: 'Chờ duyệt nhập' },
        { value: '4', label: 'Đã duyệt nhập' },
        { value: '5', label: 'Đã hoàn thành' },
    ]

    //search filter
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Nhập thông tin tìm kiếm `}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Xóa
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => { if (record[dataIndex]) return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (text),
    });
    const columns = [
        {
            title: 'Stt',
            dataIndex: 'no',
            key: 'no',
            width: '5%',
            align: 'center',
        },
        {
            title: 'Mã tàu',
            dataIndex: 'ship',
            key: 'ship',

            align: 'center',
            ...getColumnSearchProps('ship'),
        },
        {
            title: 'Chủ tàu',
            dataIndex: 'owner',
            key: 'owner',

            align: 'center',
            ...getColumnSearchProps('ship'),
        },
        {
            title: 'Xuất cảng',
            dataIndex: 'portOut',
            key: 'portOut',

            align: 'center',
            ...getColumnSearchProps('portOut'),
        },
        {
            title: 'Nhập Cảng',
            key: 'portIn',
            dataIndex: 'portIn',

            align: 'center',
            ...getColumnSearchProps('portIn'),
        },
        {
            title: 'TT chuyến biển',
            align: 'center',

            ...getColumnSearchProps('status'),
            render: (item) => {
                if (item.status === 2 || item.status === 4 || item.status === 5) {
                    return (
                        <span style={{ color: 'green' }}>
                            {optionStatus[item.status - 1].label}
                        </span>
                    )
                }
                return (
                    <span style={{ color: 'red' }}>
                        {optionStatus[item.status - 1].label}
                    </span>
                )
            },
        },

        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (item, record) => (
                <>
                    <Space size="middle">
                        <a><Button type="primary" ghost onClick={() => onClickDetail(record.tripid)}>
                            Chi tiết
                        </Button></a>
                    </Space>
                </>
            ),

        },
        {
            title: 'id',
            key: 'tripid',
            dataIndex: 'tripid',
            align: 'center',
        },

    ]
        .filter(col => col.dataIndex !== 'tripid');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const onClickDetail = (tripid) => {
        setTripid(tripid)
        showModal()
    }

    useEffect(() => {
        fetchTrips();
    }, [])
    const fetchTrips = async () => {
        let token = localStorage.getItem('token');
        let response = await getAllTrip(token);
        console.log(response);
        if (response && response.data && response.status === 200) {
            setlistTrips(response.data.data);
        }
    }


    let data = listTrips.map((item, index) => {
        return ({
            key: index + 1,
            no: index + 1,
            ship: item.trip.plate_number,
            owner: item.trip.owner,
            portOut: item.trip.portOut.name,
            portIn: item.trip.portIn.name,
            status: item.trip.status,
            tripid: item.trip.tripid
        })
    })
    return (
        <>
            <Table style={{ textAlign: 'center', fontSize: '5px', margin: '0 10px' }} columns={columns} dataSource={data}
                sticky={{}}
                pagination={{
                    defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale: { items_per_page: ' chuyến/1 trang' }, showTotal: (total, range) => (
                        <span style={{}}>
                            Đang hiển thị {range[0]}-{range[1]} trong tổng {total}
                        </span>
                    ),
                }} />
            <TripDetail isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchTrips={fetchTrips}
                tripid={tripid}
                optionStatus={optionStatus} />
        </>
    )
}
export default TripTable;