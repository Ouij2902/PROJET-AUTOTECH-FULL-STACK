import {Button, Form, Heading} from "react-bulma-components";
import {useState} from "react";
import axios from "axios";

/**
 * Le composant pour créer un ticket
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showSuccessMessage Fonction pour montrer un message de succès
 */
export const TicketCreationForm = ({showErrorMessage, showSuccessMessage}) => {

    /**
     * Les données pour la création d'un ticket
     */
    const [newTicketData, setTicketData] = useState({
        title: "",
        ticket_type: "",
        priority: "",
        description: ""
    })

    /**
     * Fonction utilisée pour mettre à jour les champs
     * @param e L'événement
     */
    const updateField = (e) => {
        setTicketData({
            ...newTicketData,
            [e.target.name]: e.target.value
        });
    }

    /**
     * Fonction pour créer un ticket
     * @param event L'événement du click du button
     */
    const createNewTicket = async (event) => {

        // On fait en sorte que l'événement par défaut ne se déclanche pas
        event.preventDefault();

        // Nous vérifions d'abord que tous les champs ont été remplis, sinon nous affichons un message
        for (const key in newTicketData) {
            if (newTicketData[key] === '') {
                return showErrorMessage(`Un ou plusieurs champs sont manquants`, "Veuillez recommencer");
            }
        }

        // On essaye de créer un ticket
        try {
            const response = await axios.post('/api/newticket', {
                title: newTicketData.title,
                ticket_type: newTicketData.ticket_type,
                priority: newTicketData.priority,
                description: newTicketData.description
            });

            showSuccessMessage("Le ticket a été créé avec succès.");
        }

        catch (e) {
            showErrorMessage("Il y a eu une erreur lors de la création du ticket", e.response.data);
        }
    }

    /**
     * Fonction qui s'exécute si un utilisateur appuie sur la touche entrée (pour que ça soit plus rapide que de cliquer sur le bouter de connexion)
     * @param event L'événement
     */
    const handleKeyDown = (event) => {

        // La touche 13 est la touche "entrer"
        if (event.keyCode === 13 && event.shiftKey === false) {
            createNewTicket(event);
        }
    }

    return (
        <form>

            <Heading className="is-4">Créer un ticket &#127915;</Heading>
            <Form.Field>
                <Form.Label className="subtitle">Nom du ticket</Form.Label>
                <Form.Control>
                    <Form.Input name="title" className="is-medium" type="text"
                                placeholder="Ticket name" onKeyDown={handleKeyDown}
                                onChange={updateField} value={newTicketData.title}/>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Label className="subtitle">Type du ticket</Form.Label>
                <Form.Control>
                    <Form.Input name="ticket_type" className="is-medium" type="text"
                                placeholder="Ticket type" onKeyDown={handleKeyDown}
                                onChange={updateField} value={newTicketData.ticket_type}/>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Label className="subtitle">Niveau de priorité du ticket</Form.Label>
                <Form.Control>
                    <Form.Radio name="priority" value="Faible" onChange={updateField}>Faible</Form.Radio>
                    <Form.Radio name="priority" value="Moyenne" onChange={updateField}>Moyenne</Form.Radio>
                    <Form.Radio name="priority" value="Urgent" onChange={updateField}>Urgent</Form.Radio>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Label className="subtitle">Description</Form.Label>
                <Form.Control>
                    <Form.Textarea name="description" placeholder="Décrivez votre problème" value={newTicketData.description} onChange={updateField}/>
                </Form.Control>
            </Form.Field>

            <Button onClick={createNewTicket} className="is-block is-primary is-fullwidth is-medium">Créer le ticket</Button>
        </form>
    )
}