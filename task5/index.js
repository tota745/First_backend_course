const express = require("express");
const app = express();


app.set("view engine", "ejs"); 
app.get("/movie", async (req, res) => {

 const response = await fetch(`https://api.tvmaze.com/search/shows?q=example`);
 const data = await response.json(); 
 console.log(data); 
 res.send(data[0]); 
}); 
     

    app.get("/movie/:movieName", async (req, res) => {
        const movieName = req.params.movieName;
        
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${movieName}`);
            const data = await response.json();
    
            if (data && data.length > 0) {
                const ourData = {
                    id: data[0].show.id,
                    title: data[0].show.name,
                    rating: data[0].show.rating?.average ,
                    image: data[0].show.image 
                };
                res.json(ourData);
            } else {
                res.send("Movie not found.");
            }
        } );    
           
     app.listen(3000, () => {
         console.log("Listening on port 3000"); });