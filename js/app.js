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
        Objet.push({ id: idCours, nom: contenuPanier.textContent, prix: prixCours.textContent, quantite: 1 })

        // Cela créer l'html dans le panier
        ajoutCoursPanier(Objet[Objet.length - 1].nom, Objet[Objet.length - 1].prix, Objet[Objet.length - 1].quantite, Objet[Objet.length - 1].id);

        // Ca ajoute le tableau objet au local storage
        localStorage.setItem("panier", JSON.stringify(Objet));

        //stockCours.innerText = stockCours.value - 1;

        event.preventDefault();

        // La notification
        var titre = "La boutique de Tirna";
        var message = contenuPanier.textContent + " à bien été ajouté à votre panier !";
        var position = "codding-top-right";
        var duree = 3000;
        var theme = "success";

        window.createNotification({
            positionClass: position,
            showDuration: duree,
            theme: theme
        })({
            title: titre,
            message: message
        });
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

    // Sinon on parse la chaîne de caractère en JSON pour pouvoir le parcourire et on le retourne
    let Json = JSON.parse(recupCoursPanier);

    return Json;

}

// Ajout et crée du tableau dans le panier pour chaque article
function ajoutCoursPanier(nom, prix, quantite, idCours) {

    let panierTable = document.querySelector("#cart-table tbody");

    let panierColonne = document.createElement("tr");

    panierTable.appendChild(panierColonne);

    let panierColDeb = document.createElement("td");

    panierColonne.appendChild(panierColDeb);

    let panierColUne = document.createElement("td");

    panierColonne.appendChild(panierColUne);

    panierColUne.innerText = nom;

    let panierColDeux = document.createElement("td");

    panierColonne.appendChild(panierColDeux);

    panierColDeux.innerText = prix;

    let panierColTrois = document.createElement("td");

    panierColonne.appendChild(panierColTrois);

    panierColTrois.innerText = quantite;

    let panierColQuatre = document.createElement("td");

    panierColonne.appendChild(panierColQuatre);

    let boutonColQuatre = document.createElement("button");

    panierColQuatre.appendChild(boutonColQuatre);

    boutonColQuatre.classList.add("delete-to-cart");

    boutonColQuatre.setAttribute("data-id", idCours);

    boutonColQuatre.innerText = "Supprimer";

    console.log(panierTable.children)

    console.log(panierTable.children.length)

}

// Lors du clic sur le bouton vider le panier
document.getElementById("empty-cart").addEventListener("click", function(event) {

    // Le local storage est clear
    localStorage.clear();

    event.preventDefault();

    // Une notification apparaît
    var titre = "La boutique de Tirna";
    var message = "Votre panier est bien supprimer !";
    var position = "codding-top-right";
    var duree = 3000;
    var theme = "success";

    window.createNotification({
        positionClass: position,
        showDuration: duree,
        theme: theme
    })({
        title: titre,
        message: message
    });

});