import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { makeStyles } from '@mui/styles';
import CryptoContext from './Util/CryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme(({
    spacing: 10,
    palette: {
        primary: {
            main: "#f2f2f2"
        }
    },
    typography: {
        myVariant: {
            fontSize: "2rem"
        }
    }
}));

root.render(
    <CryptoContext>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </CryptoContext>
    
);
