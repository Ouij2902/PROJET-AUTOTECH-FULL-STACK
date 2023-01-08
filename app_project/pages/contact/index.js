import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import Link from 'next/link';
import Image from 'next/image';
import insta from "../../public/Instagram_icon.png";

// La page de test, c'est-à-dire le '/test'
const TestPage = () => {
    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 middle_page">
                <Heading className="is-3">Ne vous inquiétez pas, tout va bien se passer !</Heading>
                <p className="description">Contactez-nous via Instagram, vous aurez une réponse rapide &nbsp; 
                <Link href="https://www.instagram.com/_autotech_annecy_/" passHref target="_blank" rel="noopener noreferrer">
                    <Image src={insta} width={30} height={30} quality={100}/>
                </Link>
                </p>
            </Columns.Column>
        </PageWrapper>
    )
}

// On exporte la page
export default TestPage;