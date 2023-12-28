import { Card, Col, Row, Space } from "antd"

import BarChartRecharts from "./barchart"

import CardOverview from "./cards_overview";
import Map from "./map";
import CustomActiveShapePieChart from "./piechart";
import DonutPieChart from "./piechart";


const data = [
    { title: 'Tàu Cá', content1: '10.000', content2: '2022' },
    { title: 'Chuyến Biển', content1: '63.200', content2: '2022' },
    { title: 'Lao Động', content1: '1.320', content2: '2022' },
    { title: 'Sản Lượng', content1: '12.364', content2: '2022' },
];
const dataMap = [
    { name: 'Hanoi', coordinates: [21.0285, 105.8542], population: 8000000 },
    { name: 'Ho Chi Minh City', coordinates: [10.7769, 106.7009], population: 9000000 },
    // ... (các thông tin khác về tỉnh thành)
];

const styleRowCard = {
    marginBottom: '1rem'
}

const Dashboard = (props) => {

    return (
        <>
            <div style={{ backgroundColor: '#f5f5f5' }}>
                <Card title='Quản lý khai thác thủy sản' style={{ backgroundColor: '#f5f5f5' }}>
                    <Row gutter={[8, 8]} style={styleRowCard}>
                        <Col span={10} >
                            <CardOverview />
                        </Col>
                        <Col span={14}>
                            <Card size="small" style={{ height: 300, alignItems: 'center', justifyContent: 'center', }}>
                                <p style={{ fontWeight: 'bold' }}>Thống kê chuyến biển</p>
                                <BarChartRecharts />
                            </Card>
                        </Col>
                    </Row>
                    <Row style={styleRowCard} gutter={[8, 8]}>
                        <Col span={16} >
                            <Card style={{ width: '100%', height: 500, alignItems: 'center', justifyContent: 'center', }}>
                                <p style={{ fontWeight: 'bold' }}>Bản đồ khai thác</p>
                                <Map data={dataMap} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card style={{ height: 500 }}>
                                <p style={{ fontWeight: 'bold' }}>Nhóm khai thác</p>
                                <DonutPieChart />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={8}>
                            <Card style={{ height: 500 }} >
                                <p style={{ fontWeight: 'bold' }}>Cảng cá</p>

                            </Card>
                        </Col>
                        <Col span={16}>
                            <Card style={{ height: 500 }} >
                                <p style={{ fontWeight: 'bold' }}>Thủy Sản</p>
                            </Card>
                        </Col>
                    </Row>
                </Card>

            </div>




        </>
    )
}

export default Dashboard