import "./App.css";
import React from "react";
import Home from "./Home";
import Login from "./Login";
import Watchlist from "./Watchlist";
import CreateAccount from "./CreateAccount";
import Community from "./Community";
import Stock from "./Stock"
import Cman from "./Cman"
import Axios from 'axios';
import Reco from "./Reco"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      page: "Home",
      stock_page: "",
      cman_page: "",
      searchState: "",
    };
    this.change_page = this.change_page.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.stockPage = this.stockPage.bind(this);
    this.searchStockPage = this.searchStockPage.bind(this);
  }

  change_page(event) {
    let page_name = event.target.getAttribute("name");
    this.setState({
      page: page_name,
      searchState: ""
    });
  }

  userLogin(username) {
    this.setState({
      user: username,
      page: "Home",
      searchState: ""
    });
  }

  userLogout() {
    this.setState({
      user: "",
      page: "Home",
      searchState: ""
    });
  }

  stockPage(event) {
    console.log("change stock");
    let stock_name = event.target.getAttribute("name");
    this.setState({
      stock_page: stock_name,
      page: "Stock",
    });
  }

  searchStockPage(event) {
    console.log("searching");
    let keyword = "NO"
    if (event != "NO") {
      keyword = event.target.getAttribute("name");
    }
    Axios.post('http://localhost:3002/api/sendKeywordCID', {
        keyword: keyword,
    }).then((response) => {
        // Congressmen
        if (Object.keys(response.data).length !== 0) {
            //go to congressmen page
            this.setState({
              cman_page: response.data[0].Name,
              page: "Cman",
            }, () => {
              this.searchStockPage("NO");
          });
        }
    })

    Axios.post('http://localhost:3002/api/sendKeywordCNAME', {
        keyword: keyword,
    }).then((response) => {
        // Congressmen
        if (Object.keys(response.data).length !== 0) {
            // go to congressmen page
            this.setState({
              cman_page: keyword,
              page: "Cman",
            }, () => {
              this.searchStockPage("NO");});
        }
    })

    Axios.post('http://localhost:3002/api/sendKeywordSTOCKID', {
        keyword: keyword,
    }).then((response) => {
        // Stock
        if (Object.keys(response.data).length !== 0) {
            // go to stock page
            this.setState({
              stock_page: keyword,
              page: "Stock",
            }, () => {
              this.searchStockPage("NO");});
        }
    })
    if (keyword == "NO") {
      this.setState({
        searchState: "",
      });
    } else {
      setTimeout(function(){ 

        this.setState({
          searchState: "1",
        });
    }.bind(this), 200);  
      
    }
  }

  render() {
    let error_msg = ""
    //console.log("LOG")
    //console.log(this.state.searchStateFlag)
    //console.log(this.state.searchState)
    if (this.state.searchState == "1") {
      error_msg = "Invalid Stock or Congressman"
    }
    let display_page = (
      <Home
        user={this.state.user}
        userLogout={this.userLogout}
        change_page={this.change_page}
        search_stock_page={this.searchStockPage}
        emsg = {error_msg}
      />
    );
    if (this.state.page == "Login") {
      display_page = (
        <Login change_page={this.change_page} userLogin={this.userLogin} />
      );
    } else if (this.state.page == "Watchlist") {
      display_page = <Watchlist user={this.state.user} stock_page={this.stockPage} change_page={this.change_page} />
    } else if (this.state.page == "CreateAccount") {
      display_page = <CreateAccount change_page={this.change_page} userLogin={this.userLogin}/>;
    } else if (this.state.page == "Community") {
      display_page = <Community user={this.state.user} change_page={this.change_page} />;
    } else if (this.state.page == "Stock") {
      display_page = (
        <Stock user={this.state.user} stock={this.state.stock_page} change_page={this.change_page} />
      );
    } else if (this.state.page == "Cman") {
      display_page = (
        <Cman stock_page={this.stockPage} cman={this.state.cman_page} change_page={this.change_page} />
      );
    } else if (this.state.page == "Reco") {
      display_page = (<Reco user={this.state.user} stock_page={this.stockPage} change_page={this.change_page}/>);
    }
    return display_page;
  }
}

export default App;
