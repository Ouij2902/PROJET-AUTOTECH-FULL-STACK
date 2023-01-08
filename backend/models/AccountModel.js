const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Ce schema sera utilisé pour stocker les comptes d'utilisateurs
 * @schema : Account
 */
const AccountSchema = new Schema(
    {
        /**
         * Le nom de l'utilisateur
         */
        username: {
            type: Schema.Types.String,
            required: true
        },
        /**
         * L'email de l'utilisateur
         */
        email: {
            type: Schema.Types.String,
            match: [/\S+@\S+\.\S+/, 'email invalide'],
            required: true
        },

        /**
         * Le mot de passe de l'utilisateur
         */
        password: {
            type: Schema.Types.String,
            required: true
        },

        /**
         * SI l'utilisateur est un "super utilisateur"
         */
        isSuperUser: {
            type: Schema.Types.Boolean,
            default: false
        },

        /**
         * Quand le compte a été crée
         */
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

// On exporte le model
module.exports = {

    // On dit que le Model Account est créé à partir du Schema AccountSchema et le Model sera stocké dans la base de donnée MongoDB sous le nom "account"
    Account: mongoose.model('account', AccountSchema)
}