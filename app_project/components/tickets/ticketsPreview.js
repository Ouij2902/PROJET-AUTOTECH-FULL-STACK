import {Card, Heading, Progress} from "react-bulma-components";
import Link from "next/link";

export const TicketsPreview = ({ticket}) => {
    return (
        <Link href={`/tickets/${ticket._id}`}>
            <Card style={{background: "rgba(0, 150, 136, 0.7)", color:"white", cursor: "pointer", marginBottom: "0.5rem"}}>
                <Card.Content>
                    <Heading className="is-4">{ticket.title}</Heading>
                    <hr/> 
                    <p>Type: {ticket.ticket_type} / Priorité: {ticket.priority}</p>
                    <p>Description: {ticket.description}</p>
                    <br/>
                    <p>Avancement: {ticket.avancement}</p>
                    {ticket.avancement === "Traitement en cours"? <Progress max={100} value={50}/>
                    : ticket.avancement === "Traitement terminé"? <Progress max={100} value={100}/>
                    : <Progress max={100} value={10}/>
                    }
                </Card.Content>
            </Card>
        </Link>
    )
}