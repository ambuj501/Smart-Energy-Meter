const firebase = require("./firebase-connect");

module.exports = {
    saveData : function(itemName,callback){
        
        let load = itemName;

        firebase.database().ref("loads/"+ load).set({
            flag : 0,            
        });
        callback(null,{"statuscode":200, "message": "successfully"});
    }
}