import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import { AppProvider } from '../../../context';
import { UserProvider } from '../../../context/userProvider';

function MainLayout() {

    return (
        <>
            <AppProvider>
                <UserProvider>
                    <Header/>
                    <div className="l-content">
                        <Outlet />
                    </div>
                    <Footer />
                </UserProvider>
            </AppProvider>
        </>
    )
}

export default MainLayout