import React from "react";
import { Container, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const AppLayout = () => {
    return <div >
        <Container maxWidth="xl">
        <Toolbar disableGutters>
        <div style={{ padding: '0px 0px 0px 200px'}}>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Sidebar />
        <Outlet />
        </Box>
        </div>

        <div style={{ padding: '20px 0px 20px 0px'}}>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Sidebar />
        <Outlet />
        </Box>
        </div>
        </Toolbar>
        </Container>

        </div>
        
};

export default AppLayout;
