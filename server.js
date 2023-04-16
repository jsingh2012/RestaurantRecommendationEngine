
// server.js File
const express = require('express'); // Importing express module
const date = require('date-and-time')
const {getCuisines, postCuisines} = require("./dataModels/cuisine");
const {postRestaurants, getRestaurants, 
    FeaturedRestaurantsForCuisineAndBracket} = require("./dataModels/restaurants")
const {postUsersOrders, 
    getUsersOrders, 
    getPrimaryAndSecondaryCategoryForUser, 
    getPrimaryAndSecondaryCousineForUser} = require("./dataModels/userOrders")
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


app.get("/cuisines/", getCuisines)
app.post("/cuisines/", postCuisines)

app.get("/restaurants/", getRestaurants)
app.post("/restaurants/", postRestaurants)

app.post("/userOrder/", postUsersOrders)
app.get("/userOrder/", getUsersOrders)


//Restaurants == 0 Means all
app.get("/RestaurantRecommendations/", function(req, res) {
    console.log(req.query.userId, req.query.Restaurants);
    cost = getPrimaryAndSecondaryCategoryForUser(req.query.userId)
    cuisine = getPrimaryAndSecondaryCousineForUser(req.query.userId)
    list1 = FeaturedRestaurantsForCuisineAndBracket(cuisine["primary"], cost["primary"])
    res.send( JSON.stringify({"data": {Restaurants: list1, cost: cost, cuisine: cuisine }}))
} ) 