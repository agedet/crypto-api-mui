import { LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../Util/config/api';
import { CryptoState } from '../Util/CryptoContext';

const useStyles = makeStyles ((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketdata: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",

    //  Make responsive
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

const CoinDetailsPage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();
  // const [loading, setLoading] = useState();

  const {currency, symbol} = CryptoState();

  // Fetch API
  const fetchSingleCoin = async() => {
    // setLoading(true);
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
    // setLoading(false);
  };

  // console.log(coin);

  useEffect(() => {
    fetchSingleCoin();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  
  const classes =  useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold"}} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
            <img 
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
              style={{ marginBottom: 20 }}
            />
            <Typography
              className={classes.heading}
              variant="h3"
            >
              {coin?.name}
            </Typography>

            <Typography variant='subtitle1' className={classes.description}>
              {coin?.description.en.split(". ")[0]}.
            </Typography>

            <div className={classes.marketdata}>
              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5" className={classes.heading}
                >
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: 'Montserrat',
                  }}
                >
                  {coin?.market_cap_rank}
                </Typography>
              </span>

              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5" className={classes.heading}
                >
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: 'Montserrat',
                  }}
                >
                  {symbol}{" "}
                  {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5" className={classes.heading}
                >
                  Market Cap:{" "}
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: 'Montserrat',
                  }}
                >
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                  )}
                  M
                </Typography>
              </span>
            </div>
          </div>
          
            {/* Chart */}
            <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinDetailsPage