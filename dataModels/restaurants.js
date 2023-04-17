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
    console.log("FeaturedRestaurantsForCuisineAndBracket ", userCuisine, costBracket, selectedListId)
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
    return [list , selectedListId]
}
/*
All restaurants of Primary cuisine, primary cost bracket with rating >= 4
All restaurants of Primary cuisine, secondary cost bracket with rating >= 4.5
All restaurants of secondary cuisine, primary cost bracket with rating >= 4.5

*/
const RestaurantsForCuisineAndBracketWithMinRating = (userCuisine, costBracket, minRating, selectedListId) => {
    
    console.log("RestaurantsForCuisineAndBracketWithMinRating ", userCuisine, costBracket, minRating, selectedListId)
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
    console.log("RestaurantsForCuisineAndBracketWithMinRating ", [list, selectedListId])
   
    return [list, selectedListId]
}

const RestaurantsForCuisineAndBracketWithMaxRating = (userCuisine, costBracket, maxRating, selectedListId) => {
    console.log("RestaurantsForCuisineAndBracketWithMaxRating ", userCuisine, costBracket, maxRating, selectedListId)
    list = []
    if(typeof userCuisine === "undefined" || typeof userCuisine.cuisine === "undefined") {
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
    console.log("RestaurantsForCuisineAndBracketWithMinRating ", [list,selectedListId])
   
    return [list, selectedListId]
}

const NewlyCreatedRestaurants = (maxTime, top, selectedListId) => {
    list = []
    Restaurantsheap = new Heap(function(a, b) {
        return b.rating - a.rating;
    })
    Restaurants.forEach(restaurant => {
        if(!selectedListId.includes( restaurant.restaurantId)) {
            if(Date.now() - restaurant.onboardedTime < maxTime) {
                console.log(Date.now() - restaurant.onboardedTime )
                cousineheap.push({rating: restaurant.rating, restaurant: restaurant })
            }
        }
    });
    let count = top 
    while(count && Restaurantsheap.length > 0) {
        top = cousineheap.pop()
        list == [...list,top.restaurant ]
        selectedListId = [...selectedListId, restaurant.restaurantId]
        count--
    }
    console.log("RestaurantsForCuisineAndBracketWithMinRating ", {list2 : list, selectedListId2:selectedListId})
   
    return [list, selectedListId]
}

const ALLRestaurants = ( selectedListId) => {
    console.log("ALLRestaurants Input ",  selectedListId)
    list = []
    Restaurants.forEach(restaurant => { 
        if(!selectedListId.includes( restaurant.restaurantId)) {
            list = [...list, restaurant]
            selectedListId = [...selectedListId, restaurant.restaurantId]
        } 
    });
    console.log("ALLRestaurants ", {list2 : list, selectedListId2:selectedListId})
   
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