import {Columns, Heading, Button} from "react-bulma-components";
import {PageWrapper} from "../../components/pageWrapper";
import {useEffect, useState} from "react";
import axios from "axios";
import {TicketsList} from "../../components/tickets/ticketsList";
import {ProtectedRoute} from "../../components/protectedRoute";

const TicketsPage = ({showErrorMessage}) => {

    const [loaded, setLoaded] = useState(false);

    const [tickets, setTickets] = useState([]);

    const [avancementSorted, setAvancementSorted] =useState([]);
    const [prioritySorted, setPrioritySorted] =useState([]);

    // On utilise un useEffet pour récupérer les utilisateurs
    useEffect(() => {
        (async () => {

            // On veut faire la requête une seule fois
            if (!loaded) {

                try {
                    const response = await axios.get(`/api/tickets`);

                    setTickets(response.data);
                }

                    // Si on attrape une erreur alors on montre un message d'erreur
                catch (e) {
                    showErrorMessage("Il y a eu une erreur lors de la récupération des tickets", e.response.data);
                }

                // On dit que la donnée est mise à jour
                setLoaded(true);
            }
        })()
    }, [loaded]);

    useEffect(() => {
        setAvancementSorted(avancementSorted);
        setPrioritySorted(prioritySorted)
    },[]);

    const handleTicketAvancementSort = async (event) => {
        event.preventDefault();
        const ticketSort = await sortAvancementTicket(tickets);
    }
    const sortAvancementTicket = async (tickets) => {
        try {
            const sortedData = tickets.sort( (a,b) => {
                return a.avancement > b.avancement ? 1 : -1
            })
            setAvancementSorted(sortedData);
        }
        catch (e) {
            showErrorMessage("Il y a eu une erreur lors du tri des tickets par avancement", e.response.data);
            return undefined;
        }
    }

    const handleTicketPrioritySort = async (event) => {
        event.preventDefault();
        const ticketSort = await sortPriorityTicket(tickets);
    }
    const sortPriorityTicket = async (tickets) => {
        try {
            const sortedData = tickets.sort( (a,b) => {
                return a.priority > b.priority ? -1 : 1
            })
            setPrioritySorted(sortedData);
        }
        catch (e) {
            showErrorMessage("Il y a eu une erreur lors du tri des tickets par priorité", e.response.data);
            return undefined;
        }
    }

    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 middle_page">
                <Columns>
                    <Columns.Column className="right">
                        <Heading className="is-3">Liste de tous les tickets</Heading>
                        <Button.Group>
                            <Button onClick={handleTicketAvancementSort} color="info">Trier par avancement</Button>
                            <Button onClick={handleTicketPrioritySort} color="info">Trier par priotité</Button>
                        </Button.Group>
                        <hr/>
                        <TicketsList tickets={tickets}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

// On exporte la page
export default ProtectedRoute(TicketsPage, true);