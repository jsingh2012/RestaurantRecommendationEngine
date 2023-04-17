
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
    let recos = {}
    let [list1, selectedListId1] = FeaturedRestaurantsForCuisineAndBracket(cuisine, cost,selectedListId)
    console.log("FeaturedRestaurantsForCuisineAndBracket :", list1, selectedListId1)
    recos["FeaturedRestaurantsForCuisineAndBracket"] = list1
    selectedListId = [...selectedListId, ...selectedListId1]

    //MINRATING 
    
    let [list2, selectedListId2] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["primary"], cost["primary"], 4.0, selectedListId)
    console.log("RestaurantsForCuisineAndBracketWithMinRating :", list2, selectedListId2)
    recos["MINRatingPrimaryCuisinePrimaryCost"] = list2
    selectedListId = [...selectedListId, ...selectedListId2]
   

    //MINRATING 
    console.log("RestaurantsForCuisineAndBracketWithMinRating", cuisine, cost)  
    let [list3, selectedListId3] = [[], []]
    if(cost["secondary"] && cost["secondary"][0])  {
        [list3, selectedListId3] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["primary"], cost["secondary"][0], 4.5, selectedListId)
    }
    console.log(list3, selectedListId3)
    recos["MINRatingPrimaryCuisineSecondaryCost0"] = list3
    selectedListId = [...selectedListId, ...selectedListId3]
   

    //MINRATING 
    console.log("RestaurantsForCuisineAndBracketWithMinRating", cuisine, cost)  
    let [list4, selectedListId4] = [[], []]
    if(cost["secondary"] && cost["secondary"][1])  {
        [list4, selectedListId4] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["primary"], cost["secondary"][1], 4.5, selectedListId)
    }
    console.log(list4, selectedListId4)
    recos["MINRatingPrimaryCuisineSecondaryCost1"] = list4
    selectedListId = [...selectedListId, ...selectedListId4]
    
   
    //MINRATING 
    let [list5, selectedListId5] = [[], []]
    if(cuisine["secondary"] && cuisine["secondary"][0]) {
        [list5, selectedListId5] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["secondary"][0], cost["primary"], 4.5, selectedListId)
    }
    console.log(list5, selectedListId5)
    recos["MINRatingSecondaryCuisine0PrimaryCost"] = list5
    selectedListId = [...selectedListId, ...selectedListId5]

    //MINRATING 
    let [list6, selectedListId6] = [[], []]
    if(cuisine["secondary"] && cuisine["secondary"][1]) {     
        [list6, selectedListId6] = RestaurantsForCuisineAndBracketWithMinRating(cuisine["secondary"][1], cost["primary"], 4.5, selectedListId)
    }
    console.log(list6, selectedListId6)
    recos["MINRatingSecondaryCuisine1PrimaryCost"] = list6
    selectedListId = [...selectedListId, ...selectedListId6]

    //NEWLY CREATED 
    let [list7, selectedListId7] = NewlyCreatedRestaurants(48*3600, 4, selectedListId)
    console.log("NewlyCreatedRestaurants list7 ", list7)
    console.log("NewlyCreatedRestaurants selectedListId7 ", selectedListId7)
    // list = [...list, ...result1]
    recos["NewlyCreatedRestaurants"] = list7
    selectedListId = [...selectedListId, ...selectedListId7]
    console.log("NewlyCreatedRestaurants updated list ", list)
    console.log("NewlyCreatedRestaurants updated selectedListId ",  selectedListId)

    //MAX RATING
    let [list8, selectedListId8] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["primary"], cost["primary"], 4.0, selectedListId)
    console.log("RestaurantsForCuisineAndBracketWithMaxRating", list8, selectedListId8)
    recos["MAXRatingPrimaryCuisinePrimaryCost"] = list8
    selectedListId = [...selectedListId, ...selectedListId8]

    let [list9, selectedListId9] = [[], []]
    if(cost["secondary"] && cost["secondary"][0]) {
        [list9, selectedListId9] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["primary"], cost["secondary"][0], 4.5, selectedListId)
    }
    recos["MAXRatingPrimaryCuisineSecondaryCost0"] = list9
    selectedListId = [...selectedListId, ...selectedListId9]

    //MAX RATING
    let [list10, selectedListId10] = [[], []]
    if(cost["secondary"] && cost["secondary"][1])  {
        [list10, selectedListId10] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["primary"], cost["secondary"][1], 4.5, selectedListId)
    }
    recos["MAXRatingPrimaryCuisineSecondaryCost1"] = list10
    selectedListId = [...selectedListId, ...selectedListId10]

    //MAX RATING
    let [list11, selectedListId11] = [[], []]
    if(cuisine["secondary"] && cuisine["secondary"][0]) {
        [list11, selectedListId11] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["secondary"][0], cost["primary"], 4.5, selectedListId)
    }
    recos["MAXRatingSecondaryCuisine0PrimaryCost"] = list11
    selectedListId = [...selectedListId, ...selectedListId11]

    //MAX RATING
    let [list12, selectedListId12] = [[], []]
    if(cuisine["secondary"] && cuisine["secondary"][1]) {
        [list12, selectedListId12] = RestaurantsForCuisineAndBracketWithMaxRating(cuisine["secondary"][1], cost["primary"], 4.5, selectedListId)
    }
    recos["MAXRatingSecondaryCuisine1PrimaryCost"] = list11
    selectedListId = [...selectedListId, ...selectedListId12]

    let [list13, selectedListId13] = ALLRestaurants(selectedListId)
    recos["ALLRestaurants"] = list13
    selectedListId = [...selectedListId, ...selectedListId13]


    console.log("selectedListId ", selectedListId, "list ", list)
    
    res.send( JSON.stringify({"Restaurants": recos}))
} ) 