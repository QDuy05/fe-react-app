import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from "../components/navigation/nav";
import { Layout, theme, Image, Affix } from "antd";

import { useSelector } from "react-redux";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import logoSDViCo from '../images/logo.png'

const PrivateRoutes = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const user = useSelector(state => state.user.auth)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        if (user && !user.auth) {
            navigate('/login');
        }
    }, []);
    return (
        <>
            <Layout style={{ display: 'flex', height: '100%' }} >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    style={{ position: 'fixed', height: '100vh' }}>
                    <div className="demo-logo-vertical" style={{ position: 'relative', display: 'flex' }}>
                        <Image src={logoSDViCo} style={{ transform: collapsed == false ? 'translateX(50%)' : '', height: collapsed == false ? '100px' : '80px' }} preview={false} />
                    </div>
                    <Nav collapsed={collapsed} />
                </Sider>
                <Layout style={{
                    marginLeft: collapsed == true ? '5rem' : '13rem'
                }}>
                    <Content style={{ overflow: 'auto' }}>
                        {children}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        SDViCo ©2023
                    </Footer>
                </Layout>
            </Layout>
        </>


    )
}

export default PrivateRoutes;