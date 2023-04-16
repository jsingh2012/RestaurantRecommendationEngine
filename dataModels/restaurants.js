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
    res.send(JSON.stringify(Restaurant));
};

const postRestaurants =  (req, res) => {
    //console.log(req.body);
    //req.body.id = length(Restaurant)+1
    const {cuisine, costBracket, rating, isRecommended, onboardedTime } =  req.body
    const restaurantId = Restaurants.length+1
    console.log(restaurantId, cuisine, costBracket, rating, isRecommended, onboardedTime)

    newRestaurant = new Restaurant(restaurantId, cuisine, costBracket, rating, isRecommended, onboardedTime)
    Restaurants = [...Restaurants, newRestaurant]
    
    res.send( JSON.stringify(Restaurants))
};

const listOfRestaurants = () => {
    list = []
    Restaurant.array.forEach(element => {
        
    });
}
module.exports = { getRestaurants, postRestaurants};