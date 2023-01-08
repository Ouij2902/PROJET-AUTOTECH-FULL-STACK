import {Panel} from "react-bulma-components";
import {TicketsPreview} from "./ticketsPreview";

/**
 * Le composant pour montrer les utilisateurs sous forme de liste
 * @param tickets Les tickets
 */
export const TicketsList = ({tickets}) => {
    
    return (
        <Panel>
            {tickets.map((ticket) => <TicketsPreview key={ticket._id} ticket={ticket}/>)}
        </Panel>
    );
}