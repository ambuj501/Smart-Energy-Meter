const firebase = require("./firebase-connect");

module.exports = {
    _updateData : function(checkedItemName, callback){      

        firebase.database().ref("loads/"+ checkedItemName+"/").update({
            flag : 1
        });
        callback("successfull");
        
    }
}