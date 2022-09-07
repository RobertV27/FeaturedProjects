import React from "react";

function UserNav(props) {
  let display = (
    <div className="UserNavBody">
      <button className="HomeButton" name={"Login"} onClick={props.change_page}>
        Login
      </button>
    </div>
  );
  if (props.user != "") {
    display = (
      <div className="UserNavBody">
        <p className="UserNavText">Current User: {props.user}</p>
        <button className="HomeButton" onClick={props.userLogout}>
          Logout
        </button>
        <button
          className="HomeButton"
          name={"Watchlist"}
          onClick={props.change_page}
        >
          My Watchlist
        </button>
        <button
          className="HomeButton"
          name={"Community"}
          onClick={props.change_page}
        >
          Community
        </button>
      </div>
    );
  }
  return display;
}

export default UserNav;
