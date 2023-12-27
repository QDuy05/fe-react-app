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
            <Card size="small" style={{ height: 300, alignItems: 'center', justifyContent: 'center', display: 'flex', backgroundColor: '#f5f5f5' }}>
                <Row align="middle">
                    {data.map((item, index) => (
                        <Col span={12} key={index}>
                            <Card style={{ maxHeight: '140px', width: '90%', margin: '0.5rem', }}>
                                <div style={{ display: 'flex' }}>
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
            </Card>
        </>
    )
}
export default CardOverview