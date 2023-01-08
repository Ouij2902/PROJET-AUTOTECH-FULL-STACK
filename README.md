# PROJET-4-FULL-STACK__AUTOTECH

Dans le cadre d'un projet académique, nous avons effectué un site permettant de se créer un compte utilisateur pour puvoir ensuite créer des tickets de support, et plus spécialement, nous avons choisi de faire un site en rapport avec notre club de réparation automobile.

# Mode d'emploi

## Lancement du site web sans docker-compose

On créé d'abord les bases de données MongoDb et Redis avec Docker:  
<code>docker run -d --name mongo-bdd -p 27017:27017 mongo</code>  
<code>docker run -d --name redis-bdd -p 6379:6379 redis</code>

Ouvrir un premier *cmd* au niveau **_/backend_** du projet et exécuter la commande suivante :  
<code>npm run dev</code>

Ouvrir un second *cmd* au niveau **_/app_project_** et exécuter la même commande que précédemment.

Finalement, on peut se rendre sur le lien suivant :  
<code>http://localhost:8080</code>

## Problème avec docker-compose

Lorsque l'on lance la commande <code>docker-compose up</code> et que l'on esaie de se connecter ou de créer un compte sur notre site, on a l'erreur suivante:  
<code>Error: getaddrinfo EAI_AGAIN</code>


## Info sur les comptes

Il y a deux types de compte, un compte admin qui va gérer l'avancement des tickets et la gestion des autres comptes et un compte d'utilisateur normal où l'on peut créer des tickets.

* Compte admin(email : admin@gmail.com et mdp: admin)
![Capture d’écran (1)](https://user-images.githubusercontent.com/93133836/211210825-dec313ca-7af6-4333-841e-301cccc9695a.png)

* Compte classique
![Capture d’écran (2)](https://user-images.githubusercontent.com/93133836/211210842-969fd6ff-775e-4648-b25f-298d255d3542.png)

## Info tri des tickets

Le tri des tickets par priorité se fait du plus urgent au moins urgent et le tri par status se fait des tickets non traité à ceux dont le traitement est terminé.
