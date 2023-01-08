import {Card, Heading} from "react-bulma-components";
import Link from "next/link";
import moment from "moment";

export const UserPreview = ({user}) => {
    return (
        <Link href={`/users/${user._id}`}>
            <Card style={{background:"rgb(60,179,113)", cursor: "pointer", marginBottom: "0.5rem"}}>
                <Card.Content>
                    <Heading className="is-4">{user.username}</Heading>
                    <hr/>
                    Created {moment(user.createdAt).from()}
                </Card.Content>
            </Card>
        </Link>
    )
}