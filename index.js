const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require('./model/listing'); // Ensure correct path
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");


// connect to data base
const mongo = "mongodb://127.0.0.1:27017/rental"
main()
.then(()=>{
    console.log("connected to data");
})
.catch((err)=>{
    console.log(err);
});

// ejs set up
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));






async function main(){
    await mongoose.connect(mongo);
}


// start server
app.listen(5000,() =>{
    console.log("server is listening to port 8080");

});
// root route
app.get('/example', (req, res) => {
    res.send('Hello, World!');
});
// sample data 
app.get("/testlisting",async(req,res)=>{
    const sampleListing = new Listing({
        title: "Beautiful Apartment",
        price: 1500,
        location: "New Delhi",
        description: "A spacious 2BHK apartment.",
    });
    
    await sampleListing.save();
    console.log("Sample listing saved successfully!");
});
// show all data on that route
app.get("/listing", async (req, res) => {
    try {
        const allListing = await Listing.find({});
        res.render("listings/index.ejs", { allListing });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).send("Internal Server Error");
    }
});


// create new route 
app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs");
})




app.post("/listing",async (req,res)=>{
    // add object ko data base
    console.log(req.body.listing);
try{
    const newListing = new Listing(req.body.listing); // new instance
    await newListing.save();
    res.redirect("/listing");
    console.log(newListing);
    //console.log(req.body.listing.price);
}catch(err){
    console.log(err);
}


   
});
// edit  route
app.get("/listing/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});



});
// DELETE ROUTE
app.delete("/listing/:id", async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing");
})







// Update
app.put("/listing/:id", async (req,res) =>{
    let {id} = req.params;
    // take value from req.body 
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listing/${id}`);
})




// show route by id 
app.get("/listing/:id", async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});

})



