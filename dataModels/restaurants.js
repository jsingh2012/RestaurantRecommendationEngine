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

const FeaturedRestaurantsForCuisineAndBracket = (userCuisine, costBracket, excludList) => {
    console.log("FeaturedRestaurantsForCuisineAndBracket ", userCuisine, costBracket, excludList)
    list = []
    Restaurants.forEach(restaurant => {
        console.log(" restaurant ", restaurant, userCuisine.cuisine, costBracket.costBracket, restaurant.cuisine, restaurant.costBracket)  
        if(restaurant.isRecommended && restaurant.cuisine === userCuisine["primary"].cuisine && parseInt(restaurant.costBracket) === parseInt(costBracket["primary"].costBracket)) {
            if(!excludList.includes( restaurant.restaurantId)) {
                list = [...list, restaurant]
            } else {
                console.log("restaurant.restaurantId included in excludList ", excludList)
            }
       }
    });
    console.log("list ", list)
    if(list.length == 0) {
        Restaurants.forEach(restaurant => {
            console.log(" restaurant ", restaurant, userCuisine.cuisine, costBracket.costBracket, restaurant.cuisine, restaurant.costBracket)  
            if(restaurant.isRecommended 
                && (restaurant.cuisine === userCuisine["primary"].cuisine 
                && (parseInt(restaurant.costBracket) === parseInt(costBracket["secondary"][0].costBracket) 
                    ||  parseInt(restaurant.costBracket) === parseInt(costBracket["secondary"][1].costBracket) ))) {
                
                    if(!excludList.includes( restaurant.restaurantId)) {
                        list = [...list, restaurant]
                    } else {
                        console.log("restaurant.restaurantId included in excludList ", excludList)
                    }
           }
        });
    }
    return list
}

const listOfRestaurants = () => {
    list = []
    Restaurants.forEach(element => {
        
    });
}
module.exports = { getRestaurants, postRestaurants, FeaturedRestaurantsForCuisineAndBracket};