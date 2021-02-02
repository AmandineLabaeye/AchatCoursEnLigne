let panier = document.querySelectorAll(".add-to-cart");

panier.forEach(function(cours) {

    console.log(cours)

    cours.addEventListener("click", function(event) {

        let idCours = cours.getAttribute("data-id");

        let parentPanier = event.target.parentElement;

        let contenuPanier = parentPanier.getElementsByTagName("h4")[0];

        let prixCours = parentPanier.querySelector(".discount");

        let stockCours = parentPanier.querySelector(".stock")

        let Objet = {
            nom: contenuPanier.textContent,
            prix: prixCours.textContent,
            quantite: 0,
            stock: stockCours.textContent
        }

        // Condition si dans le local storage l'élément en cours d'ajout exist déjà alors quantité + 1 au lieu de le dupliquer

        /*if (contenuPanier.innerText == Objet.nom) {
            Objet.quantite++;
        } else {*/
        Objet.quantite++;
        ajoutCoursPanier(Objet.nom, Objet.prix, Objet.quantite);
        //}

        stockCours.innerText = Objet.stock - 1;

        event.preventDefault();
        // Form elements
        var title = "La boutique de jéjé";
        var message = contenuPanier.textContent + " à bien été ajouté à votre panier !";
        var position = "codding-top-right";
        var duration = 3000;
        var theme = "success";

        window.createNotification({
            positionClass: position,
            showDuration: duration,
            theme: theme
        })({
            title: title,
            message: message
        });
    })

});

function ajoutCoursPanier(nom, prix, quantite) {

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

    boutonColQuatre.classList.add("delete-to-cart")

    boutonColQuatre.innerText = "Supprimer";

}

function SuprrimerCoursPanier() {

}