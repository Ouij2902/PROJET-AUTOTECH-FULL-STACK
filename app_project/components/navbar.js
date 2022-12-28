import {Navbar as BulmaNavbar} from 'react-bulma-components'
import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {checkIfUserLogged} from "../utils/utils";
import Image from 'next/image';
import logo from "../public/logo.svg";

/**
 * La navbar
 * @param router Le router de NextJS
 */
export const Navbar = ({router}) => {

    /**
     * Si le burger de la barre de navigation est actif (pour les mobiles)
     */
    const [isActive, setIsActive] = useState(false);

    /**
     * Si l'utilisateur est connecté
     */
    const [isUserLogged, setIsUserLogged] = useState(false);

    /**
     * Si l'utilisateur est un "super utilisateur"
     */
    const [isSuperUser, setIsSuperUser] = useState(false);

    /**
     * Utilisé pour savoir si la page a changé (pour mettre à jour la navbar)
     */
    const [lastPage, setLastPage] = useState(router === null ? undefined : router.pathname);

    /**
     * useEffect utilisé pour vérifier si la page a changé pour savoir si l'utilisateur est toujours connecté
     */
    useEffect(() => {
        if (router !== null && router.pathname !== lastPage) {
            setLastPage(router.pathname)
        }
    })

    /**
     * useEffect pour savoir si l'utilisateur est toujours connecté et pour mettre à jour la barre de navigation en conséquence.
     */
    useEffect(() => {
        (async () => {

            // Si l'utilisateur semble être connecté, nous vérifions auprès du serveur si l'utilisateur est réellement connecté.
            try {
                const isUserLoggedData = await checkIfUserLogged();

                // Si la requête est un succès alors on peut mettre la réponse de si l'utilisateur est connecté et s'il est un "super utilisateur"
                setIsUserLogged(isUserLoggedData.isUserLogged);
                setIsSuperUser(isUserLoggedData.isSuperUser);
            }

                // Si on attrape une erreur alors on met que l'utilisateur n'est ni connecté, ni un "super utilisateur"
            catch (e) {
                setIsUserLogged(false);
                setIsSuperUser(false);
            }
        })();
    }, [lastPage]);

    return (
        <BulmaNavbar active={isActive} className="isFixed" id="menu">
            <div className="container" id="element_container">
                <BulmaNavbar.Brand>
                    <BulmaNavbar.Burger onClick={() => setIsActive(!isActive)}/>
                </BulmaNavbar.Brand>
                <BulmaNavbar.Menu>
                    <BulmaNavbar.Container>
                        <Link href="/" passHref>
                            <Image src={logo} quality={100}/>
                        </Link>
                        <BulmaNavbar.Item renderAs="a">
                            <Link href="/" passHref>
                                About Us
                            </Link>
                        </BulmaNavbar.Item>


                        <BulmaNavbar.Item renderAs="a">
                            <Link href="/contact" passHref>
                                Contact
                            </Link>
                        </BulmaNavbar.Item>


                        {isUserLogged ?
                            <>
                                <BulmaNavbar.Item renderAs="a">
                                    <Link href="/users" passHref>
                                        Users
                                    </Link>
                                </BulmaNavbar.Item>

                            </> : null}
                    </BulmaNavbar.Container>

                    <div className="navbar-end">

                        {isSuperUser ?
                            <>
                                <BulmaNavbar.Item renderAs="a" className="has-dropdown is-hoverable">
                                    <BulmaNavbar.Link>
                                        Gestion administrateur
                                    </BulmaNavbar.Link>
                                    <BulmaNavbar.Dropdown>
                                        <BulmaNavbar.Item renderAs="span">
                                            <Link href="/admin" passHref>
                                                <p style={{color: "#7a7a7a", letterSpacing: ".1em", textTransform: "uppercase"}}>Admin page</p>
                                            </Link>
                                        </BulmaNavbar.Item>

                                    </BulmaNavbar.Dropdown>
                                </BulmaNavbar.Item>
                            </> : null
                        }

                        {isUserLogged ?
                            <>
                                <BulmaNavbar.Item renderAs="a" className="has-dropdown is-hoverable">
                                    <BulmaNavbar.Link>
                                        <BulmaNavbar.Item renderAs="span">
                                            <Link href="/account" passHref>
                                                Account
                                            </Link>
                                        </BulmaNavbar.Item>
                                    </BulmaNavbar.Link>
                                    <BulmaNavbar.Dropdown>
                                        <BulmaNavbar.Item renderAs="span">
                                            <Link href="/logout" passHref>
                                                Log out
                                            </Link>
                                        </BulmaNavbar.Item>
                                    </BulmaNavbar.Dropdown>
                                </BulmaNavbar.Item>
                            </>
                            :
                            <>
                            <BulmaNavbar.Item renderAs="a" className="has-dropdown is-hoverable">
                                <BulmaNavbar.Link>
                                    <BulmaNavbar.Item renderAs="span">
                                        <Link href="/login" passHref>
                                            Sign in
                                        </Link>
                                    </BulmaNavbar.Item>
                                </BulmaNavbar.Link>
                                <BulmaNavbar.Dropdown>
                                    <BulmaNavbar.Item renderAs="span">
                                        <Link href="/newuser" passHref>
                                            Sign up
                                        </Link>
                                    </BulmaNavbar.Item>
                                </BulmaNavbar.Dropdown>
                            </BulmaNavbar.Item>
                            </>
                        }
                    </div>
                </BulmaNavbar.Menu>
            </div>
        </BulmaNavbar>
    )
}