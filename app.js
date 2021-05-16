const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");




const app = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb+srv://ambuj501:Ambuj123@cluster0.e4zz6.mongodb.net/Load", {useNewUrlParser: true});

const itemsSchema = {
    name: String
  };
  
  const Item = mongoose.model("Item", itemsSchema);
  
  
  const listSchema = {
    name: String,
    items: [itemsSchema]
  };
  
  const List = mongoose.model("List", listSchema);










  var spawn = require("child_process").spawn; 


var hour = 24;
var price;
var delay;

function callName(req, res) { 

    var process = spawn('python',["ml.py",hour] ); 
 
    process.stdout.on('data', function(data) { 
        var output_price = data.toString();
        price = output_price.split(" ").map((i) => Number(i));

        var today_date = new Date();
        var curr_time = today_date.getHours();  
        var pr = price.slice(curr_time, 24);
        delay = pr.indexOf(Math.min.apply(null, pr));        
        console.log(delay); 
     
        res.render("login");
    } ); 
} 

app.get('/', callName); 


app.get("/login",function(req,res){
    res.render("login");
})

var arr = "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24"
const b = arr.split(" ").map((i) => Number(i));


app.post("/login",function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);

    Item.find({}, function(err, foundItems){
  
      res.render("home", {
          newListItems: foundItems,
          prices: price,
          day : b  
  });  
  });
})







  //Connect Firebase 
const writefb = require("./firebase/setData");
const updateOne = require("./firebase/updateDataOne");
const updateZero = require("./firebase/updateDataZero");

//save data into mongodb and Firebase

  
  app.post("/", function(req, res){
  
    const itemName = req.body.newItem;
    const listName = req.body.list;
  
    const item = new Item({
      name: itemName
    }); 
      item.save();
      writefb.saveData(itemName, function(err, data){		
      res.redirect("/");
    });    
   
  });
  


/*
        var today_date = new Date();
        var curr_time = today_date.getHours();  
        var pr = price.slice(curr_time, 25);
        var idx = pr.indexOf(Math.min.apply(null, pr));
        delay = idx-curr_time;
        console.log(delay); 
*/




//UPDATE LOad  in Firebase
//Load Management

app.post("/delete", function(req, res){
  const checkedItemName = req.body.checkbox;   
  var x = req.body.checkflag;
  if(x=="on")
  {
    updateOne._updateData(checkedItemName, function(data){
      console.log("Successfully Set to One");
    }); 
    /*
    var delay = 0;
    setTimeout(function () {      
      updateOne._updateData(checkedItemName, function(data){
        console.log("Successfully Set to One")
    }); }, delayInMiliSec);
    */
  }
  else{
    updateZero._updateData(checkedItemName, function(data){
      console.log("Successfully Set to Zero");
    }); 
  }  

  });


  //Control Load 

  app.post("/control", function(req, res){
    const checkedItemName = req.body.checkbox;   
    var x = req.body.checkflag;
    if(x=="on")
    {
      updateOne._updateData(checkedItemName, function(data){
        console.log("Successfully Set to One");
      }); 
    }
    else{
      updateZero._updateData(checkedItemName, function(data){
        console.log("Successfully Set to Zero");
      }); 
    }  
    });
  
  // Delete the load in Mongodb
 /*
  app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;    
    console.log(checkedItemId);
    
      Item.findByIdAndRemove(checkedItemId, function(err){
        if (!err) {
          console.log("Successfully deleted checked item.");
          res.redirect("/");
        }
      });
    });
  */



    //Payments 

//4242 4242 4242 4242 CVV: 123, Any future date
var Publishable_Key = 'pk_test_51IXED0SD1W0tsgd3h2cSmPirUrj4D6lqoTJuU4qgrR1OHuRSRx7cCti0OaVIFXlFXh4BOHWJ3bcvYgk3hzNwDxQh00NEVNksbe'
var Secret_Key = 'sk_test_51IXED0SD1W0tsgd3Ah1Sxj3NnN7aTn77XFoVw0qEA9ZVW5DcUMtpP6vtL6U3EUQaYI8ltpYyOmdPVZgPOr8VhcDL00L6DIc1v3'

const stripe = require('stripe')(Secret_Key) 
app.get('/payment', function(req, res){ 
  res.render('payment', { 
  key: Publishable_Key 
  }) 
})

app.post('/payment', function(req, res){ 
  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: 'Ambuj Mishra', 
      address: { 
          line1: 'TC 9/4 Old MES colony', 
          postal_code: '110092', 
          city: 'New Delhi', 
          state: 'Delhi', 
          country: 'India', 
      } 
  }) 
  .then((customer) => { 

      return stripe.charges.create({ 
          amount: 30050,    // Charing Rs 25 
          description: 'Web Development Product', 
          currency: 'INR', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.send("Success") // If no error occurs 
  }) 
  .catch((err) => { 
      res.send(err)    // If some error occurs 
  }); 
}) 
    







app.get("/login",function(req,res){
    res.render("login");
})

app.get("/register",function(req,res){
    res.render("register");
})

//var arr = "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20"
//const b = arr.split(" ").map((i) => Number(i));
//console.log(b);



app.post("/login",function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
    res.render("secrets",{
    y: y   
    });

})








app.get('/logout',function(req,res){
    res.render("login");
})




app.listen(3000,function(){
    console.log("Server started ");
});