import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import DynamicTitle from '../components/DynamicTitle';

const MainLayout = () => {
    console.log(" MainLayout is rendering");

    return (
        <div>
            <DynamicTitle></DynamicTitle>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;