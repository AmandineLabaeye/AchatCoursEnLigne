// On stock et on récupère le local storage
let Objet = getLocalStorage();

// Si la taille du tableu est différent de null alors on boucle sur les item, et on les affiche
if (Objet.length != null) {
    Objet.forEach(function(item) {

        // Cela créer l'html dans le panier
        ajoutCoursPanier(item.nom, item.prix, item.quantite, item.id);

    });
}

// récupère tout les class des boutons ajouter au panier
let panier = document.querySelectorAll(".add-to-cart");

// On boucle pour parcourir tous les boutons
panier.forEach(function(cours) {

    // Lors du clic sur le bouton, tous ce code s'execute
    cours.addEventListener("click", function(event) {

        // On récupère l'id grâce à l'attribut data-id
        let idCours = cours.getAttribute("data-id");

        // On remonte à l'élément parent du bouton en question
        let parentPanier = event.target.parentElement;

        // On récupére le nom du cours
        let contenuPanier = parentPanier.getElementsByTagName("h4")[0];

        // On récupére le prix en solde
        let prixCours = parentPanier.querySelector(".discount");

        // On récupérer le solde
        let stockCours = parentPanier.querySelector(".stock")

        // Je défini le tableau grâce à la fonction qui récupère le local storage
        let Objet = getLocalStorage();

        // On push à chaque clique dans le local storage
        Objet.push({
            id: idCours,
            nom: contenuPanier.textContent,
            prix: prixCours.textContent,
            quantite: 1
        })

        ajoutCoursPanier(Objet[Objet.length - 1].nom, Objet[Objet.length - 1].prix, Objet[Objet.length - 1].quantite, Objet[Objet.length - 1].id);

        // Ca ajoute le tableau objet au local storage
        localStorage.setItem("panier", JSON.stringify(Objet));

        //stockCours.innerText = stockCours.value - 1;

    })

});

// Récupére le local storage
function getLocalStorage() {

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
    let panierTable = document.querySelector("#cart-table tbody");

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
    boutonColQuatre.classList.add("delete-to-cart");

    // On lui ajout un data-id avec le paramètre idCours
    boutonColQuatre.setAttribute("data-id", idCours);

    // On lui défini son texte
    boutonColQuatre.innerText = "Supprimer";

}

// récupère le divParent dans lequel se trouve le bouton
let panierContainer = document.getElementById("cart");

// On fait un évenemnt de click dessus,
panierContainer.addEventListener("click", function(event) {

    // On vérifie que l'élement selectionné dans cette div comporte bien la class "delete-to-cart",
    if (event.target.className == "delete-to-cart") {

        // On récup le local storage dans le tableau
        let Objet = getLocalStorage();

        // On remonte au parent parent de l'élément
        let panierTable = event.target.parentElement.parentElement;

        // On le supprimer grâce à l'id en cours
        Objet.splice(Objet.id, 1);

        // On vide l'html du panier
        panierTable.innerHTML = "";

        // On actualise le local storage
        localStorage.setItem("panier", JSON.stringify(Objet));

    }

})

// Lors du clic sur le bouton vider le panier
document.getElementById("empty-cart").addEventListener("click", function() {

    // On selectionne le tbody du panier
    let panierTable = document.querySelector("#cart-table tbody");

    // Vide le html
    panierTable.innerHTML = "";

    // Le local storage est clear
    localStorage.clear();

});