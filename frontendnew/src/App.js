import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinDetailsPage from './pages/CoinDetailsPage';
// import { createTheme } from '@mui/material';
import {makeStyles} from "@mui/styles";

  // const theme = createTheme();
  const useStyles = makeStyles((theme) => ({
    App: {
      backgroundColor: "#14161a",
      color: "#ccc",
      minHeight: "100vh",
    }
  }));

function App() {
  const classes = useStyles();

  return (
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
        
          <Routes>
            <Route path='/' element={<HomePage /> } exact />
            <Route path='/coins/:id' element={<CoinDetailsPage />} exact />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
