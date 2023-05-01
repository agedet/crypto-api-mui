import React from 'react';
import { 
    AppBar, 
    Container, 
    createTheme, 
    MenuItem, 
    Select, 
    ThemeProvider, 
    Toolbar, 
    Typography 
} from '@mui/material';

import { CryptoState } from '../Util/CryptoContext';
import { makeStyles } from '@mui/styles';
import {useNavigate} from "react-router-dom";

//  const theme = createTheme();
 const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontweight: "bold",
      cursor: "pointer",
    }
  }));

const Header = () => {

    const navigate = useNavigate();

    const classes = useStyles();

    const {currency, setCurrency} = CryptoState();

    // console.log(currency);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        }
    })

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container className={classes.Container}>
                <Toolbar>
                    <Typography 
                        className={classes.title}
                        onClick={() => navigate("/")}
                        variant='h6'
                    >
                        Crypto Hunter
                    </Typography>

                    <Select 
                        variant='outlined' 
                        style={{width:100, height:40, marginRight: 15}}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"NGN"}>NGN</MenuItem>
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header