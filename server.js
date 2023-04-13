
// server.js File
const express = require('express'); // Importing express module
const date = require('date-and-time')
const {getCuisines, postCuisines} = require("./cuisine");
const {postRestaurants, getRestaurants} = require("./restaurants")
const app = express(); // Creating an express object
app.use(express.json());
const port = 8100;  // Setting an port for this application
  
  
// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})

Orders = {}
Users = {}

// const CuisineTracking = {
//     cuisineType : "",
//     noOfOrders : 0
// }

// const CostTracking = {
// 	costBracket : 0,
// 	noOfOrders : 0
// }

const User = {
	cuisines : {},
	costBracket : {}
}


app.get("/cuisines/", getCuisines)
app.post("/cuisines/", postCuisines)

app.get("/restaurants/", getRestaurants)
app.post("/restaurants/", postRestaurants)

app.post("/orders/", function(req, res) {
    console.log(req.body);
    const {userId, cuisineType, costbracket} = req.body
    console.log(userId, cuisineType, costbracket)
    
    // if(!(userId in Orders)) {
    //     Orders[userId] = []
    // }
    // Orders[userId].push(req.body)

    if(!(userId in Users)) {
        Users[userId] = User
    }
    if(! (cuisineType in Users[userId].cuisines )) {
        Users[userId].cuisines[cuisineType] = 0
    }
    Users[userId].cuisines[cuisineType]++
    if(! (costbracket in Users[userId].costBracket )) {
        Users[userId].costBracket[costbracket] = 0
    }
    Users[userId].costBracket[costbracket]++
    
    res.send( JSON.stringify(Users))
})

app.get("/userOrder/", function(req, res) {
    const id = req.query.id
    console.log("userOrder ", id);
    if(id in Users) {
        res.send( JSON.stringify(Users[id]))
    } else {
        res.send( JSON.stringify({"data": "User not Found"}))
    }
})