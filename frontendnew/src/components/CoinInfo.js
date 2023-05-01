import { 
  createTheme, 
  LinearProgress, 
  ThemeProvider 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../Util/config/api';
import { CryptoState } from '../Util/CryptoContext';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }
}));

const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  //  Fetch data
  const fetchHistoricData = async() => {

    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  console.log("data", historicData);
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* Cahrt */}
        {
          !historicData ? (
            <LinearProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}              
            />
          ) : 
          (
            <Line 
              data= {{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                }),
              }}
              
            />
          )
        }

        {/* buttons */}
        buttons
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo;