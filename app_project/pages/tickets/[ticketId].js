import {Columns, Heading, Section} from "react-bulma-components";
import {PageWrapper} from "../../components/pageWrapper";
import {CustomPuffLoader} from "../../components/customPuffLoader";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Ticket} from "../../components/tickets/ticket";
import axios from "axios";
import {ProtectedRoute} from "../../components/protectedRoute";

/**
 * La page pour visionner un ticket "/ticket/:ticketId"
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showSuccessMessage Fonction pour montrer un message de succès
 */
const TicketEditorPage = ({showErrorMessage, showSuccessMessage}) => {

    /**
     * Le router
     */
    const router = useRouter()

    const ticketId = router.query.ticketId;
    const [loaded, setLoaded] = useState(false);
    const [ticket, setTicket] = useState(null);

    // On utilise un useEffet pour récupérer le ticket
    useEffect(() => {
        (async () => {

            // On veut faire la requête une seule fois
            if (!loaded) {
                try {
                    const response = await axios.get(`/api/ticket/${ticketId}`);
                    setTicket(response.data);
                }
                catch (e) {
                    showErrorMessage("Il y a eu une erreur lors de la récupération du ticket", e.response.data);
                    setTicket(undefined);
                }

                // On dit que la donnée est mise à jour
                setLoaded(true);
            }
        })()
    }, [loaded]);

    // Si la donnée n'a pas encore été récupérée on montre le loader
    if (!loaded) {
        return <CustomPuffLoader/>
    }

    if (ticket === undefined) {
        router.replace("/contact");
        return null;
    }

    return (
        <PageWrapper>
            <Columns.Column className="is-10 is-offset-1 middle_page">
                <Columns>
                    <Columns.Column className="right">
                        <div className="has-text-centered">
                            <Heading className="is-3">Gestion du ticket</Heading>
                            <p className="description">Modifier ou supprimer le ticket: {ticket.title}</p>
                            <hr/>
                        </div>
                        <Section>
                            <Ticket ticket={ticket} setTicket={setTicket} showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
                        </Section>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

// On exporte la page
export default ProtectedRoute(TicketEditorPage);