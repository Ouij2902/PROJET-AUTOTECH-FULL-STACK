const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');
const salt=10;

/**
 * Ce schema sera utilisé pour stocker les utilisateurs
 * @schema : User
 */
const UserSchema = new Schema({

    /**
     * Le nom de l'utilisateur
     */
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },

    /**
     * email de l'utilisateur
     */
    email: {
        type: Schema.Types.String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true
    },

    /**
     * password de l'utilisateur
     */
    password: {
        type: Schema.Types.String,
        required: true
    },
    password_confirmation: {
        type: Schema.Types.String,
        required: true
    },

    /**
     * Ce champ sera pour savoir quand un utilisateur a été ajouté la base de données
     */
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    },

    token:{
        type: Schema.Types.String
    }
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken'});

// crypte le password directement après la création
UserSchema.pre('save',function(next){
    var user=this;
    
    if(user.isModified('password')){
        bcrypt.genSalt(salt,function(err,salt){
            if(err)return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                user.password_confirmation=hash;
                next();
            })

        })
    }
    else{
        next();
    }
});

UserSchema.methods.comparepassword = function(password,cb){
    bcrypt.compare(password, this.password, function(err,isMatch){
        if(err) return cb(next);
        cb(null,isMatch);
    });
}

// On exporte le model
module.exports = {

    // On dit que le Model User est créé à partir du Schema UserSchema et le Model sera stocké dans la base de donnée MongoDB sous le nom "user"
    User: mongoose.model('user', UserSchema)
}