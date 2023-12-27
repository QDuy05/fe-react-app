import { Card, Col, Row, Space } from "antd"

import BarChartRecharts from "./barchart"

import CardOverview from "./cards_overview";
import Map from "./map";


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

const Dashboard = (props) => {

    return (
        <>
            <div style={{ backgroundColor: '#f5f5f5' }}>
                <Card title='Quản lý khai thác thủy sản' style={{ backgroundColor: '#f5f5f5' }}>
                    <Row >
                        <Col span={10} >
                            <CardOverview />
                        </Col>
                        <Col span={14}>
                            <Card size="small" style={{ height: 300, alignItems: 'center', justifyContent: 'center', }}>
                                <h3>Thống kê chuyến biển</h3>
                                <BarChartRecharts />
                            </Card>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24} >
                            <Card style={{ width: '100%', maxHeight: '400px' }}>
                                <Map data={dataMap} />
                            </Card>
                        </Col>

                    </Row>
                </Card>

            </div>




        </>
    )
}

export default Dashboard