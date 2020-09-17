const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema =new Schema(
    {
        /*
        username : {               Will be added through passport-local-mongoose
            type : String,         plugin with hash and salt
            required : true,       encrypted password 
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        */
        admin : {
            type : Boolean, 
            default : false
        }
    }
);

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);