const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Ce schema sera utilisé pour stocker les tickets
 * @schema : Ticket
 */
const TicketSchema = new Schema(
    {
        /**
         * Le titre du ticket
         */
        title: {
            type: Schema.Types.String,
            required: true
        },

        /**
         * Le type du ticket
         */
        ticket_type: {
            type: Schema.Types.String,
            required: true
        },

        /**
         * Le niveau de priorité du ticket
         */
        priority: {
            type: Schema.Types.String,
            required: true
        },

        /**
         * La description du problème
         */
        description: {
            type: Schema.Types.String,
            required: true
        },

        avancement: {
            type: Schema.Types.String,
            default: "Non traité"
        },

        account: {
            type: Schema.Types.ObjectId,
            ref: "account"
        },

        /**
         * Quand le ticket a été crée
         */
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

// On exporte le model
module.exports = {
    Ticket: mongoose.model('ticket', TicketSchema)
}