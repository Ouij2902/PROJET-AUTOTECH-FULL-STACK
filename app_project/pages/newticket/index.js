import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {TicketCreationForm} from "../../components/tickets/ticketCreationForm";
import {ProtectedRoute} from "../../components/protectedRoute";

/**
 * La page pour créer un nouveau ticket
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showSuccessMessage Fonction pour montrer un message de succès
 */
const NewTicketPage = ({showErrorMessage, showSuccessMessage}) => {
    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 middle_page">
                <Heading className="is-3 has-text-centered">New ticket</Heading>
                <hr/>
                <TicketCreationForm showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
            </Columns.Column>
        </PageWrapper>
    )
}

// On exporte la page
export default ProtectedRoute(NewTicketPage);