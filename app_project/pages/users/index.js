import {Columns, Heading} from "react-bulma-components";
import {PageWrapper} from "../../components/pageWrapper";
import {useEffect, useState} from "react";
import axios from "axios";
import {UsersList} from "../../components/users/usersList";
import {ProtectedRoute} from "../../components/protectedRoute";

/**
 * La page pour visionner les utilisateurs "/users"
 * @param showSuccessMessage Fonction pour montrer un message de succès
 */
const UsersPage = ({showErrorMessage}) => {

    /**
     * Variable pour savoir si la donnée a été récupérée
     */
    const [loaded, setLoaded] = useState(false);

    /**
     * Les utilisateurs
     */
    const [users, setUsers] = useState([]);

    // On utilise un useEffet pour récupérer les utilisateurs
    useEffect(() => {
        (async () => {

            // On veut faire la requête une seule fois
            if (!loaded) {

                // On essaye de faire la requête pour récupérer les utilisateurs
                try {
                    const response = await axios.get(`/api/accounts`);

                    // On met à jour les utilisateurs
                    setUsers(response.data);
                }

                    // Si on attrape une erreur alors on montre un message d'erreur
                catch (e) {
                    showErrorMessage("Il y a eu une erreur lors de la récupération des utilisateurs", e.response.data);
                }

                // On dit que la donnée est mise à jour
                setLoaded(true);
            }
        })()
    }, [loaded]);

    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 middle_page">
                <Columns>
                    <Columns.Column className="right">
                        <Heading className="is-3">Liste des utilisateurs</Heading>
                        <Heading className="subtitle">Cliquez sur un de ces utilisateurs pour le modifier ou le supprimer</Heading>
                        <hr/>
                        <UsersList users={users}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

// On exporte la page
export default ProtectedRoute(UsersPage, true);