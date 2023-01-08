const {Ticket} = require("../models/TicketModel");
const {isObjectIdStringValid} = require("../utils");

/**
 * Créer un nouveau ticket
 * @param title titre du ticket
 * @param ticket_type type du ticket
 * @param priority niveau de priorité du ticket
 * @param description description du ticket
 */
const createTicket = async (title, ticket_type, priority, description, accountId) => {

    // On fait des tests...
    if (title === undefined || title === "") {
        throw new Error("Le titre du ticket doit être défini et non vide pour créer un nouveau ticket");
    }

    if (ticket_type === undefined || ticket_type === "") {
        throw new Error("Le type du ticket doit être défini et non vide pour créer un nouveau ticket");
    }

    if (description === undefined || description === "") {
        throw new Error("Merci de bien vouloir faire une petite description pour que l'on puisse traiter au mieux votre problème");
    }

    const newTicket = new Ticket({
        title: title,
        ticket_type: ticket_type,
        priority: priority,
        description: description,
        account: accountId
    });

    try {
        const ticketCreated = await newTicket.save();
        return ticketCreated;
    } catch (e) {
        throw e;
    }
}

async function readAllTickets() {

    try {
        return await Ticket.find({})
    }

    catch (e) {
        throw new Error("Il y a eu une erreur lors de la recuperation des tickets");
    }
}

async function readMyTickets(accountId){
    try {
        return await Ticket.find({account: accountId})
    }

    catch (e) {
        throw new Error("Il y a eu une erreur lors de la recuperation de vos tickets");
    }
}

const getTicketData = async (ticketId) => {

    if (ticketId === undefined || !isObjectIdStringValid(ticketId)) {
        throw new Error("L'id du ticket est invalide ou non défini");
    }

    let ticketFound = await Ticket.findById(ticketId).lean();
    if (ticketFound === null) {
        throw new Error("Le ticket n'a pas été trouvé");
    }
    return ticketFound;
}

async function updateTicket(ticketId, ticketToUpdate) {

    // Vérifier si l'userId existe et est un id MongoBD valide
    if (ticketId === undefined || !isObjectIdStringValid(ticketId)) {
        throw new Error("L'id du ticket n'existe pas ou n'est pas un id MongoDB");
    }
    if (ticketToUpdate.title === "") {
        delete ticketToUpdate.title;
    }
    if (ticketToUpdate.ticket_type === "") {
        delete ticketToUpdate.ticket_type;
    }

    const ticketUpdated = await Ticket.findByIdAndUpdate(ticketId, ticketToUpdate, {new: true});

    if (ticketUpdated === null) {
        throw new Error("Le ticket n'existe pas et n'a donc pas pû être modifié");
    }
    return ticketUpdated;
}

async function deleteTicket(ticketId) {

    if (ticketId === undefined || !isObjectIdStringValid(ticketId)) {
        throw new Error("L'id du ticket n'existe pas ou n'est pas un id MongoDB")
    }
    const ticketDeleted = await Ticket.findByIdAndDelete(ticketId);

    if (ticketDeleted === null) {
        throw new Error("Le ticket n'existe pas et n'a donc pas pû être supprimé");
    }
    return ticketDeleted;
}

// On exporte les fonctions
module.exports = {
    createTicket: createTicket,
    readAllTickets: readAllTickets,
    readMyTickets: readMyTickets,
    getTicketData: getTicketData,
    updateTicket: updateTicket,
    deleteTicket: deleteTicket
}