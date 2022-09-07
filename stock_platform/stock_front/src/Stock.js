import React, { useState, useEffect } from "react";
import Axios from 'axios';

function Stock(props) {

  const [watching, setWatching] = useState("");
  const [curprie, setCurPrice] = useState("");
  const [industry, setIndustry] = useState("");
  const [sma, setSma] = useState("");
  const [ema, setEma] = useState("");
  const [rsi, setRsi] = useState("");
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const [dchange, setDchange] = useState("");
  const [drange, setDrange] = useState("");
  const [sectorID, setSectorID] = useState("");


  useEffect(() => {
    Axios.post('http://localhost:3002/api/stockWatch', {
      name: props.user,
      StockID: props.stock,
    }).then((response) => {   
      console.log(response.data)       
      if (response.data == "0") {
        // user is not watching
        setWatching("");
      } else {
        // user is watching
        setWatching("yes");
      }
  })

  // NEED QUERY FOR STOCK INFO
  Axios.post('http://localhost:3002/api/stockInfo', {
      StockID: props.stock,
  }).then((response) => {          
      //stock info
     // console.log(response.data)  
      setSectorID(response.data[0].StockID) 
      setCurPrice(response.data[0].CurrentPrice)
      setIndustry(response.data[0].Industry)
      setSma(response.data[0].SMA)
      setEma(response.data[0].EMA)
      setRsi(response.data[0].RSI)
      setLow(response.data[0].Low)
      setHigh(response.data[0].High)
      setDchange(response.data[0].DailyChange)
      setDrange(response.data[0].DailyRange)
      setSectorID(response.data[0].SectorID)
  })


  }, [])
  // NEED TO QUERY TO CHECK IF WATCHING

  const tryAddWatchlist = () => {
    if (watching == "") {
      // NEED QUERY ADD TO WATCHLIST
      console.log("adding")
      Axios.post('http://localhost:3002/api/insertWatchlist', {
        name: props.user,
        StockID: props.stock,
      }).then((response) => {          
        //HAS BEEN INSERTED INTO DATABASE
       // console.log(response.data)  
        setWatching("yes")
      })
    }
  };

  let follow_text = "Add to Watchlist +";
  if (watching == "yes") {
    follow_text = "Already Watching";
  }

  return (
    <div>
      <div className="StockHeader">
        <p className="StockHeaderText">Stock {props.stock}</p>
        <button
          className="StockHeaderButton"
          name={"Home"}
          onClick={props.change_page}
        >
          Home
        </button>
        <button
          className={
            props.user == ""? "StockHeaderButtonInv" : (watching == "" ? "StockHeaderButton" : "StockHeaderButtonNo")
          }
          onClick={tryAddWatchlist}
        >
          {follow_text}
        </button>
      </div>
      <p className="StockInfoText">Current Price: {curprie}</p>
      <p className="StockInfoText">Industry: {industry}</p>
      <p className="StockInfoText">SMA: {sma}</p>
      <p className="StockInfoText">EMA: {ema}</p>
      <p className="StockInfoText">RSI: {rsi}</p>
      <p className="StockInfoText">Low: {low}</p>
      <p className="StockInfoText">High: {high}</p>
      <p className="StockInfoText">Daily Change: {dchange}</p>
      <p className="StockInfoText">Daily Range: {drange}</p>
      <p className="StockInfoText">Sector ID: {sectorID}</p>
    </div>
  );
}

export default Stock;