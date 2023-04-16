var Heap = require('heap');
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
        result = getPrimaryAndSecondaryCousineForUser(id)
        res.send( JSON.stringify({id: UsersOrders[id], result: result}))
    } else {
        res.send( JSON.stringify({"data": "User not Found"}))
    }
};

const getPrimaryAndSecondaryCousineForUser = (userId) => {
    //MAX heap
    cousineheap = new Heap(function(a, b) {
        return b.count - a.count;
    })
    //console.log(" userId ", userId, " UsersOrders[userId].cuisines ", UsersOrders[userId].cuisines)
    result = {}
    if(userId in UsersOrders) {
        //Add data to heap
        for (var key in  UsersOrders[userId].cuisines) {
            console.log(key);
            cousineheap.push({cousine: key, count: UsersOrders[userId].cuisines[key] })
            console.log(cousineheap)
        }
        result["primary"]  = cousineheap.pop()
        result["seconary"] = [cousineheap.pop(), cousineheap.pop()]
        //console.log(result)
        return result

    } else {
        res.send( JSON.stringify({"data": "User not Found"}))
    }
}

const getPrimaryAndSecondaryCategoryForUser = (userId) => {

}

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