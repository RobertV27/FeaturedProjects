import React, { useState, useEffect} from "react";
import Axios from 'axios';


function Reco(props) {
    const [dat, setDat] = useState("");
    // const [dat1, setDat1] = useState("");

    // let x = []
    // useEffect(() => {
    //     Axios.post('http://localhost:3002/api/watchlist', {
    //       name: props.user,
    //     }).then((response) => {
    //       for (let i = 0; i < Object.keys(response.data).length; i++) {
    //         setDat1(oldA => [...oldA, response.data[i].StockID])
    //       }
    //       console.log(dat1)
    //     })
    // }, [])

    // for (let i = 0; i < dat1.length; i++) {
    //     x.push(dat1[i])
    // }

    let stocks = [];
    useEffect(() => {
        Axios.post('http://localhost:3002/api/giveRecommendation', {
            name: props.user,
        }).then((response) => {
            let s = []
            s.push("")
            for (let i = 0; i < Object.keys(response.data[0]).length; i++) {
                let r1 = response.data[0][i].RecommendationOne
                let r2 = response.data[0][i].RecommendationTwo
                let r3 = response.data[0][i].RecommendationThree

                
                if (!s.includes(r1)) {
                    setDat(oldA => [...oldA, r1])
                    s.push(r1)
                }

                if (!s.includes(r2)) {
                    setDat(oldA => [...oldA, r2])
                    s.push(r2)
                }

                if (!s.includes(r3)) {
                    setDat(oldA => [...oldA, r3])
                    s.push(r3)
                }
                
            }
            console.log(dat)
        })
    }, [])
    
    for (let i = 0; i < dat.length; i++) {
        stocks.push(dat[i])
    }

    return (
        <div>
          <div className="WatchlistHeader">
            <p className="WatchlistHeaderText">Recommendations</p>
            <button
              className="WatchlistHeaderButton"
              name={"Home"}
              onClick={props.change_page}
            >
              Home
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
                <hr></hr>
              </div>
            );
          })}
        </div>
      );
}

export default Reco;