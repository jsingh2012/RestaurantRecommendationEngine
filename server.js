
// server.js File
const express = require('express'); // Importing express module
const date = require('date-and-time')
const {getCuisines, postCuisines} = require("./dataModels/cuisine");
const {postRestaurants, getRestaurants, 
    FeaturedRestaurantsForCuisineAndBracket,
    RestaurantsForCuisineAndBracketWithMinRating,
    RestaurantsForCuisineAndBracketWithMaxRating,
    ALLRestaurants, NewlyCreatedRestaurants} = require("./dataModels/restaurants")
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
    let list =[]
    let selectedListId = []
    let [list2, selectedListId2] = FeaturedRestaurantsForCuisineAndBracket(cuisine, cost,selectedListId)
    console.log("FeaturedRestaurantsForCuisineAndBracket :", list2, selectedListId2)
    list = [...list, ...list2]
    selectedListId = [...selectedListId, ...selectedListId2]

    //MINRATING 
    if(typeof cuisine !== "undefined") {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["primary"], cost["primary"], 4.0, selectedListId)
        console.log("RestaurantsForCuisineAndBracketWithMinRating :", list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }

    //MINRATING 
    if(cost["secondary"] && cost["secondary"][0]) {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["primary"], cost["secondary"][0], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }

    //MINRATING 
    if(cost["secondary"] && cost["secondary"][1])  {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["primary"], cost["secondary"][1], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }
    //MINRATING 
    if(cuisine["secondary"] && cuisine["secondary"][0]) {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["secondary"][0], cost["primary"], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }
    //MINRATING 
    if(cuisine["secondary"] && cuisine["secondary"][1]) {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["secondary"][1], cost["primary"], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }

    //NEWLY CREATED 
    selectedListId2 = []
    list2 = []
    [list2, selectedListId2] = NewlyCreatedRestaurants(48*3600, 4, selectedListId)
    console.log("NewlyCreatedRestaurants return ", list2, selectedListId2)
    list = [...list, ...list2]
    selectedListId = [...selectedListId, ...selectedListId2]
    console.log("NewlyCreatedRestaurants updated ", list, selectedListId)


    //MAX RATING
    selectedListId2 = []
    list2 = []
    [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["primary"], cost["primary"], 4.0, selectedListId)
    console.log("RestaurantsForCuisineAndBracketWithMaxRating", list2, selectedListId2)
    list = [...list, ...list2]
    if(cost["secondary"] && cost["secondary"][0]) {
        list2, selectedListId2 = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["primary"], cost["secondary"][0], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }

    //MAX RATING
    if(cost["secondary"] && cost["secondary"][1])  {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["primary"], cost["secondary"][1], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }
    //MAX RATING
    if(cuisine["secondary"] && cuisine["secondary"][0]) {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["secondary"][0], cost["primary"], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }
    //MAX RATING
    if(cuisine["secondary"] && cuisine["secondary"][1]) {
        selectedListId2 = []
        list2 = []
        [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["secondary"][1], cost["primary"], 4.5, selectedListId)
        console.log(list2, selectedListId2)
        list = [...list, ...list2]
        selectedListId = [...selectedListId, ...selectedListId2]
    }
    [list2, selectedListId2] = ALLRestaurants(selectedListId)
    console.log("ALLRestaurants LISTS selectedListId2 ",selectedListId2, " list2 ", list2)
    list = [...list, ...list2]
    selectedListId = [...selectedListId, ...selectedListId2]


    console.log("selectedListId ", selectedListId, "list ", list)
    
    res.send( JSON.stringify({"Restaurants": list}))
} ) 