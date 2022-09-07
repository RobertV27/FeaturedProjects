import React, { useState, useEffect } from "react";
import Axios from 'axios';

function Community(props) {

  const [com, setCom] = useState("");
  const [comID, setComID] = useState("");
  const [comRID, setComRID] = useState("");
  const [comStat, setComStat] = useState("");

  const [mcs, setMcs] = useState("");
  const [mcc, setMcc] = useState("");
  const [mc, setMc] = useState("");

  useEffect(() => {
    Axios.post('http://localhost:3002/api/community', {
      name: props.user
    }).then((response) => {
      //response contains Community data
      setComRID(response.data[0].CommunityID)
      setMcc(response.data[0].MostCommonCongessman)
      setMc(response.data[0].MemberCount)
      setMcs(response.data[0].MostCommonStock)
    })
  }, [comID])
  // NEED TO QUERY Community details on mount

  const checkChangeID = () => {
    Axios.post('http://localhost:3002/api/checkCommunity', {
      cid: com
    }).then((response) => {
      // 0 means valid community, 1 means community does not exist
      console.log(response.data)
      if (response.data == "0") {
        console.log("VALID")
        Axios.post('http://localhost:3002/api/updateCommunity', {
          name: props.user,
          cid: com
        }).then((response) => {
          // updated
          setComID(com);
          setComStat("");
        })
      } else {
        console.log("INVALID")
        setComStat("1");
      }
    })
  };

  

  

  let error_msg = "";
  if (comStat == "1") {
    error_msg = "Invalid Community ID"
  }

  return (
    <div>
      <div className="StockHeader">
        <p className="StockHeaderText">Community: {comRID}</p>
        <button
          className="StockHeaderButton"
          name={"Home"}
          onClick={props.change_page}
        >
          Back
        </button>
      </div>
      <div>
        <p className="StockInfoText">Most Common Stock: {mcs}</p>
        <p className="StockInfoText">Most Commmon Congressman: {mcc}</p>
        <p className="StockInfoText"> Member Count: {mc}</p>
      </div>
      <input
        className="ComInput"
        type="text"
        placeholder="New Community ID"
        onChange={(e) => {
          setCom(e.target.value);
        }}
      ></input>
      <button
        className="ComInputButton"
        onClick={checkChangeID}
      >
        Change Community
      </button>
      <p className="ComErrorText">{error_msg}</p>
    </div>
  );
}

export default Community;
