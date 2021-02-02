let cart = document.querySelectorAll(".add-to-cart");

cart.forEach(function(item) {

    console.log(item)

    item.addEventListener("click", function(event) {

        let parentCart = event.target.parentElement;

        let contentCart = parentCart.getElementsByTagName("h4")[0];

        let prixCours = parentCart.querySelector(".discount");

        let stockCours = parentCart.querySelector(".stock")

        let Objet = {
            nom: contentCart.textContent,
            prix: prixCours.textContent,
            quantite: 1,
            stock: stockCours.textContent
        }

        console.log(Objet.nom)
        console.log(Objet.prix)
        console.log(Objet.quantite)
        console.log(Objet.stock)

        let panier = document.querySelector("#cart-table tbody");

        let panierColonne = document.createElement("tr");

        panier.appendChild(panierColonne);

        let panierColDeb = document.createElement("td");

        panierColonne.appendChild(panierColDeb);

        let panierColUne = document.createElement("td");

        panierColonne.appendChild(panierColUne);

        panierColUne.innerText = Objet.nom;

        let panierColDeux = document.createElement("td");

        panierColonne.appendChild(panierColDeux);

        panierColDeux.innerText = Objet.prix;

        let panierColTrois = document.createElement("td");

        panierColonne.appendChild(panierColTrois);

        panierColTrois.innerText = Objet.quantite;

        let panierColQuatre = document.createElement("td");

        panierColonne.appendChild(panierColQuatre);

        let boutonColQuatre = document.createElement("button");

        panierColQuatre.appendChild(boutonColQuatre);

        boutonColQuatre.classList.add("delete-to-cart")

        boutonColQuatre.innerText = "Supprimer";

        alert("Votre article à bien été ajouté à votre panier !")

    })


});