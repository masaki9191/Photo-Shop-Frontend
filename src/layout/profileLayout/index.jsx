import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import { AppProvider } from '../../../context';
import { UserProvider } from '../../../context/userProvider';

function ProfileLayout() {
    return (
        <>
            <AppProvider>
                <UserProvider>
                    <Header />
                    <div className="l-content">
                    <Sidebar />
                    <Outlet />
                    </div>
                    <Footer />
                </UserProvider>
            </AppProvider>
        </>
    )
}

export default ProfileLayout