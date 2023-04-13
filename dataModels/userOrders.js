UsersOrders = {}

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
const getUsersOrders = (req, res) => {
    const id = req.query.id
    console.log("userOrder ", id);
    if(id in UsersOrders) {
        res.send( JSON.stringify(UsersOrders[id]))
    } else {
        res.send( JSON.stringify({"data": "User not Found"}))
    }
};

const postUsersOrders =  (req, res) => {
    console.log(req.body);
    const {userId, cuisineType, costbracket} = req.body
    console.log(userId, cuisineType, costbracket)
    
    // if(!(userId in Orders)) {
    //     Orders[userId] = []
    // }
    // Orders[userId].push(req.body)

    if(!(userId in UsersOrders)) {
        UsersOrders[userId] = User
    }
    if(! (cuisineType in UsersOrders[userId].cuisines )) {
        UsersOrders[userId].cuisines[cuisineType] = 0
    }
    UsersOrders[userId].cuisines[cuisineType]++
    if(! (costbracket in UsersOrders[userId].costBracket )) {
        UsersOrders[userId].costBracket[costbracket] = 0
    }
    UsersOrders[userId].costBracket[costbracket]++
    
    res.send( JSON.stringify(UsersOrders))
};

module.exports = {postUsersOrders, getUsersOrders}