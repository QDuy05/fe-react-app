import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons'
import { Space, Table, Button, Input } from 'antd';
import Highlighter from "react-highlight-words";
import ShipDetail from "../modal/shipDetail";
import { getAllShip } from "../../services/shipService";
import { logDOM } from "@testing-library/react";



const ShipTable = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keyNumber, setKeyNumber] = useState('');
    const [listShips, setlistShips] = useState([]);
    const [stateShip, setstateShip] = useState()
    const searchInput = useRef(null);




    const optionState = [
        { value: '1', label: 'Đã xác thực' },
        { value: '0', label: 'Chưa xác thực' }
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
            width: '20%',
            align: 'center',
            ...getColumnSearchProps('plate_number'),
            render: (item) => {
                if (item.state === 1) {
                    return (
                        <span style={{ color: 'green' }}>
                            {item.plate_number}
                        </span>
                    )
                }
                return (
                    <span style={{ color: 'red' }}>
                        {item.plate_number}
                    </span>
                )

            }
        },

        {
            title: 'Chủ tàu',
            dataIndex: 'owner',
            key: 'owner',
            width: '20%',
            align: 'center',
            ...getColumnSearchProps('owner'),
        },
        {
            title: 'Khu vực',
            dataIndex: 'location',
            key: 'location',
            width: '10%',
            align: 'center',
            ...getColumnSearchProps('location'),
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            align: 'center',
            ...getColumnSearchProps('phone'),
        },
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        //     key: 'name',
        //     // render: (text) => <a>{text}</a>,
        // },

        {
            title: 'Trạng thái',

            align: 'center',
            width: '15%',
            render: (item) => {
                if (item.state === 1) {
                    return (
                        <span style={{ color: 'green' }}>
                            {optionState[0].label}
                        </span>
                    )
                }
                return (
                    <span style={{ color: 'red' }}>
                        {optionState[1].label}
                    </span>
                )
            },
            filters: [
                {
                    text: 'Đã xác thực',
                    value: 1,
                },
                {
                    text: 'Chưa xác thực',
                    value: 0,
                },
            ],
            onFilter: (value, record) => record.state === value,
            open: {
                text: 'Lọc'
            }

        },
        {
            title: 'Hành động',
            key: 'action',
            render: (item, record) => (
                <>
                    <Space size="middle">
                        <Button type="primary" ghost onClick={() => {
                            oncl(item.plate_number)
                            console.log(item.plate_number);
                            setstateShip(record.state)
                        }}>
                            Chi tiết
                        </Button>
                    </Space>
                </>
            ),
            width: '10%'
        },
    ]
    const showModal = () => {
        setIsModalOpen(true);
    };
    const oncl = (item) => {
        setKeyNumber(item)
        showModal()
    }

    useEffect(() => {
        fetchShips();
    }, [])
    // get all users
    const fetchShips = async () => {
        let auth = JSON.parse(localStorage.getItem('auth'));
        let response = await getAllShip(auth.token);
        if (response && response.data && response.status === 200) {
            setlistShips(response.data.data);
        }
    }
    let data = listShips.map((item, index) => {
        return ({
            key: index + 1,
            no: index + 1,
            plate_number: item.plate_number,
            owner: item.owner.name,
            location: item.location.name,
            phone: item.owner.phone,
            state: item.state
        })
    })
    return (
        <>
            <Table
                style={{ textAlign: 'center', margin: '0 10px' }}
                columns={columns}
                dataSource={data}
                sticky={{}}
                pagination={{
                    defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale: { items_per_page: '/trang' }, showTotal: (total, range) => (
                        <span style={{}}>
                            Đang hiển thị {range[0]}-{range[1]} trong tổng {total}
                        </span>
                    ),
                }} />
            <ShipDetail isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                keyNumber={keyNumber}
                fetchShips={fetchShips}
                stateShip={stateShip} />
        </>
    )
}

export default ShipTable;