import { Breadcrumb } from 'antd';
import ShipTable from "../table/ship";


const Ship = (props) => {

    let items = [
        {
            title: <a href="/home">Trang chủ</a>,
        },
        {
            title: 'Thông tin',
        },
        {
            title: 'Danh sách tàu',
        },
    ]
    //Model 
    return (
        <>
            <div style={{ display: 'inline' }}>
                <Breadcrumb style={{ margin: '16px 16px' }} items={items} />
                <ShipTable />
            </div>

        </>
    )
}

export default Ship;