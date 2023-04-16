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
    const {name, cuisine, costBracket, rating, isRecommended, onboardedTime } =  req.body
    const restaurantId = Restaurants.length+1
    console.log(restaurantId, name, cuisine, costBracket, rating, isRecommended, onboardedTime)

    newRestaurant = new Restaurant(restaurantId, name,  cuisine, costBracket, rating, isRecommended, onboardedTime)
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
    return {list : list, selectedListId:selectedListId}
}
/*
All restaurants of Primary cuisine, primary cost bracket with rating >= 4
All restaurants of Primary cuisine, secondary cost bracket with rating >= 4.5
All restaurants of secondary cuisine, primary cost bracket with rating >= 4.5

*/
const RestaurantsForCuisineAndBracketWithMinRating = (userCuisine, costBracket, minRating, selectedListId) => {
    console.log("RestaurantsForCuisineAndBracketWithMinRating ", userCuisine, costBracket, minRating, selectedListId)
    list = []
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
    console.log("RestaurantsForCuisineAndBracketWithMinRating ", {list2 : list, selectedListId2:selectedListId})
   
    return {list2 : list, selectedListId2:selectedListId}
}

const listOfRestaurants = () => {
    list = []
    Restaurants.forEach(element => {
        
    });
}
module.exports = { getRestaurants, postRestaurants, FeaturedRestaurantsForCuisineAndBracket, RestaurantsForCuisineAndBracketWithMinRating};