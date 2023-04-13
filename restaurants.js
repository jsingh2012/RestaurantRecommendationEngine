Restaurant = []

const getRestaurants = (req, res) => {
    res.send(JSON.stringify(Restaurant));
};

const postRestaurants =  (req, res) => {
    //console.log(req.body);
    //req.body.id = length(Restaurant)+1
    data = {...req.body, id:Restaurant.length+1 }
    //console.log(data);
    //const now  =  new Date();
    //console.log(date.format(now,'DD/MM/YYYY'))
    Restaurant = [...Restaurant, data]
    res.send( JSON.stringify(Restaurant))
};

module.exports = { getRestaurants, postRestaurants};