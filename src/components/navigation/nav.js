import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useWindowDimensions from '../windowSize/windowSize';

import { useSelector, useDispatch } from 'react-redux';
import { handleLogoutRedux } from '../../store/actions/userAction';
import { toast } from 'react-toastify';



let getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [

    getItem('Trang chủ',
        '/home', <HomeOutlined />),
    getItem('Thông tin',
        'sub1',
        <UserOutlined />,
        [
            getItem('Tàu cá', '/ship'),
        ]),
    {
        type: 'divider',
    },
    getItem('Duyệt yêu cầu', 'sub2', <AppstoreOutlined />, [
        getItem('Chuyến biển', '/offshorerequest'),
    ]),
    getItem('Tài khoản', 'sub4', <SettingOutlined />, [
        getItem('Thông tin tài khoản', 'userInfo', <UserOutlined />),
        getItem('Đăng xuất', 'signout', <LogoutOutlined />),
    ]),

];

const styleImg = {
    display: 'block',
    marginLeft: '-0.5rem',
    width: '2rem'
}
const Nav = (props) => {
    const navigate = useNavigate();
    const size = useWindowDimensions();
    const [isShow, setIsShow] = useState(false)
    const user = useSelector(state => state.user.auth)
    const dispatch = useDispatch()


    const onClick = ({ key }) => {
        if (key === 'signout') {
            dispatch(handleLogoutRedux())
        }
        else {
            navigate(key);
        }
    };


    let location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/login') {
            setIsShow(true)
        }
    }, [])
    useEffect(() => {
        if (user && user.auth === false) {
            navigate('/login')
            toast.success('Đăng xuất thành công')
        }
    }, [user])
    return (
        <>
            {isShow === true &&
                <div style={{ display: 'inline' }}>
                    <Menu
                        theme='dark'
                        onClick={onClick}
                        style={{
                            float: '',
                            justifyContent: 'center',
                            paddingLeft: '0',
                        }}
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={[]}
                        mode={'inline'}
                        items={items}
                    />
                </div>
            }</>
    );
};
export default Nav;
