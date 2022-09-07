import React, { useState, useEffect } from "react";
import Axios from 'axios';

function Watchlist(props) {

  const [toDel, setToDel] = useState("");
  const [dat, setDat] = useState("");
  let stocks = [];

  const deleteFromWatchlist = (event) => {
    let name = event.target.getAttribute("name");
    console.log("Here");
    console.log(name)
    Axios.post('http://localhost:3002/api/watchlistDelete', {
      StockID: name,
    }).then((response) => {
      //console.log(response);
      // need to rerender
      console.log(dat);
      let temp = []
      for (let i = 0; i < dat.length; i++) {
        if (dat[i] != name) {
          temp.push(dat[i])
        } else {
          console.log("deleting this")
        }
      }
      setDat("");
      for (let i = 0; i < temp.length; i++) {
        setDat(oldA => [...oldA, temp[i]])
      }
      console.log(dat);
    })
  };

  useEffect(() => {
    Axios.post('http://localhost:3002/api/watchlist', {
      name: props.user,
    }).then((response) => {
      console.log("gen data")
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        setDat(oldA => [...oldA, response.data[i].StockID])
      }
      console.log(dat)
    })
  }, [])

  for (let i = 0; i < dat.length; i++) {
    stocks.push(dat[i])
  }
  console.log("LOADING")

  // NEED TO QUERY WATCHLIST STOCKS on mount
  return (
    <div>
      <div className="WatchlistHeader">
        <p className="WatchlistHeaderText">Watchlist</p>
        <button
          className="WatchlistHeaderButton"
          name={"Home"}
          onClick={props.change_page}
        >
          Back
        </button>
        <button
          className="WatchlistHeaderButton"
          name={"Reco"}
          onClick={props.change_page}
        >
          Get Recommendations
        </button>
      </div>
      {stocks.map((entry, i) => {
        return (
          <div>
            <p
              name={entry}
              className="WatchlistText"
              onClick={props.stock_page}
            >
              {entry}
            </p>
            <button
              name={entry}
              onClick={deleteFromWatchlist}
              className="WatchlistDeleteButton"
            >
              Remove
            </button>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}

export default Watchlist;

