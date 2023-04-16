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

const FeaturedRestaurantsForCuisineAndBracket = (userCuisine, costBracket ) => {
    console.log("FeaturedRestaurantsForCuisineAndBracket ", userCuisine, costBracket)
    list = []
    Restaurants.forEach(restaurant => {
        console.log(" restaurant ", restaurant, userCuisine.cuisine, costBracket.costBracket, restaurant.cuisine, restaurant.costBracket)
       if(restaurant.cuisine === userCuisine.cuisine && parseInt(restaurant.costBracket) === parseInt(costBracket.costBracket)) {
        list = [...list, restaurant]
       }
    });
    console.log("list ", list)
    return list
}

const listOfRestaurants = () => {
    list = []
    Restaurants.forEach(element => {
        
    });
}
module.exports = { getRestaurants, postRestaurants, FeaturedRestaurantsForCuisineAndBracket};