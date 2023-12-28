import React from 'react';
import { Table, Progress } from 'antd';

const dataSource = [
    {
        key: '1',
        fishingPort: 'Cảng A',
        totalShips: 10,
        production: 80, // Giả sử giá trị sản lượng là 80%
    },
    {
        key: '2',
        fishingPort: 'Cảng B',
        totalShips: 15,
        production: 60, // Giả sử giá trị sản lượng là 60%
    },
    // Thêm dữ liệu cho các dòng khác nếu cần
];

// Tính tổng sản lượng
const totalProduction = dataSource.reduce((total, record) => total + record.production, 0);

const columns = [
    {
        title: 'Cảng Cá',
        dataIndex: 'fishingPort',
        key: 'fishingPort',
    },
    {
        title: 'Tổng Tàu',
        dataIndex: 'totalShips',
        key: 'totalShips',
    },
    {
        title: 'Sản Lượng',
        dataIndex: 'production',
        key: 'production',
        render: (production, record) => (
            <>
                <Progress percent={Math.round((production / totalProduction) * 100)} status="active" />
                <div>{production}</div>
            </>
        ),
    },
];

const FishingPortTable = () => {
    return (
        <>
            <p style={{ fontWeight: 'bold' }}>Tổng Sản Lượng: {totalProduction}</p>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </>
    );
};

export default FishingPortTable;
