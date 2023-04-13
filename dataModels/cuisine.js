let Cuisines = []

const getCuisines = (req, res) => {
    res.send(JSON.stringify(Cuisines));
};

const postCuisines =  (req, res) => {
     // console.log(req.body);
     const {data: newCuisines} = req.body
     // console.log(newCuisines);
     listOfnewCuisines = newCuisines.split(",")
     listOfnewCuisines.forEach(element => {
         element = element.trim()
         if(!Cuisines.includes(element)) {
             Cuisines = [...Cuisines, element]
         }
     })
     
     res.send( JSON.stringify(Cuisines))
};

module.exports = {getCuisines, postCuisines};