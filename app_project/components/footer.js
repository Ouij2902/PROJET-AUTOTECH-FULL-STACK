import {Container, Footer as FooterBulma, Level} from 'react-bulma-components';
import Link from "next/link";
import Image from 'next/image';
import footer_drapeau from "../public/footer_drapeau.svg";
import footer_voiture from "../public/footer_voiture.svg";

/**
 * Le footer de l'application
 */
export const Footer = () => {
    return (
        <FooterBulma>
            <Container>
                <Level>
                    <Level.Item className="footer" id="footer">
                        <Link href="/contact" passHref>Contactez-nous</Link>&nbsp;pour éviter de caler &nbsp;
                        <Image src={footer_drapeau} quality={100}/>
                        <Image src={footer_voiture} quality={100}/>
                    </Level.Item>
                </Level>
            </Container>
        </FooterBulma>
    )
}