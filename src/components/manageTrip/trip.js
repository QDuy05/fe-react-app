import { useEffect, useRef, useState } from "react";
import { Breadcrumb } from 'antd';
import { getAllTrip } from "../../services/tripService";
import TripTable from "../table/trip";



const Trip = (props) => {



    let items = [
        {
            title: <a href="/home">Trang chủ</a>,
        },
        {
            title: 'Duyệt yêu cầu',
        },
        {
            title: 'Chuyến biển',
        },
    ]
    //Model 
    return (
        <>
            <div style={{ display: 'inline' }}>
                <Breadcrumb style={{ margin: '16px 16px' }} items={items} />
                <TripTable />
            </div>

        </>
    )
}

export default Trip;