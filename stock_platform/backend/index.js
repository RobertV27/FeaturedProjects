const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require('fs')

function getNextUserID() {
    var content  = fs.readFileSync("data/nextFreeUser", "utf-8");
    console.log(content)
    i = parseInt(content) + 1
    fs.writeFileSync("data/nextFreeUser", i.toString())
    return "U" + content;
}

function getNextCongressmenID() {
    var content  = fs.readFileSync("data/nextFreeCong", "utf-8");
    console.log(content)
    i = parseInt(content) + 1
    fs.writeFileSync("data/nextFreeCong", i.toString())
    return "C" + content;
}

var db = mysql.createConnection({
    host:'34.134.22.38',
    user: 'root',
    password:'bob12',
    database:'data',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.get('/', (require, response) => {
// const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`,`movieReview`) VALUES ('testMovie', 'cool movie!');";
// db.query(sqlInsert, (err, result) => {
// response.send("Hello world??");
// })
// })

app.post("/api/checkUser", (require, response) => {
    console.log(response)
    const name = require.body.name;
    const email = require.body.email;
    const password = require.body.password;

    //check if username already taken
    const select = "SELECT * FROM User WHERE Name = ? LIMIT 1;";
    db.query(select, [name], (err, result) => {
        if (err) throw err; 
        console.log(result);

        if (Object.keys(result).length > 0) {
            response.send("1");
        } else {
            response.send("0")
        }
    }) 
}); 

app.post("/api/insertUser", (require, response) => {
    console.log(response)
    const name = require.body.name;
    const email = require.body.email;
    const password = require.body.password;

    const userID = getNextUserID();
    console.log('UserID: %s', userID);
    const sqlInsert = "INSERT INTO User (UserID, Name,Password,Email,NumberFollowing,CommunityID) VALUES (?,?,?,?,0,'Com1');";
    db.query(sqlInsert, [userID, name, password, email, ], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send("0")
    })

}); 

app.post("/api/advancedQuery_1", (require, response) =>{ 
    const sqlSelect = "SELECT stk.stockId, AVG(CurrentPrice) as avg_cp FROM Stock stk JOIN Sector sec ON stk.SectorId = sec.SectorId WHERE sec.MarketCap >= 30000000000  GROUP BY stk.stockId ORDER BY avg_cp DESC LIMIT 15;"
    db.query(sqlSelect, [], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
}); 

app.post("/api/advancedQuery_2", (require, response) =>{ 
    const sqlSelect = "SELECT sec.SectorId, COUNT(CommunityID) as CommunityCount FROM Stock stk JOIN Sector sec ON (stk.SectorId = sec.SectorId) JOIN Community  c ON (stk.StockId = c.MostCommonStock) GROUP BY sec.SectorID ORDER BY CommunityCount DESC LIMIT 15;"
    db.query(sqlSelect, [], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
});

app.post("/api/login", (require, response) =>{ 
    const username = require.body.username;
    const password = require.body.password;

    const select = "SELECT * FROM User WHERE Name = ? LIMIT 1;";
    db.query(select, [username], (err, result) => {
        if (err) throw err; 
        console.log(result);

        if (Object.keys(result).length == 0) {
            response.send("1");
            console.log("no username")
        } else if (result[0].Password != password) {
            response.send("2");
            console.log("wrong password")
        } else {
            response.send("0")
        }
    })
}); 

app.post("/api/watchlist", (require, response) =>{ 
    const name = require.body.name;
    // need current user id
    const select = "SELECT StockID FROM User NATURAL JOIN Watchlist WHERE Name = ? LIMIT 15;";
    db.query(select, [name], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
}); 

app.post("/api/watchlistDelete", (require, response) =>{ 
    const StockID = require.body.StockID;
    // need current user id
    const select = "DELETE FROM Watchlist Where StockID = ?";
    db.query(select, [StockID], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
}); 


app.post("/api/checkCommunity", (require, response) =>{ 
    const cid = require.body.cid;
    // need current user's community id
    const select = "SELECT * From Community where CommunityID = ?";
    db.query(select, [cid], (err, result) => {
        if (err) throw err; 
        console.log(result);
        if (Object.keys(result).length > 0) {
            response.send("0");
        } else {
            response.send("1")
        }
    })
});

app.post("/api/updateCommunity", (require, response) =>{ 
    const name = require.body.name;
    const cid = require.body.cid;
    // need current user's community id
    const select = "UPDATE User SET CommunityID = ? WHERE Name = ?;";
    db.query(select, [cid, name], (err, result) => {
        if (err) throw err; 
        response.send(result)
    })
});

app.post("/api/community", (require, response) =>{ 
    const name = require.body.name;
    // need current user's community id
    const select = "SELECT CommunityID, MostCommonStock, MostCommonCongessman, MemberCount FROM Community Natural Join User WHERE Name = ?;";
    db.query(select, [name], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
});

app.post("/api/stockWatch", (require, response) =>{ 
    const name = require.body.name;
    const StockID = require.body.StockID;
    // need current user's community id
    const select = "SELECT * FROM User Natural Join Watchlist WHERE Name = ? and StockID = ? LIMIT 1;";
    db.query(select, [name, StockID], (err, result) => {
        if (err) throw err; 
        console.log(result);

        if (Object.keys(result).length > 0) {
            response.send("1");
        } else {
            response.send("0")
        }
    }) 
}); 

app.post("/api/congressmenRecommendation", (require, response) =>{ 
    const cman = require.body.cman;
    console.log(cman)
    // need current user's community id
    const select = "SELECT * FROM Congressmen Join Recommendation on Congressmen.Name = Recommendation.CongressmenID WHERE Congressmen.Name = ?;";
    db.query(select, [cman], (err, result) => {
        if (err) throw err; 
        response.send(result)
    }) 
});

app.post("/api/stockInfo", (require, response) =>{ 
    const StockID = require.body.StockID;
    // need current user's community id
    const select = "SELECT * FROM Stock WHERE StockID = ?;";
    db.query(select, [StockID], (err, result) => {
        response.send(result)
    }) 
}); 

app.post("/api/insertWatchlist", (require, response) =>{ 
    const name = require.body.name
    const StockID = require.body.StockID;

    const select = "INSERT INTO Watchlist (StockID, UserID, StartDate, Favorite) VALUES (?, (Select UserID from User where Name = ?), '11/30/2021', 0);";
    db.query(select, [StockID, name], (err, result) => {
        response.send(result)
    })
}); 

app.post("/api/sendKeywordCID", (require, response) =>{ 
    const keyword = require.body.keyword;
    const select = "SELECT * FROM Congressmen WHERE CongressmenID = ? LIMIT 5;";
    db.query(select, [keyword], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
}); 

app.post("/api/sendKeywordCNAME", (require, response) =>{ 
    const keyword = require.body.keyword;
    const select = "SELECT * FROM Congressmen WHERE Name = ? LIMIT 5;";
    db.query(select, [keyword], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
});

app.post("/api/sendKeywordSTOCKID", (require, response) =>{ 
    const keyword = require.body.keyword;
    const select = "SELECT * FROM Stock WHERE StockID = ? LIMIT 5;";
    db.query(select, [keyword], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
}); 

app.post("/api/giveRecommendation", (require, response) =>{ 
    const name = require.body.name;
    const select = "CALL giveRecommendation(?);";
    db.query(select, [name], (err, result) => {
        if (err) throw err; 
        console.log(result);
        response.send(result)
    })
}); 


app.listen(3002, () => {
    console.log("running on port 3002");
})