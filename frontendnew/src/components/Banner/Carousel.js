import React, { useEffect, useState } from 'react';
import { TrendingCoins } from '../../Util/config/api';
import axios from "axios";
import { CryptoState } from '../../Util/CryptoContext';
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const useStyles = makeStyles(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    carouselItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",  
        cursor: "pointer",
        color: "white",
        textTransform: "uppercase",
    },
}));

const Carousel = () => {

    const classes = useStyles();
    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState();
    
    // fetch coin items
    const fetchTrendingCoins = async() => {
        const {data} = await axios.get(TrendingCoins(currency, symbol));

        setTrending(data);
    };

    // console.log(trending);

    useEffect(() => {
      fetchTrendingCoins();
    }, [currency, symbol]);

    const items = trending.map((coin) => {
        
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
                className={classes.carouselItem}
                to={`/coins/${coin.id}`}
            >
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}    
                />
                <span>
                    {coin?.symbol} 
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" :  "red",
                            fontweight: 500,
                        }}
                    >
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span
                    style={{fontSize: 22, fontWeight: 500 }}    
                >
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };
    
  return (
    <div className={classes.carousel}>
        <AliceCarousel 
            mouseTracking
            inifinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}

        />
    </div>
  )
}

export default Carousel