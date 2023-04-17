var Heap = require('heap');
class Restaurant {
    constructor(restaurantId, name, cuisine, costBracket, rating, isRecommended, onboardedTime) {
      this.restaurantId = restaurantId;
      this.name = name;
      this.cuisine = cuisine;
      this.costBracket = costBracket;
      this.rating = rating;
      this.isRecommended = isRecommended;
      this.onboardedTime = onboardedTime;
    }
}

let Restaurants = []

const getRestaurants = (req, res) => {
    res.send(JSON.stringify(Restaurants));
};

const postRestaurants =  (req, res) => {
    //console.log(req.body);
    //req.body.id = length(Restaurant)+1
    console.log(Date.now()) 
    const {name, cuisine, costBracket, rating, isRecommended, onboardedTime } =  req.body
    const restaurantId = Restaurants.length+1
    const serverTime = Math.floor(Date.now() / 1000)
    
    console.log(restaurantId, name, cuisine, costBracket, rating, isRecommended, onboardedTime, serverTime)

    newRestaurant = new Restaurant(restaurantId, name,  cuisine, costBracket, rating, isRecommended, onboardedTime ? onboardedTime:serverTime)
    Restaurants = [...Restaurants, newRestaurant]
    
    res.send( JSON.stringify(Restaurants))
};
/*
Featured restaurants of primary cuisine and primary cost bracket. 
If none, then all featured restaurants of primary cuisine, secondary 
cost and secondary cuisine, primary cost
*/

const FeaturedRestaurantsForCuisineAndBracket = (userCuisine, costBracket, selectedListId) => {
    console.log("FeaturedRestaurantsForCuisineAndBracket INPUT ", userCuisine, costBracket, selectedListId)
    list = []
    if(typeof userCuisine === "undefined" || typeof userCuisine.cuisine === "undefined") {
        return [list , selectedListId]
    }
    
    Restaurants.forEach(restaurant => {
        console.log(" restaurant ", restaurant, userCuisine.cuisine, costBracket.costBracket, restaurant.cuisine, restaurant.costBracket)  
        if(restaurant.isRecommended && restaurant.cuisine === userCuisine["primary"].cuisine 
            && parseInt(restaurant.costBracket) === parseInt(costBracket["primary"].costBracket)) {
            if(!selectedListId.includes( restaurant.restaurantId)) {
                list = [...list, restaurant]
                selectedListId = [...selectedListId, restaurant.restaurantId]
            } else {
                console.log("restaurant.restaurantId included in selectedListId ", selectedListId)
            }
       }
    });
    console.log("list ", list)
    if(list.length == 0) {
        Restaurants.forEach(restaurant => {
            console.log(" restaurant ", restaurant, userCuisine.cuisine, costBracket.costBracket, restaurant.cuisine, restaurant.costBracket)  
            if(restaurant.isRecommended 
                && (restaurant.cuisine === userCuisine["primary"].cuisine 
                && (parseInt(restaurant.costBracket) === parseInt(costBracket["secondary"][0]?.costBracket) 
                    ||  parseInt(restaurant.costBracket) === parseInt(costBracket["secondary"][1]?.costBracket) ))) {
                
                    if(!selectedListId.includes( restaurant.restaurantId)) {
                        list = [...list, restaurant]
                        selectedListId = [...selectedListId, restaurant.restaurantId]
                    } else {
                        console.log("restaurant.restaurantId included in selectedListId ", selectedListId)
                    }
           }
        });
    }
    console.log("FeaturedRestaurantsForCuisineAndBracket END ", [list, selectedListId])
    return [list , selectedListId]
}
/*
All restaurants of Primary cuisine, primary cost bracket with rating >= 4
All restaurants of Primary cuisine, secondary cost bracket with rating >= 4.5
All restaurants of secondary cuisine, primary cost bracket with rating >= 4.5

*/
const RestaurantsForCuisineAndBracketWithMinRating = (userCuisine, costBracket, minRating, selectedListId) => {
    
    console.log("RestaurantsForCuisineAndBracketWithMinRating INPUT ", userCuisine, costBracket, minRating, selectedListId)
    list = []
    if(typeof userCuisine === "undefined" || typeof userCuisine.cuisine === "undefined") {
        return [list , selectedListId]
    }
    Restaurants.forEach(restaurant => {
        console.log(" restaurant ", restaurant, userCuisine.cuisine, costBracket.costBracket, restaurant.cuisine, restaurant.costBracket)  
        if( restaurant.cuisine === userCuisine.cuisine 
            && parseInt(restaurant.costBracket) === parseInt(costBracket.costBracket)
            && restaurant.rating >= minRating) {
            if(!selectedListId.includes( restaurant.restaurantId)) {
                list = [...list, restaurant]
                selectedListId = [...selectedListId, restaurant.restaurantId]
            } else {
                console.log("restaurant.restaurantId included in selectedListId ", selectedListId)
            }
       }
    });
    console.log("RestaurantsForCuisineAndBracketWithMinRating END ", [list, selectedListId])
   
    return [list, selectedListId]
}

