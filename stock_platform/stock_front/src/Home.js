import React from "react";
import UserNav from "./UserNav";
import Axios from 'axios';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      ret: "",
      dat: ""
    };
    this.updateSearchVal = this.updateSearchVal.bind(this);
    this.query1 = this.query1.bind(this);
    this.query2 = this.query2.bind(this);
  }

  query1() {
    console.log("q1");
    Axios.post('http://localhost:3002/api/advancedQuery_1', {
    }).then((response) => {
      this.setState({
        dat: response.data,
        ret: "q1"
      });
    })
  }

  query2() {
    console.log("q2");
    Axios.post('http://localhost:3002/api/advancedQuery_2', {
    }).then((response) => {
      this.setState({
        dat: response.data,
        ret: "q2"
      });
    })
  }

  updateSearchVal(e) {
    this.setState({
      search: e.target.value,
    });
  }

  render() {

    let atr = ""
    let desc = ""
    if (this.state.ret === "q1") {
        atr = "StockID | AverageCurrentPrice"
        desc = "This query returns the StockID and average price of the stocks which are in sectors that have a market cap over $30,000,000,000"
    } else if (this.state.ret === "q2") {
        atr = "SectorID | CommunityCount"
        desc = "For each sector, this query returns the number of communities whose most popular stock is in that sector"
    }

    let adat = []
    for (let i = 0; i < Object.keys(this.state.dat).length; i++) {
        adat.push(this.state.dat[i])
    }


    return (
      <div>
        <UserNav
          userLogout={this.props.userLogout}
          change_page={this.props.change_page}
          user={this.props.user}
        />
        <div className="HomeBody">
          <div>
            <input
              className="HomeInput"
              type="text"
              placeholder="Stock or Congressmen"
              onChange={this.updateSearchVal}
            ></input>
          </div>
          <div>
            <button name={this.state.search} className="HomeSearchButton" onClick={this.props.search_stock_page}>
              Search
            </button>
          </div>
          <p className="SearchErrorText">{this.props.emsg}</p>
          <div className= "queryEl2"> 
            <button name={this.state.search} className="HomeSearchButton2" onClick={this.query1}>
              Popular Stocks
            </button>
            <button name={this.state.search} className="HomeSearchButton2" onClick={this.query2}>
              Top Sectors
            </button>
          </div>
          <div className= "queryEl" style = {this.state.ret === "" ? {visibility: "hidden"} : {color: "#000000"}}>
            <p>{desc}</p>
            <p>{atr}</p>
            <hr style = {{borderColor: "#000000"}}></hr>
            {adat.map((entry, i) => { 
                let data = ""
                if (this.state.ret === "q1") {
                    data = entry.stockId + " | " + entry.avg_cp
                } else if (this.state.ret === "q2") {
                    data = entry.SectorId + " | " + entry.CommunityCount
                }
                return (<p key = {i}>{data}</p>)
            })}
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
