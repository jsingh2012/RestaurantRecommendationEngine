
// server.js File
const express = require('express'); // Importing express module
const app = express(); // Creating an express object
app.use(express.json());
const port = 8100;  // Setting an port for this application
  
  
// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})

Cuisines = []

app.get("/cuisines/", function(req, res) {
    res.end( JSON.stringify(Cuisines))
})

app.post("/cuisines/", function(req, res) {
    console.log(req.body);
    const {data: newCuisines} = req.body
    console.log(newCuisines);
    listOfnewCuisines = newCuisines.split(",")
    listOfnewCuisines.forEach(element => {
        element = element.trim()
        if(!Cuisines.includes(element)) {
            Cuisines = [...Cuisines, element]
        }
    })
    
    res.end( JSON.stringify(Cuisines))
})