import {PageWrapper} from "../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";

// La page de l'index, c'est à dire le '/'
const IndexPage = () => {
    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 has-text-centered middle_page">
                <Heading className="is-3">Hellooo !</Heading>
                <hr/>
                <p>Bienvenue sur le site du club de réparation automobile Autotech</p>
                <br/>
                <p>Inscrivez-vous ou connectez-vous pour réparer votre voiture &#128736; &#128521;</p>
            </Columns.Column>
        </PageWrapper>
    )
}

// On exporte la page
export default IndexPage;