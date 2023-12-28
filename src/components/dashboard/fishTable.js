import React from 'react';
import { Table } from 'antd';

const dataSource = [
    // Dữ liệu cũ
    {
        key: '1',
        loaiCa: 'Cá hồi',
        tongTau: 50,
        ngheChinh: 'Đánh bắt',
        tongLaoDong: 200,
        tongSanLuong: '5000 kg',
    },
    {
        key: '2',
        loaiCa: 'Cá ngừ',
        tongTau: 30,
        ngheChinh: 'Nuôi trồng',
        tongLaoDong: 150,
        tongSanLuong: '3000 kg',
    },
    {
        key: '3',
        loaiCa: 'Cá trích',
        tongTau: 20,
        ngheChinh: 'Đánh bắt',
        tongLaoDong: 100,
        tongSanLuong: '2000 kg',
    },
    {
        key: '4',
        loaiCa: 'Cá basa',
        tongTau: 40,
        ngheChinh: 'Nuôi trồng',
        tongLaoDong: 180,
        tongSanLuong: '4000 kg',
    },
    {
        key: '5',
        loaiCa: 'Cá mú',
        tongTau: 25,
        ngheChinh: 'Đánh bắt',
        tongLaoDong: 120,
        tongSanLuong: '2500 kg',
    },
    {
        key: '6',
        loaiCa: 'Cá dơi',
        tongTau: 15,
        ngheChinh: 'Đánh bắt',
        tongLaoDong: 80,
        tongSanLuong: '1500 kg',
    },
    {
        key: '7',
        loaiCa: 'Cá lóc',
        tongTau: 35,
        ngheChinh: 'Nuôi trồng',
        tongLaoDong: 160,
        tongSanLuong: '3500 kg',
    },
];


const columns = [
    {
        title: 'Loài Cá',
        dataIndex: 'loaiCa',
        key: 'loaiCa',
    },
    {
        title: 'Tổng tàu',
        dataIndex: 'tongTau',
        key: 'tongTau',
    },
    {
        title: 'Nghề chính',
        dataIndex: 'ngheChinh',
        key: 'ngheChinh',
    },
    {
        title: 'Tổng lao động',
        dataIndex: 'tongLaoDong',
        key: 'tongLaoDong',
    },
    {
        title: 'Tổng Sản lượng',
        dataIndex: 'tongSanLuong',
        key: 'tongSanLuong',
    },
];

const FishProduction = () => {
    return <Table dataSource={dataSource} columns={columns}
        pagination={{
            defaultPageSize: 5,
        }} />;
};

export default FishProduction;
