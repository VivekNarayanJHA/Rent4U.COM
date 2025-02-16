const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
   },
   description: String,
   image: {
    type: String,
    default:"https://cdn.pixabay.com/photo/2016/08/16/03/39/home-1597079_960_720.jpg",
    set: (v) => v === ""  ? "https://cdn.pixabay.com/photo/2016/08/16/03/39/home-1597079_960_720.jpg" : v,



   },
   price: Number,
   location: String,
   country: String,
    
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing; 