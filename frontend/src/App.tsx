import Login from './pages/Login';
import StyledPage from './pages/StyledPage';
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import Register from './pages/Register';
import View_month from './pages/View_month';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/view_month" element={<View_month />} />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
