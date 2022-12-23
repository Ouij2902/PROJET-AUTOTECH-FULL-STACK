const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const uniqueValidator = require('mongoose-unique-validator');

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
     * Le fait de mettre 'default: Date.now' permettra de créer ce champ sans devoir le renseigner et sera la date au moment de l'ajout du document
     */
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken'});
/*
UserSchema.pre(save, function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
*/

// On exporte le model
module.exports = {

    // On dit que le Model User est créé à partir du Schema UserSchema et le Model sera stocké dans la base de donnée MongoDB sous le nom "user"
    User: mongoose.model('user', UserSchema)
}