import { Card, Col, Row } from "antd"
import logo from "../../images/logo.png"
const data = [
    { title: 'Tàu Cá', content1: '10.000', content2: '2022' },
    { title: 'Chuyến Biển', content1: '63.200', content2: '2022' },
    { title: 'Lao Động', content1: '1.320', content2: '2022' },
    { title: 'Sản Lượng', content1: '12.364', content2: '2022' },
];

const CardOverview = () => {
    return (
        <>
            <div style={{ height: 300, alignItems: 'center', display: 'flex', backgroundColor: '#f5f5f5', marginLeft: '-8px' }}>
                <Row align="middle">
                    {data.map((item, index) => (
                        <Col span={12} key={index}>
                            <Card bordered={false} style={{ maxHeight: '140px', width: '95%', margin: '0.5rem' }}>
                                <div style={{ display: 'flex', margin: 0 }}>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 'bold', marginTop: '-5px' }}>{item.title}</p>
                                        <p >{item.content1}</p>
                                        <p>{item.content2}</p>
                                    </div>
                                    <div>
                                        <img src={logo} alt="Small Image" style={{ width: '80px', height: 'auto' }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}
export default CardOverview