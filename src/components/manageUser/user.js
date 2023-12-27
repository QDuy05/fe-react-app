import { useEffect, useRef, useState } from "react";

import { useNavigate } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons'

import { Space, Table, Tag, Button, Input, Modal } from 'antd';
import { fetchAllUsers, getUserById } from "../../services/userService";
import Highlighter from "react-highlight-words";
import UpdateUser from "./updateuser";



const User = (props) => {
    const [listUser, setListUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [userData, setUserData] = useState({})
    const searchInput = useRef(null);

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
                    {/* <Button
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
                    </Button> */}
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
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
            ) : (
                text
            ),
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
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            align: 'center',
        },

        {
            title: 'Họ',
            dataIndex: 'lastName',
            key: 'lastName',
            width: '15%',
            align: 'center',
            ...getColumnSearchProps('lastName'),
        },
        {
            title: 'Tên',
            dataIndex: 'firstName',
            key: 'firstName',
            width: '25%',
            align: 'center',
            ...getColumnSearchProps('firstName'),
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
            title: 'Vai trò',
            key: 'role',
            dataIndex: 'role',
            align: 'center',
            filters: [
                {
                    text: 'Quản trị viên',
                    value: 'Quản trị viên',
                },
                {
                    text: 'Người dân',
                    value: 'Người dân',
                },
                {
                    text: 'Biên Phòng',
                    value: 'Biên Phòng',
                },
            ],
            onFilter: (value, record) => record.role.indexOf(value) === 0,
            render: (role) => {
                let color = role === 'Quản trị viên' ? 'geekblue' : role === 'Người dân' ? 'green' : 'yellow';
                return (
                    <Tag color={color} key={role}>
                        {role}
                    </Tag>
                );
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <>
                    <Space size="middle">
                        <a><Button type="primary" ghost onClick={() => handleEditUser(record.id)}>
                            Cập nhật
                        </Button></a>
                        <a><Button type="primary" danger ghost onClick={() => { }}>
                            Xóa
                        </Button></a>
                    </Space>
                </>
            ),
            width: '10%'
        },
    ].filter(col => col.dataIndex !== 'id');

    let handleEditUser = async (id) => {
        let user = await getUserById(id);
        console.log('user: ', user.data.DT);
        setUserData(user.data.DT);
        showModal();
    }
    useEffect(() => {
        fetchUsers();
    }, [])
    // get all users
    const fetchUsers = async () => {
        let respone = await fetchAllUsers();
        if (respone && respone.data && respone.data.EC == 0) {
            setListUsers(respone.data.DT);
        }
    }
    let data = listUser.map((item, index) => {
        return ({
            key: index + 1,
            no: index + 1,
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            phone: item.phone,
            role: item.Role ? item.Role.description : ''
        })
    })
    //Model 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);

    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Table style={{ width: '100%', textAlign: 'center' }} columns={columns} dataSource={data}
                pagination={{
                    defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale: { items_per_page: '/trang' }, showTotal: (total, range) => (
                        <span style={{}}>
                            Đang hiển thị {range[0]}-{range[1]} trong tổng {total}
                        </span>
                    ),
                }} />

        </>
    )
}

export default User;