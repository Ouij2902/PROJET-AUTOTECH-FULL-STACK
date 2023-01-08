import {Button, Form} from "react-bulma-components";
import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {checkIfUserLogged} from "../../utils/utils";

export const Ticket = ({ticket, setTicket, showSuccessMessage, showErrorMessage}) => {

    /**
     * Le router
     */
    const router = useRouter()

    const [ticketToUpdate, setTicketToUpdate] = useState(ticket);

    /**
     * Si une requête est en cours pour mettre les champs en disabled et loading
     */
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);

    useEffect(() => {
        (async () => {
            if (!loaded) {
                // Si l'utilisateur semble être connecté, nous vérifions auprès du serveur si l'utilisateur est réellement connecté.
                try {
                    const isUserLoggedData = await checkIfUserLogged();

                    // Si la requête est un succès alors on peut mettre la réponse de si l'utilisateur est connecté et s'il est un "super utilisateur"
                    setIsUserLogged(isUserLoggedData.isUserLogged);
                    setIsSuperUser(isUserLoggedData.isSuperUser);
                }

                    // Si on attrape une erreur alors on met que l'utilisateur n'est ni connecté, ni un "super utilisateur"
                catch (e) {
                    setIsUserLogged(false);
                    setIsSuperUser(false);
                }
                setLoaded(true);
            }
        })();
    }, [loaded]);

    /**
     * Fonction utilisée pour mettre à jour les champs
     * @param e L'événement
     */
    const updateField = (e) => {
        setTicketToUpdate({
            ...ticketToUpdate,
            [e.target.name]: e.target.value
        });
    }

    /**
     * Quand l'utilisateur veut supprimer un ticket
     * @param event L'événement
     */
    const handleTicketDelete = async (event) => {
        // On fait en sorte que l'événement par défaut ne se déclanche pas
        event.preventDefault();

        setIsLoading(true);
        await deleteTicket(ticket);

        // Peu importe s'il y a une erreur ou un succès, on veut remettre les champs à la normale (plus en mode loading et disabled)
        setIsLoading(false);
    }

    /**
     * Quand l'utilisateur veut mettre à jour un ticket
     * @param event L'événement
     */
    const handleTicketUpdate = async (event) => {
        // On fait en sorte que l'événement par défaut ne se déclanche pas
        event.preventDefault();

        // On veut mettre les champs en mode disabled et loading
        setIsLoading(true);
        const updateTicketResult = await updateTicket(ticketToUpdate);

        // Peu importe s'il y a une erreur ou un succès, on veut remettre les champs à la normale (plus en mode loading et disabled)
        setIsLoading(false);
    }

    /**
     * Supprime le ticket
     */
    const deleteTicket = async (ticketToDelete) => {

        // On essaye de faire la requête de suppression
        try {
            const response = await axios.delete(`/api/ticket/${ticketToDelete._id}`);

            // On montre un message de succès
            showSuccessMessage("La suppression du ticket est un succès", `Le ticket ${response.data.title} a été supprimé !`)
            {isSuperUser? router.replace("/gestion_tickets") : router.replace("/my_tickets")};
        }

        // Si on attrape une erreur alors on montre un message d'erreur
        catch (e) {
            showErrorMessage("Il y a eu une erreur lors de la suppression du ticket", e.response.data);
        }
    }

     const updateTicket = async (ticketToUpdate) => {

        // On essaye de faire la requête de mise à jour
        try {
            const response = await axios.put(`/api/ticket/${ticketToUpdate._id}`, ticketToUpdate);

            // On montre un message de succès
            showSuccessMessage("La mise à jour du ticket est un succès", `Le ticket ${response.data.title} a été modifié !`)
            setTicket(response.data);

            // On renvoie la donnée de la réponse pour permettre au composant de faire ce qu'il veut avec
            return response.data;
        }

            // Si on attrape une erreur alors on montre un message d'erreur
        catch (e) {
            showErrorMessage("Il y a eu une erreur lors de la mise à jour de l'utilisateur", e.response.data);

            // On renvoie undefined
            return undefined;
        }
    }

    return (
        <div>
            {!isSuperUser ?
            <>
                <Form.Field>
                    <Form.Label className="subtitle">Nom du ticket</Form.Label>
                    <Form.Control>
                        <Form.Input name="title" className="is-medium"
                                    placeholder="Ticket name" onChange={updateField}
                                    value={ticketToUpdate.title} disabled={isLoading}/>
                    </Form.Control>
                </Form.Field>

                <Form.Field>
                    <Form.Label className="subtitle">Type du ticket</Form.Label>
                    <Form.Control>
                        <Form.Input name="ticket_type" className="is-medium"
                                    placeholder="Ticket type" onChange={updateField}
                                    value={ticketToUpdate.ticket_type}/>
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
                        <Form.Textarea name="description" placeholder="Décrivez votre problème" value={ticketToUpdate.description} onChange={updateField}/>
                    </Form.Control>
                </Form.Field>
            </>
            :<Form.Field>
                <Form.Label className="subtitle">Avancement du ticket</Form.Label>
                <Form.Control>
                    <Form.Radio name="avancement" value="Traitement en cours" onChange={updateField}>Traitement en cours</Form.Radio>
                    <Form.Radio name="avancement" value="Traitement terminé" onChange={updateField}>Traitement terminé</Form.Radio>
                </Form.Control>
            </Form.Field>
            
            }

            <Form.Field>
                <Form.Control>

                    <Button.Group align="right">
                        <Button onClick={handleTicketUpdate} disabled={isLoading} loading={isLoading} color="success">Mettre à jour le ticket</Button>
                        <Button onClick={handleTicketDelete} disabled={isLoading} loading={isLoading} color="danger">Supprimer le ticket</Button>
                    </Button.Group>
                </Form.Control>
            </Form.Field>
        </div>
    )
}