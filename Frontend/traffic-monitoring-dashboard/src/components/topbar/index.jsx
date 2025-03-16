import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './../../App.css';
export default function Topbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left", fontFamily:'BigShoulders-SemiBold' }}>
                        Traffic Monitor
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}