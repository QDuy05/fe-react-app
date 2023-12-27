import { Route, Routes, Switch } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Login from "../components/login/login";
import CreateUser from "../components/manageUser/createuser";
import User from "../components/manageUser/user";

import Ship from "../components/manageShip/ship";
import Trip from "../components/manageTrip/trip";


import _ from 'lodash';
import PrivateRoutes from "./PrivateRoute";
import UserInfo from "../components/manageUser/userInfo";
import UpdateShipDetail from "../components/modal/updateShip";
import Dashboard from "../components/dashboard/dashboard";



const AppRoutes = () => {
    const [account, setAccount] = useState({});

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);
    return (
        <>
            <Routes>
                <Route path="/" exact element={
                    <>
                        <PrivateRoutes>

                        </PrivateRoutes>
                    </>}></Route>
                <Route path="/home" exact element={
                    <>
                        <PrivateRoutes>

                            <Dashboard />
                        </PrivateRoutes>
                    </>
                }></Route>
                <Route path="/user" element={
                    <PrivateRoutes>
                        <User />
                    </PrivateRoutes>
                } />
                <Route path="/ship" element={
                    <>
                        <PrivateRoutes>
                            <Ship />
                        </PrivateRoutes>
                    </>
                }></Route>
                <Route path="/updateship" element={
                    <>
                        <PrivateRoutes>
                            <div>updating</div>
                        </PrivateRoutes>
                    </>
                }></Route>
                <Route path="/offshorerequest" element={
                    <>
                        <PrivateRoutes>
                            <Trip />
                        </PrivateRoutes>
                    </>
                }></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/newuser" element={
                    <PrivateRoutes>
                        <CreateUser />
                    </PrivateRoutes>

                }></Route>
                <Route path="/userInfo" element={
                    <PrivateRoutes>
                        <UserInfo />
                    </PrivateRoutes>

                }></Route>
                <Route path="/updateship" element={
                    <PrivateRoutes>
                        <UpdateShipDetail />
                    </PrivateRoutes>

                }></Route>
                <Route path="*" element={<div>404 not found</div>}></Route>
            </Routes >
        </>
    )
}
export default AppRoutes