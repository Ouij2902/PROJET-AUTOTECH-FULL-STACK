import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {LoginForm} from "../../components/users/loginForm";

/**
 * La page pour connecter un utilisateur "/login"
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showSuccessMessage Fonction pour montrer un message de succès
 * @param showInfoMessage Fonction pour montrer un message d'information
 */
const LoginPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    // Sinon on renvoie la page pour se connecter
    return (
        <PageWrapper>
            <Columns.Column className="is-4 is-offset-4 middle_page">
                <Columns>
                    <Columns.Column className="right has-text-centered">
                        <Heading className="is-3">Sign in</Heading>
                        <Heading className="is-4">Welcome back &#x1F642;</Heading>
                        <LoginForm showErrorMessage={showErrorMessage} showInfoMessage={showInfoMessage}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default LoginPage;