const RestaurantsForCuisineAndBracketWithMaxRating = (userCuisine, costBracket, maxRating, selectedListId) => {
    console.log("RestaurantsForCuisineAndBracketWithMaxRating INPUT ", userCuisine, costBracket, maxRating, selectedListId)
    list = []
    if(typeof userCuisine === "undefined" || typeof userCuisine.cuisine === "undefined") {
        console.log("RestaurantsForCuisineAndBracketWithMaxRating r1 ",[list , selectedListId] )
        return [list , selectedListId]
    }
    Restaurants.forEach(restaurant => {
        console.log(" restaurant ", restaurant, userCuisine.cuisine, costBracket.costBracket, restaurant.cuisine, restaurant.costBracket)  
        if( restaurant.cuisine === userCuisine.cuisine 
            && parseInt(restaurant.costBracket) === parseInt(costBracket.costBracket)
            && restaurant.rating < maxRating) {
            if(!selectedListId.includes( restaurant.restaurantId)) {
                list = [...list, restaurant]
                selectedListId = [...selectedListId, restaurant.restaurantId]
            } else {
                console.log("restaurant.restaurantId included in selectedListId ", selectedListId)
            }
       }
    });
    console.log("RestaurantsForCuisineAndBracketWithMinRating END ", [list,selectedListId])
   
    return [list, selectedListId]
}

const NewlyCreatedRestaurants = (maxTime, top, selectedListId) => {
    list = []
    Restaurantsheap = new Heap(function(a, b) {
        return b.rating - a.rating;
    })
    lengthHeap = 0
    Restaurants.forEach(restaurant => {
        console.log("NewlyCreatedRestaurants restaurant ", restaurant, selectedListId, restaurant.restaurantId )
        if(!selectedListId.includes( restaurant.restaurantId)) {
            diff =  Math.floor(Date.now() / 1000) - restaurant.onboardedTime
            console.log("diff ", diff, " maxTime ", maxTime)
            if(diff < maxTime) {
                Restaurantsheap.push({rating: restaurant.rating, restaurant: restaurant })
                lengthHeap++
            }
        }
    });
    let count = top 
    console.log("Restaurantsheap", Restaurantsheap, count, lengthHeap)
    while(count > 0 && lengthHeap > 0) {
        top = Restaurantsheap.pop()
        console.log("top ", top.restaurant.Restaurant, top.restaurant.restaurantId)
        list = [...list,top.restaurant.Restaurant ]
        selectedListId = [...selectedListId, top.restaurant.restaurantId]
        count--
        lengthHeap--
    }
    console.log("NewlyCreatedRestaurants END ", [ list, selectedListId])
   
    return [list, selectedListId]
}

const ALLRestaurants = ( selectedListId) => {
    console.log("ALLRestaurants Input ",  selectedListId)
    list = []
    Restaurants.forEach(restaurant => { 
        if(!selectedListId.includes(restaurant.restaurantId)) {
            list = [...list, restaurant]
            selectedListId = [...selectedListId, restaurant.restaurantId]
        } 
    });
    console.log("ALLRestaurants END ", [list, selectedListId])
   
    return [list,selectedListId]
}

const listOfRestaurants = () => {
    list = []
    Restaurants.forEach(element => {
        
    });
}
module.exports = { getRestaurants, postRestaurants, FeaturedRestaurantsForCuisineAndBracket, 
    RestaurantsForCuisineAndBracketWithMinRating, RestaurantsForCuisineAndBracketWithMaxRating, 
    ALLRestaurants, NewlyCreatedRestaurants};