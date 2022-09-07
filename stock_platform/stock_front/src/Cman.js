import React, { useState, useEffect } from "react";
import Axios from 'axios';

function Cman(props) {
  // Cman data

  const [party, setParty] = useState("");
  const [state, setState] = useState("");
  const [mtrades, setMtrades] = useState("");
  const [recoms, setRecoms] = useState("");
  const [strong, setStrong] = useState("");

  useEffect(() => {
    Axios.post('http://localhost:3002/api/congressmenRecommendation', {
      cman: props.cman,
    }).then((response) => {
      console.log("pre");
      console.log(response.data)
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        console.log(response.data[i].Recommendation);
        setRecoms(oldA => [...oldA, response.data[i].StockID])
        setStrong(oldA => [...oldA, response.data[i].Strength])
      }
    })

    Axios.post('http://localhost:3002/api/sendKeywordCNAME', {
        keyword: props.cman,
    }).then((response) => {
        // response contains cman data
        setParty(response.data[0].Party);
        setState(response.data[0].State);
        setMtrades(response.data[0].MonthlyTrades);
    })

  }, [])
  
  let recs = [];
  let strengths = [];
  for (let i = 0; i < recoms.length; i++) {
    recs.push(recoms[i]);
    strengths.push(strong[i]);
  }

  return (
    <div>
      <div className="StockHeader">
        <p className="StockHeaderText">Congressman: {props.cman}</p>
        <button
          className="StockHeaderButton"
          name={"Home"}
          onClick={props.change_page}
        >
          Back
        </button>
      </div>
      <div>
        <p className="CmanText">Party: {party}</p>
        <p className="CmanText">State: {state}</p>
        <p className="CmanText">Monthly Trades: {mtrades}</p>
      </div>
      <p className="CmanHeader"> Recommendations</p>
      <hr></hr>
      {recs.map((entry, i) => {
        return (
          <div>
            <p
              name={entry}
              className="WatchlistText"
              onClick={props.stock_page}
            >
              {entry}
            </p>
            <p className="CmanStr">Strength: {strengths[i]}</p>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}

export default Cman;