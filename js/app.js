// On stock et on récupère le local storage
let Objet = recupererLeStorage();

// Si la taille du tableu est différent de null alors on boucle sur les article, et on les affiche
if (Objet.length != null) {
    Objet.forEach(function(article) {

        // Cela créer l'html dans le panier
        ajoutCoursPanier(article.nom, article.prix, article.quantite, article.id);

    });
}

// récupère tout les class des boutons ajouter au panier
let panier = document.querySelectorAll(".ajouter-au-panier");

// On boucle pour parcourir tous les boutons
panier.forEach(function(cours) {

    // Lors du clic sur le bouton, tous ce code s'execute
    cours.addEventListener("click", function(event) {

        // On récupère l'id grâce à l'attribut data-id
        let idCours = cours.getAttribute("data-id");

        // On récupérer le stock
        let stockCours = recupererLeStorageCours();

        if (stockCours[idCours - 1].stock > 0) {
            // On remonte à l'élément parent du bouton en question
            let parentPanier = event.target;

            // Vu que l'on a rajouter un span dans le a on est obligé rechercher le parent du parent
            let parentPanierElement = parentPanier.parentElement.parentElement;

            // On récupére le nom du cours
            let contenuPanier = parentPanierElement.querySelector("h4");

            // On récupére le prix en solde
            let prixCours = parentPanierElement.querySelector(".soldes");

            // Je défini le tableau grâce à la fonction qui récupère le local storage
            let Objet = recupererLeStorage();

            // On push à chaque clique dans le local storage
            Objet.push({
                id: idCours,
                nom: contenuPanier.textContent,
                prix: prixCours.textContent,
                quantite: 1
            });

            ajoutCoursPanier(Objet[Objet.length - 1].nom, Objet[Objet.length - 1].prix, Objet[Objet.length - 1].quantite, Objet[Objet.length - 1].id);

            // Ca ajoute le tableau objet au local storage
            localStorage.setItem("panier", JSON.stringify(Objet));

            // Désincrémenté le code
            stockCours[idCours - 1].stock = stockCours[idCours - 1].stock - 1;

            // Actualise le html
            parentPanierElement.querySelector(".stock").innerText = stockCours[idCours - 1].stock;

            // Actualise le local storage
            localStorage.setItem("cours", JSON.stringify(stockCours));

        } else {
            confirm('stock vide');
        }
    })
});

// Récupére le local storage
function recupererLeStorage() {

    // Stock les données récupérer du local storage panier
    let recupCoursPanier = localStorage.getItem("panier");

    // Il vérifie si le local storage est nul alors on retourne un tableau vide pour pouvoir push quand même
    if (recupCoursPanier == null) {
        return [];
    }

    // Sinon on parse la chaîne de caractère en JSON pour pouvoir le parcourir et on le retourne
    let Json = JSON.parse(recupCoursPanier);

    return Json;

}

// Ajout et crée du tableau dans le panier pour chaque article
function ajoutCoursPanier(nom, prix, quantite, idCours) {

    // On récupère la div du panier
    let panierTable = document.querySelector("#table-panier tbody");

    // On crée l'élément TR 
    let panierColonne = document.createElement("tr");

    // On défini son parent
    panierTable.appendChild(panierColonne);

    // On crée l'élément td qui sera vide
    let panierColDeb = document.createElement("td");

    // On défini son parent
    panierColonne.appendChild(panierColDeb);

    let panierColUne = document.createElement("td");

    panierColonne.appendChild(panierColUne);

    // On défini son contenu soit le paramètre nom
    panierColUne.innerText = nom;

    let panierColDeux = document.createElement("td");

    panierColonne.appendChild(panierColDeux);

    // On défini son contenu soit le prix
    panierColDeux.innerText = prix;

    let panierColTrois = document.createElement("td");

    panierColonne.appendChild(panierColTrois);

    // On défini son contenu soit quantite
    panierColTrois.innerText = quantite;

    let panierColQuatre = document.createElement("td");

    panierColonne.appendChild(panierColQuatre);

    // On crée le bouton supprimer
    let boutonColQuatre = document.createElement("button");

    panierColQuatre.appendChild(boutonColQuatre);

    // On lui ajoute une class
    boutonColQuatre.classList.add("supprimer-du-panier");

    // On lui ajout un data-id avec le paramètre idCours
    boutonColQuatre.setAttribute("data-id", idCours);

    // On lui défini son texte
    boutonColQuatre.innerText = "Supprimer";

}

// récupère le divParent dans lequel se trouve le bouton
let panierContainer = document.getElementById("panier");

// On fait un évenemnt de click dessus,
panierContainer.addEventListener("click", function(event) {

    // On vérifie que l'élement selectionné dans cette div comporte bien la class "supprimer-du-panier",
    if (event.target.className == "supprimer-du-panier") {

        // On remonte au parent parent de l'élément
        let panierTable = event.target.parentElement.parentElement;

        // récupère le nom de l'article
        let nom = panierTable.getElementsByTagName("td")[1].textContent;

        // Ouvre une boite de dialogue qui demande, si elle clique sur OK
        if (confirm("Êtes vous sur de vouloir supprimer le cours " + nom + " ?")) {

            // On récup le local storage dans le tableau
            let Objet = recupererLeStorage();

            let idCours = event.target.getAttribute("data-id");

            // On le supprimer grâce à l'id en cours grâce à la boucle
            for (let i = 0; i < Objet.length; i++) {
                if (Objet[i].id === idCours) {
                    Objet.splice(i, 1);
                    break;
                }
            }

            // On vide l'html du panier
            panierTable.innerHTML = '';

            // On récupérer le stock
            let stockCours = recupererLeStorageCours();

            stockCours[idCours - 1].stock = stockCours[idCours - 1].stock++;

            // document.querySelector(".stock").innerText = stockCours[idCours - 1].stock;
            document.querySelector("body .container__cours").innerHTML = '';
            affichage(stockCours);

            // On actualise le stock
            localStorage.setItem("cours", JSON.stringify(stockCours));

            // On actualise le local storage
            localStorage.setItem("panier", JSON.stringify(Objet));

        }
    }

})

// Lors du clic sur le bouton vider le panier
document.getElementById("vider-panier").addEventListener("click", function() {

    // Ouvre une boite de dialogue qui demande, si elle clique sur OK
    if (confirm("Voulez vous vraiment vider votre panier ?")) {

        // On selectionne le tbody du panier
        let panierTable = document.querySelector("#table-panier tbody");

        // Vide le html
        panierTable.innerHTML = "";

        // Le local storage est clear
        localStorage.clear;

        alert("N'hésitez pas à remplir votre panier, si les cours vous plaisent ;) !")

    }

});